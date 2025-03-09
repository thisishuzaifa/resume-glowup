import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-light mb-2">Welcome Back</h1>
          <p className="text-gray-100">Sign in to continue to Resume Glowup</p>
        </div>
        <div className="bg-transparent rounded-xl shadow-lg overflow-hidden">
          <SignIn
            appearance={{
              elements: {
                rootBox: "mx-auto w-full",
                card: "shadow-none",
                formButtonPrimary:
                  "bg-gray-600 hover:bg-red-700 text-sm normal-case",
              },
            }}
            routing="path"
            path="/sign-in"
            redirectUrl="/dashboard"
          />
        </div>
      </div>
    </div>
  );
}
