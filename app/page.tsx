"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  useEffect(() => {
    const authData = localStorage.getItem("authData");
    if (authData) {
      // chack token
      router.replace("/dashboard"); 
    } else {
      setIsCheckingAuth(false); 
    }
  }, [router]);

  if (isCheckingAuth) {
    return <div className="flex min-h-screen items-center justify-center">Checking authentication...</div>;
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  )
}
