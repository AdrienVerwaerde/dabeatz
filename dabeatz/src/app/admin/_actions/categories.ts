"use server"

import db from "@/db/db"
import { z } from "zod"
import fs from "fs/promises"
import { notFound, redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { join } from "path"


const fileSchema = z.instanceof(File, { message: "Required" })
const imageSchema = fileSchema.refine(
    file => file.size === 0 || file.type.startsWith("image/")
)

const addSchema = z.object({
    name: z.string().min(1),
    image: imageSchema.refine(file => file.size > 0, "Required"),
})

export async function addCategory(prevState: unknown, formData: FormData) {
    const result = addSchema.safeParse(Object.fromEntries(formData.entries()))
    if (result.success === false) {
        return result.error.formErrors.fieldErrors
    }

    const data = result.data

    // await fs.mkdir("categories", { recursive: true })
    // const file = formData.get("image") as File
    // const filePath = join(process.cwd(), `categories/${file.name}`);
    // await fs.writeFile(filePath, Buffer.from(await file.arrayBuffer()));

    await fs.mkdir("public/categories", { recursive: true })
    const imagePath =`/categories/${data.image.name}`;
    await fs.writeFile(
        `public${imagePath}`,
        Buffer.from(await data.image.arrayBuffer())
    )

    await db.category.create({
        data: {
            name: data.name,
            imagePath: data.image.name,
        },
    })

    revalidatePath("/")
    revalidatePath("/categories")

    redirect("/admin/categories")
}


const editSchema = addSchema.extend({
    file: fileSchema.optional(),
    image: imageSchema.optional(),
})

export async function updateCategory(
    id: string,
    prevState: unknown,
    formData: FormData
) {
    const result = editSchema.safeParse(Object.fromEntries(formData.entries()))
    if (result.success === false) {
        return result.error.formErrors.fieldErrors
    }

    const data = result.data
    const category = await db.category.findUnique({ where: { id } })

    if (category == null) return notFound()

    let imagePath = category.imagePath;
    if (data.image != null && data.image.size > 0) {
        await fs.unlink(join(process.cwd(), `public/${category.imagePath}`));
        imagePath = `/categories/${data.image.name}`;
        await fs.writeFile(
            join(process.cwd(), `public${imagePath}`),
            Buffer.from(await data.image.arrayBuffer())
        );
    }

    await db.category.update({
        where: { id },
        data: {
            name: data.name,
        },
    })

    revalidatePath("/")
    revalidatePath("/categories")

    redirect("/admin/categories")
}


export async function deleteCategory(id: string) {
    const category = await db.category.delete({ where: { id } })

    if (category == null) return notFound()

    await fs.unlink(`${category.imagePath}`)

    revalidatePath("/")
    revalidatePath("/categories")
}


