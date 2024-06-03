import { CategoryCard } from "@/components/CategoryCard"
import { ProductCardSkeleton } from "@/components/ProductCard"
import db from "@/db/db"
import { cache } from "@/lib/cache"
import { Loader2 } from "lucide-react"
import { Suspense } from "react"

const getCategories = cache(() => {
    return db.category.findMany({
        orderBy: { name: "asc" },
    })
}, ["/categories", "getCategories"])

export default function CategoriesPage() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Suspense
                fallback={
                    <div className="flex justify-center items-center">
                        <Loader2 className="size-24 animate-spin" />
                    </div>
                }
            >
                <CategoriesSuspense />
            </Suspense>
        </div>
    )
}

async function CategoriesSuspense() {
    const products = await getCategories()

    return products.map(category => <CategoryCard key={category.id} {...category} />)
}
