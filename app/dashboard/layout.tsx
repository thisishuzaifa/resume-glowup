import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-base-100">
      {/* Navigation */}
      <nav className="border-b border-base-200 py-4">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
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
              <div className="hidden md:flex space-x-8 ml-10">
                <Link href="/dashboard" className="text-base-content/70 hover:text-base-content transition-colors">
                  Dashboard
                </Link>
                <Link href="/dashboard/resumes" className="text-base-content/70 hover:text-base-content transition-colors">
                  Resumes
                </Link>
                <Link href="/dashboard/jobs" className="text-base-content/70 hover:text-base-content transition-colors">
                  Jobs
                </Link>
                <Link href="/dashboard/cover-letters" className="text-base-content/70 hover:text-base-content transition-colors">
                  Cover Letters
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </div>
      </nav>
      
      {/* Mobile Navigation */}
      <div className="md:hidden bg-base-100 border-t border-base-200 fixed bottom-0 w-full shadow-lg">
        <div className="flex justify-around">
          <Link href="/dashboard" className="flex flex-col items-center py-2 px-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-base-content/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-xs mt-1">Dashboard</span>
          </Link>
          <Link href="/dashboard/resumes" className="flex flex-col items-center py-2 px-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-base-content/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-xs mt-1">Resumes</span>
          </Link>
          <Link href="/dashboard/jobs" className="flex flex-col items-center py-2 px-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-base-content/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-xs mt-1">Jobs</span>
          </Link>
          <Link href="/dashboard/cover-letters" className="flex flex-col items-center py-2 px-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-base-content/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-xs mt-1">Letters</span>
          </Link>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="pb-16 md:pb-0">
        {children}
      </main>
    </div>
  );
}
