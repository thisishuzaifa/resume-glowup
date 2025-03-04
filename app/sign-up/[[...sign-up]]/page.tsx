import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-950 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Create an Account</h1>
          <p className="text-gray-600">
            Sign up to get started with Resume GlowUp
          </p>
        </div>
        <div className="bg-transparent rounded-xl shadow-lg overflow-hidden">
          <SignUp
            appearance={{
              elements: {
                rootBox: "mx-auto w-full",
                card: "shadow-none",
                formButtonPrimary:
                  "bg-indigo-600 hover:bg-indigo-700 text-sm normal-case",
              },
            }}
            routing="path"
            path="/sign-up"
            redirectUrl="/dashboard"
          />
        </div>
      </div>
    </div>
  );
}
