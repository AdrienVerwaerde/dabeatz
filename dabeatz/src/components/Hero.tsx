
import { Card } from "./ui/card"
import { Button } from "./ui/button"
import Link from "next/link"
import Image from "next/image"

export default function Hero() {
    return (
        <>
        <Card className="relative overflow-hidden flex flex-col items-center">
            <div className="w-full h-auto aspect-video relative">
                <Image src="/assets/hero-img.png" fill alt="hero image" className="object-cover" />
                <div className="absolute inset-7 flex justify-center items-end">
                    <Button asChild className="text-white text-2xl bg-pink-800 hover:bg-black py-2 px-4 uppercase rounded-lg font-sans flex flex-col justify-between items-center h-3/12 w-4/12 shadow-md">
                        <Link href="/products"><h1 className="font-mono">Choose your mood</h1><p>browse categories</p></Link>
                    </Button>
                </div>
            </div>
        </Card>
        </>
    )
}


