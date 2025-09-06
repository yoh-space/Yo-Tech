"use client";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignUp 
        path="/signup" 
        routing="path"
        appearance={{
          elements: {
            // Hide organization-related elements
            organizationSwitcher: 'hidden',
            organizationProfile: 'hidden',
            formFieldInput__organizationName: 'hidden',
            formFieldInput__organizationSlug: 'hidden',
          }
        }}
        // Force individual sign-up (not organization)
        forceRedirectUrl="/"
        // Optional: redirect after sign-up
        afterSignUpUrl="/dashboard"
      />
    </div>
  );
}