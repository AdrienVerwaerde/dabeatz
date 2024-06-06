"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { addCategory, updateCategory } from "../../_actions/categories"
import { useFormState, useFormStatus } from "react-dom"
import { Category } from "@prisma/client"
import Image from "next/image"


export function CategoryForm({ category }: { category?: Category }) {
    
    let categoryName: string;
    if (category) {
        categoryName = category.name;
    } else {
        categoryName = 'Unknown';
    }
    console.log(categoryName);

    const [error, action] = useFormState(
        category == null ? addCategory : updateCategory.bind(null, category.id),
        {}
    )

    return (
        <form action={action} className="space-y-8">
            <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                    type="text"
                    id="name"
                    name="name"
                    required
                    defaultValue={category?.name || ""}
                />
                {error.name && <div className="text-destructive">{error.name}</div>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="image">Image</Label>
                <Input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    required />
                {category != null && (
                    <Image
                        src={category.imagePath}
                        height="400"
                        width="400"
                        alt="category Image"
                    />
                )}
            </div>
            <SubmitButton />

        </form>
    )
}

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <Button type="submit" disabled={pending}>
            {pending ? "Saving..." : "Save"}
        </Button>
    )
}
