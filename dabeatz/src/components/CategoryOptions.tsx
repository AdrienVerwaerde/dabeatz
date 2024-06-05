import { useEffect, useState } from "react";
import { cache } from "@/lib/cache";
import db from "@/db/db";
import { Category } from "@prisma/client";

const getCategories = cache(async () => {
    return await db.category.findMany({
        orderBy: { name: "asc" },
    });
}, ["/categories", "getCategories"]);

export default function CategoryOptions() {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const categoriesData = await getCategories();
                setCategories(categoriesData);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        }

        fetchCategories();
    }, []);

    return (
        <>
            <option value="">Select a category</option>
            {categories.map((category) => (
                <option key={category.id} value={category.id}>
                    {category.name}
                </option>
            ))}
        </>
    );
}
