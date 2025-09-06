"use client";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignIn
        path="/sign-in"
        routing="path"
        afterSignInUrl="/"
        signUpFallbackRedirectUrl="/"
      />
    </div>
  );
}