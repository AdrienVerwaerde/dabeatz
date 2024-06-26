import { Button } from "@/components/ui/button";


export default function About() {
    return (
        <div className="flex flex-col justify-center items-center container text-center font-mono">
            <h1>This website was made by Adrien Verwaerde</h1>
            <p className="text-base text-muted-foreground text-center">Using Next.js, Tailwind, Stripe and Prisma</p>
            <a href="https://adrienverwaerde.github.io/Portfolio/" target="_blank"><Button className="font-sans text-2xl bg-pink-800 hover:bg-black p-6 mt-4 uppercase">Portfolio</Button></a>
        </div>
    )
}