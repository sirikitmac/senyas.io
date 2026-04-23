"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  rememberMe: z.boolean().default(false).optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface AuthFormProps {
  logo: React.ReactNode;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  onSubmit: (data: FormValues) => Promise<void>;
  forgotPasswordHref: string;
  createAccountHref: string;
}

export function AuthFormSplitScreen({ 
  logo, title, description, imageSrc, imageAlt, onSubmit, forgotPasswordHref, createAccountHref 
}: AuthFormProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const form = useForm<FormValues>({ 
    resolver: zodResolver(formSchema), 
    defaultValues: { email: "", password: "", rememberMe: false } 
  });

  const handleFormSubmit = async (data: FormValues) => {
    setIsLoading(true);
    await onSubmit(data);
    setIsLoading(false);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col md:flex-row bg-background">
      {/* Left Panel: Glassmorphic Form */}
      <div className="flex w-full flex-col items-center justify-center p-8 md:w-1/2">
        <div className="w-full max-w-sm space-y-6">
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="mb-2">{logo}</div>
            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</FormLabel>
                  <FormControl><Input placeholder="name@company.com" {...field} disabled={isLoading} className="bg-background" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="password" render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between items-center">
                    <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Password</FormLabel>
                    <Link href={forgotPasswordHref} className="text-xs text-primary hover:underline">Forgot?</Link>
                  </div>
                  <FormControl><Input type="password" placeholder="••••••••" {...field} disabled={isLoading} className="bg-background" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              
              <Button type="submit" className="w-full h-11 font-semibold" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign In
              </Button>
            </form>
          </Form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          {/* Continue as Guest Button - Routes to /lab */}
          <Button 
            asChild 
            variant="outline"
            className="w-full h-11 border-[#ffb3c6]/20 bg-[#ffb3c6]/5 text-foreground hover:bg-[#ffb3c6]/10 animate-btn-breathe transition-all duration-75 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Link href="/lab">Continue as Guest</Link>
          </Button>

          <p className="text-center text-sm text-muted-foreground pt-4">
            New here?{" "}
            <Link href={createAccountHref} className="font-semibold text-primary hover:underline">Create an account</Link>
          </p>
        </div>
      </div>

      {/* Right Panel: Aesthetic Image */}
      <div className="relative hidden w-1/2 md:block">
        <img src={imageSrc} alt={imageAlt} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/20" /> 
      </div>
    </div>
  );
}