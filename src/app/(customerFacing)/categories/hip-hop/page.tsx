import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard"
import db from "@/db/db"
import { cache } from "@/lib/cache"
import { Suspense } from "react"

const getProducts = cache((productNames: string[]) => {
    return db.product.findMany({
        where: { isAvailableForPurchase: true,
            name: { in: productNames },
        },
        orderBy: { name: "asc" },
    })
}, ["/products", "getProducts"])

export default function PageClassical() {
    const productNames = ["Beat Killa", "Focus Lounge"];
    return (
        <main className="container">
        <div className="uppercase text-pink-800 font-bold text-lg mt-4 mb-0 lg:mt-0 lg:mb-4 w-fit text-center p-2 rounded-md border-solid border-pink-800 border-2">
            <h1>Hip-hop</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-4 lg:mt-0">
                <Suspense
                    fallback={
                        <>
                            <ProductCardSkeleton />
                            <ProductCardSkeleton />
                        </>
                    }
                >
                    <ProductsSuspense productNames={productNames} />
                </Suspense>
            </div>
        </main>
    )
}

async function ProductsSuspense({ productNames }: { productNames: string[] }) {
    const products = await getProducts(productNames)

    return products.map(product => <ProductCard key={product.id} {...product} />)
}