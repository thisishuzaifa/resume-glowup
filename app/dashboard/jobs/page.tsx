import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function JobsPage() {
  const { userId } = await auth();
  const user = await currentUser();
  
  if (!userId || !user) {
    redirect("/sign-in");
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-light tracking-tight">Your Job Listings</h1>
        <button className="btn btn-primary">
          Add New Job
        </button>
      </div>
      
      <div className="card bg-base-100 shadow-sm border border-base-200 mb-8">
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Empty state */}
            <div className="col-span-full text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">No job listings found</h3>
              <p className="text-base-content/70 mb-6 max-w-md mx-auto">
                Add job descriptions to tailor your resume and generate cover letters.
              </p>
              <button className="btn btn-primary">
                Add Job Description
              </button>
            </div>
            
            {/* Job card template (hidden for now) */}
            <div className="hidden card bg-base-100 shadow-sm border border-base-200 overflow-hidden">
              <div className="p-5">
                <h3 className="text-lg font-semibold mb-1">Senior Software Engineer</h3>
                <p className="text-sm text-base-content/70 mb-3">Acme Corporation</p>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-base-content/50 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>San Francisco, CA (Remote)</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-base-content/50 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Added on May 20, 2023</span>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="bg-primary/10 text-primary text-xs font-medium px-2.5 py-0.5 rounded">React</span>
                  <span className="bg-primary/10 text-primary text-xs font-medium px-2.5 py-0.5 rounded">TypeScript</span>
                  <span className="bg-primary/10 text-primary text-xs font-medium px-2.5 py-0.5 rounded">Node.js</span>
                </div>
              </div>
              <div className="bg-base-200/50 px-5 py-3 border-t border-base-200 flex justify-between">
                <button className="text-sm text-base-content/70 hover:text-primary transition-colors">
                  View Details
                </button>
                <div className="flex space-x-2">
                  <button className="text-sm text-base-content/70 hover:text-primary transition-colors">
                    Edit
                  </button>
                  <button className="text-sm text-base-content/70 hover:text-red-500 transition-colors">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
