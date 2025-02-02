"use client";
import { useState } from "react";
import { useRouter } from 'next/navigation'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Loader2 } from "lucide-react";
import axios from "axios";

type FormDataType = {
  [key: string]: string;
};

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()
  const [isloading, setIsloading] = useState(false);
  const [errormessage, setErrormessage] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsloading(true);
    setErrormessage(null)
    e.preventDefault();
    const data = Object.fromEntries(
      new FormData(e.currentTarget)
    ) as FormDataType;
    const formData = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    try {
      const res = await axios.post(
        "https://meeting.taisolution.tech/backend/api/v1/auth/admins",
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      localStorage.setItem("authData", JSON.stringify(res.data.value));
      router.push('/dashboard')
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrormessage(error.response?.data?.detail || "Something went wrong");
      } else {
        setErrormessage("An unexpected error occurred");
      }
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={onSubmit} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  Login to your Acme Inc account
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="text">Username</Label>
                <Input
                  id="username"
                  type="text"
                  name="username"
                  placeholder="name id or email"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" name="password" required />
              </div>
              <Button type="submit" className="w-full" disabled={isloading}>
                {isloading && <Loader2 className="animate-spin" />}
                Login
              </Button>
              <div className="text-sm">
                {errormessage && <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    {errormessage}
                  </AlertDescription>
                </Alert>}
              </div>
            </div>
          </form>
          <div className="relative hidden bg-muted md:flex p-4 items-center justify-center">
            <img
              src="/images/bg/undraw_taken_mshk.svg"
              alt="Image"
              className="size-5/6 object-center dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
