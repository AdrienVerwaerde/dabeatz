import { Footer } from "@/components/Footer"
import { Nav, NavLink } from "@/components/Nav"

export const dynamic = "force-dynamic"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="flex flex-col h-screen justify-between">
      <Nav>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/products">Products</NavLink>
        <NavLink href="/categories">Categories</NavLink>
        <NavLink href="/orders">My Orders</NavLink>
      </Nav>
      <div className="lg:my-6">{children}</div>
      <Footer />
    </main>
  )
}
