'use client'

import { useState } from "react"
import Image from "next/image"

import { Logomark, AdminCompanyLogo } from "@/components/ottolabs/Logo"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { login } from "./actions"

export default function Auth() {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    const result = await login(formData);
    if (result?.error) {
      setError(result.error);
    }
  };

  return (
    <div className="relative w-full min-h-screen content-center">
      {/* <a href="https://ottolabs.ai" target="_blank" className="absolute left-2 top-3 flex items-center space-x-2">
        <Logomark className="h-11 w-11" />
      </a> */}
      <div className="flex items-center justify-center py-12 ">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <AdminCompanyLogo className="w-2/3 mx-auto mb-2" />
            <p className="text-muted-foreground">
              Login below to manage your business
            </p>
          </div>
          <form action={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" name="password" type="password" required />
              </div>
              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}
              <Button type="submit" variant="default" className="w-full">
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
      {/* <div className="hidden bg-muted lg:block"> */}
        {/* <Image
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        /> */}
      {/* </div> */}
      <div className="w-full fixed bottom-0 text-center py-4 text-slate-400 text-[.9rem]">
        Powered By <a href="https://ottolabs.ai" target="_blank" className="font-bold">Ottolabs.</a>
      </div>
    </div>
  )
}