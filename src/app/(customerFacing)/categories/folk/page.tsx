import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard"
import db from "@/db/db"
import { cache } from "@/lib/cache"
import { Suspense } from "react"

const getProducts = cache((name: string) => {
    return db.product.findMany({
        where: { isAvailableForPurchase: true, name },
        orderBy: { name: "asc" },
    })
}, ["/products", "getProducts"])

export default function PageClassical() {
    const productName = "Countryside Ballad";
    return (
    <main className="container">
        <div className="uppercase font-mono text-pink-800 font-bold text-lg mt-4 mb-0 lg:mt-0 lg:mb-4 w-fit text-center p-2 rounded-md border-solid border-pink-800 border-2">
            <h1>Folk</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 max-w-xl mt-4 lg:mt-0">
                <Suspense
                    fallback={
                        <>
                            <ProductCardSkeleton />
                        </>
                    }
                >
                    <ProductsSuspense productName={productName} />
                </Suspense>
            </div>
        </main>
    )
}

async function ProductsSuspense({ productName }: { productName: string }) {
    const products = await getProducts(productName)

    return products.map(product => <ProductCard key={product.id} {...product} />)
}