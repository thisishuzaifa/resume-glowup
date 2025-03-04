import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-950 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to continue to Resume GlowUp</p>
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
