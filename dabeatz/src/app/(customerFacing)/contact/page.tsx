import Image from "next/image";
import Link from "next/link";

export default function Contact() {
    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="mb-6">Contact me</h1>
            <div className="flex-row flex justify-center items-center gap-10">
                <Link href="https://www.linkedin.com/in/adrien-verwaerde-018ba4195/" target="_blank"><Image alt="linkedin" src="/assets/linkedin.png" width={50} height={50} /></Link>
                <Link href="mailto:verwaerde.a@live.fr" target="_blank"><Image alt="outlook" src="/assets/outlook.png" width={50} height={50} /></Link>
                <Link href="mailto:verwaerdeadrien@gmail.com" target="_blank"><Image alt="outlook" src="/assets/gmail.png" width={60} height={60} /></Link>
            </div>
        </div>
    )
}