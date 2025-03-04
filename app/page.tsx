import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function Home() {
  const { userId } = await auth();

  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      {/* Navbar - updated to match dashboard style */}
      <header className="sticky top-0 z-10 backdrop-blur-sm bg-base-100/90 py-4">
        <div className="container mx-auto px-6 max-w-6xl flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 text-white"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
            <span className="font-thin text-xl">Resume Glowup</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="#features"
              className="px-3 py-2 rounded-md text-sm font-medium text-base-content/70 hover:bg-base-200/50 hover:text-base-content transition-all duration-200"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="px-3 py-2 rounded-md text-sm font-medium text-base-content/70 hover:bg-base-200/50 hover:text-base-content transition-all duration-200"
            >
              How it works
            </Link>
            {userId ? (
              <Link href="/dashboard" className="btn btn-primary btn-sm">
                Dashboard
              </Link>
            ) : (
              <Link href="/sign-in" className="btn btn-primary btn-sm">
                Sign in
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
              <path d="M2 17l10 5 10-5"></path>
              <path d="M2 12l10 5 10-5"></path>
            </svg>
            <span>AI-Powered Resume Builder</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-light leading-tight mb-6 tracking-tight">
            Land your dream job with{" "}
            <span className="text-primary">AI-enhanced</span> resumes
          </h1>
          <p className="text-xl text-base-content/70 max-w-3xl mx-auto mb-10">
            Resume Glowup uses AI to analyze, optimize, and tailor your resume
            for specific job descriptions, helping you stand out to employers
            and ATS systems.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {userId ? (
              <Link
                href="/dashboard"
                className="bg-primary text-white px-6 py-3 rounded-lg text-lg font-medium shadow-md transition-all duration-300 hover:bg-primary/80 hover:shadow-lg"
              >
                Go to Dashboard
              </Link>
            ) : (
              <Link
                href="/sign-in"
                className="bg-primary text-white px-6 py-3 rounded-lg text-lg font-medium shadow-md transition-all duration-300 hover:bg-primary/80 hover:shadow-lg"
              >
                Get Started
              </Link>
            )}
            <Link
              href="#features"
              className="border border-primary text-primary px-6 py-3 rounded-lg text-lg font-medium shadow-sm transition-all duration-300 hover:bg-primary hover:text-white"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section id="features" className="py-20 bg-base-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Features</h2>
            <p className="text-base-content/70 max-w-2xl mx-auto">
              Our AI-powered tools help you create professional resumes that
              stand out and get you noticed by employers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card bg-base-100 shadow-sm hover:shadow-md transition-all">
              <div className="card-body">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-primary"
                  >
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="card-title">Resume Analysis</h3>
                <p className="text-base-content/70">
                  Get detailed feedback on your resume with specific
                  recommendations for improvement.
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-sm hover:shadow-md transition-all">
              <div className="card-body">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-primary"
                  >
                    <path d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                </div>
                <h3 className="card-title">ATS Optimization</h3>
                <p className="text-base-content/70">
                  Ensure your resume passes through Applicant Tracking Systems
                  with a high score.
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-sm hover:shadow-md transition-all">
              <div className="card-body">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-primary"
                  >
                    <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <h3 className="card-title">Job Tailoring</h3>
                <p className="text-base-content/70">
                  Customize your resume for specific job descriptions to
                  increase your chances of getting an interview.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How it Works</h2>
            <p className="text-base-content/70 max-w-2xl mx-auto">
              Our simple process helps you create the perfect resume in minutes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 relative">
                <span className="text-primary font-bold">1</span>
                <div className="absolute w-16 h-0.5 bg-primary/20 left-full top-1/2 hidden md:block"></div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload Your Resume</h3>
              <p className="text-base-content/70">
                Upload your existing resume or create a new one from scratch.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 relative">
                <span className="text-primary font-bold">2</span>
                <div className="absolute w-16 h-0.5 bg-primary/20 left-full top-1/2 hidden md:block"></div>
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
              <p className="text-base-content/70">
                Our AI analyzes your resume and provides detailed feedback and
                suggestions.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-primary font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Optimize & Download
              </h3>
              <p className="text-base-content/70">
                Apply the suggestions, tailor your resume for specific jobs, and
                download the optimized version.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="card bg-primary text-primary-content p-8 md:p-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">
                Ready to improve your job application process?
              </h2>
              <p className="text-primary-content/80 mb-8 max-w-2xl mx-auto">
                Join thousands of job seekers who have improved their resumes
                and landed their dream jobs.
              </p>
              {userId ? (
                <Link href="/dashboard" className="btn btn-lg glass">
                  Go to Dashboard
                </Link>
              ) : (
                <Link href="/sign-in" className="btn btn-lg glass">
                  Get Started Now
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="py-8 border-t border-base-200 mt-auto">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-3 h-3 text-white"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <span className="font-medium">Resume GlowUp</span>
            </div>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-base-content/70 hover:text-base-content transition-colors text-sm"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-base-content/70 hover:text-base-content transition-colors text-sm"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-base-content/70 hover:text-base-content transition-colors text-sm"
              >
                Contact
              </a>
            </div>
          </div>
          <div className="mt-6 text-center text-base-content/50 text-sm">
            <p>
              &copy; {new Date().getFullYear()} Resume Glowup. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
