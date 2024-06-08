"use client"


import { emailOrderHistory } from "@/actions/orders"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFormState, useFormStatus } from "react-dom"

export default function MyOrdersPage() {
  const [data, action] = useFormState(emailOrderHistory, {})
  return (
    <form action={action} className="max-2-xl m-5">
      <Card>
        <CardHeader>
          <CardTitle className="pt-2 font-sans text-xl">My Orders</CardTitle>
          <CardDescription className="font-mono">
            Enter your email and we will send you your order history and
            download links
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 font-mono">
            <Label htmlFor="email">Email</Label>
            <Input type="email" required name="email" id="email" />
            {data.error && <div className="text-destructive">{data.error}</div>}
          </div>
        </CardContent>
        <CardFooter>
          {data.message ? <p>{data.message}</p> : <SubmitButton />}
        </CardFooter>
      </Card>
    </form>

  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button className="w-full bg-pink-800 hover:bg-black text-xl font-sans uppercase" size="lg" disabled={pending} type="submit">
      {pending ? "Sending..." : "Send"}
    </Button>
  )
}
