import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

export default function MobileHero() {
    return (
        <div className="lg:hidden mt-4">
        <div className="flex flex-col justify-center items-center">
            <Image src="/assets/hero-img.png" layout="responsive" width={1920} height={1080} alt="hero image" className="object-cover overflow-x-hidden" />
            <Button asChild className="mt-4 relative text-white text-xl bg-pink-800 hover:bg-black px-4 uppercase rounded-lg font-sans flex flex-col justify-between items-center h-3/12 w-2/3 shadow-md">
                <Link href="/categories"><h1 className="font-mono">Choose your mood</h1><p>browse categories</p></Link>
            </Button>
        </div>
    </div>
    )
}