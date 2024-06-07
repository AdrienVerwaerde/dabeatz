import { CategoryCard } from "@/components/CategoryCard"
import { ProductCardSkeleton } from "@/components/ProductCard"
import db from "@/db/db"
import { cache } from "@/lib/cache"
import { Suspense } from "react"

const getCategories = cache(() => {
    return db.category.findMany({
        orderBy: { name: "asc" },
    })
}, ["/categories", "getCategories"])

async function CategoriesSuspense() {
    const categories = await getCategories()

    return categories.map(category => <CategoryCard key={category.id} {...category} />)
}

export default function CategoriesPage() {
    return (

        <main className="container">
        <h1 className="uppercase font-mono text-pink-800 font-bold text-lg mt-4 mb-0 lg:mt-0 lg:mb-4 w-fit text-center p-2 rounded-md border-solid border-pink-800 border-2">Categories</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 lg:mt-0">
            <Suspense
                fallback={
                    <>
                        <ProductCardSkeleton />
                        <ProductCardSkeleton />
                        <ProductCardSkeleton />
                        <ProductCardSkeleton />
                        <ProductCardSkeleton />
                        <ProductCardSkeleton />
                    </>
                }
            >
                <CategoriesSuspense />
            </Suspense>
        </div>
        </main>
    )
}
