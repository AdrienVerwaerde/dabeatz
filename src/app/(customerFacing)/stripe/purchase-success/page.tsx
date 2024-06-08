import { Button } from "@/components/ui/button"
import db from "@/db/db"
import { formatCurrency } from "@/lib/formatters"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { payment_intent: string }
}) {
  const paymentIntent = await stripe.paymentIntents.retrieve(
    searchParams.payment_intent
  )
  if (paymentIntent.metadata.productId == null) return notFound()

  const product = await db.product.findUnique({
    where: { id: paymentIntent.metadata.productId },
  })
  if (product == null) return notFound()

  const isSuccess = paymentIntent.status === "succeeded"

  return (
    <div className="max-w-5xl w-full mx-auto space-y-8">
      <h1 className="text-4xl font-bold font-mono">
        {isSuccess ? "Success!" : "Error!"}
      </h1>
      <div className="flex gap-4 items-center">
        <div className="aspect-square flex-shrink-0 w-1/3 relative">
          <Image
            src={product.imagePath}
            fill
            alt={product.name}
            className="object-cover"
          />
        </div>
        <div>
          <div className="text-lg font-sans">
            {formatCurrency(product.priceInCents / 100)}
          </div>
          <h1 className="text-2xl font-bold font-sans uppercase">{product.name}</h1>
          <div className="line-clamp-3 text-muted-foreground font-mono">
            {product.description}
          </div>
          <div className="flex flex-col">
          <Button className="mt-4 bg-pink-800 hover:bg-pink-900 font-sans text-xl" size="lg" asChild>
            {isSuccess ? (
              <a href="/orders">VIEW ORDER</a>
            ) : (
              <Link href={`/products/${product.id}/purchase`}>Try Again</Link>
            )}
          </Button>
          <Button className="mt-4 bg-black hover:bg-gray-800 font-sans text-xl" size="lg" asChild>
              <a href="/">BACK TO SHOP</a>
          </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

