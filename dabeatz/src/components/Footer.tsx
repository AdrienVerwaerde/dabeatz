"use client"

import Image from "next/image"
import Link from "next/link"



export function Footer() {
    return (
        <footer className="bg-white flex justify-between items-center mx-4 bottom-0 left-0">
            <Link href="/">
                <Image className="p-4" src="/assets/logo-nav.png" alt="logo" width={150} height={11} />
            </Link>
            <div className="flex flex-row justify-evenly items-center">
                <Link href="/terms" className="font-sans text-lg hover:text-pink-800 mx-4">Terms and Conditions</Link>
                <Link href="/about" className="font-sans text-lg hover:text-pink-800 mx-4">About</Link>
                <Link href="/contact" className="font-sans text-lg hover:text-pink-800 mx-4">Contact</Link>
            </div>
        </footer>
    )
}


