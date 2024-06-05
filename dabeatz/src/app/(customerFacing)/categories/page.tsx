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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
    )
}
