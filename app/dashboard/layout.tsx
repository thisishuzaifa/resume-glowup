'use client';

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-base-100">
      {/* Navigation - completely redesigned with no border */}
      <header className="sticky top-0 z-10 backdrop-blur-sm bg-base-100/90">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="text-xl font-medium text-base-content">
              Resume Glowup
            </Link>
            
            <nav className="hidden md:flex items-center space-x-1">
              <NavLink href="/dashboard">Dashboard</NavLink>
              <NavLink href="/dashboard/resumes">Resumes</NavLink>
              <NavLink href="/dashboard/jobs">Jobs</NavLink>
              <NavLink href="/dashboard/cover-letters">Cover Letters</NavLink>
              <div className="ml-6">
                <UserButton afterSignOutUrl="/" />
              </div>
            </nav>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile Navigation - Cylinder Shape */}
      <div className="md:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex items-center bg-base-300/90 backdrop-blur-md rounded-full px-2 py-1 shadow-lg">
          <MobileNavLink href="/dashboard" icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          }>
            Dashboard
          </MobileNavLink>
          
          <MobileNavLink href="/dashboard/resumes" icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          }>
            Resumes
          </MobileNavLink>
          
          <MobileNavLink href="/dashboard/jobs" icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          }>
            Jobs
          </MobileNavLink>
          
          <MobileNavLink href="/dashboard/cover-letters" icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          }>
            Letters
          </MobileNavLink>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="pb-20 md:pb-0 pt-4">
        {children}
      </main>
    </div>
  );
}

// Client component for active link highlighting
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = pathname === href;
  
  return (
    <Link
      href={href}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
        isActive 
          ? 'bg-primary/10 text-primary' 
          : 'text-base-content/70 hover:bg-base-200/50 hover:text-base-content'
      }`}
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ href, icon, children }: { href: string; icon: React.ReactNode; children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = pathname === href;
  
  return (
    <Link href={href} className={`flex flex-col items-center py-1 px-4 ${
      isActive ? 'text-primary' : 'text-base-content/70'
    }`}>
      {icon}
      <span className="text-[10px] mt-0.5">{children}</span>
    </Link>
  );
}
