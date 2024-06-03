
import { Button } from "@/components/ui/button";
import { PageHeader } from "../_components/PageHeader";
import Link from "next/link";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import db from "@/db/db";
import { MoreVertical } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteDropdownItem } from "./_components/CategoryActions";

export default function AdminCategoriesPage() {
    return (
        <>
            <div className="flex justify-between items-center gap-4">
                <PageHeader>Categories</PageHeader>
                <Button asChild>
                    <Link href="/admin/categories/new">Add Category</Link>
                </Button>
            </div>
            <CategoriesTable />
        </>
    );
}

async function CategoriesTable() {
    const categories = await db.category.findMany({
        select: {
            id: true,
            name: true
        },
        orderBy: { name: "asc" },
    });

    if (categories.length === 0) return <p>No categories</p>;

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {categories.map((category) => (
                    <TableRow key={category.id}>
                        <TableCell>{category.name}</TableCell>
                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <MoreVertical />
                                    <span className="sr-only">Actions</span>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem asChild>
                                        <Link href={`/admin/categories/${category.id}/edit`}>
                                            Edit
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DeleteDropdownItem
                                        id={category.id}
                                    />
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
