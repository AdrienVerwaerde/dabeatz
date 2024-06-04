import {
    Card,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card"
import { Button } from "./ui/button"
import Link from "next/link"
import Image from "next/image"

type CategoryCardProps = {
    id: string
    name: string
    imagePath: string
}

export function CategoryCard({
    id,
    name,
    imagePath,
}: CategoryCardProps) {
    return (
        <Card className="flex overflow-hidden flex-col justify-center items-center">
            <div className="w-full h-auto aspect-square">
                <Image src={`/categories/${imagePath}`} alt={name} className="object-cover p-4" width={400} height={400} />
            </div>
            <CardHeader>
                <CardTitle className="text-2xl">{name}</CardTitle>
            </CardHeader>
            <CardFooter>
                <Button asChild size="lg" className="w-full text-transform: uppercase bg-pink-800 hover:bg-black text-2xl flex flex-col justify-center items-center font-sans mt-2">
                    <Link href={`/categories/${id}`}>see all {name} beatz</Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
