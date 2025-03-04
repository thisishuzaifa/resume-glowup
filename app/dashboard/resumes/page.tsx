import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function ResumesPage() {
  const { userId } = await auth();
  const user = await currentUser();
  
  if (!userId || !user) {
    redirect("/sign-in");
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-light tracking-tight">Your Resumes</h1>
        <button className="btn btn-primary">
          Upload New Resume
        </button>
      </div>
      
      <div className="card bg-base-100 shadow-sm border border-base-200 mb-8">
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Empty state */}
            <div className="col-span-full text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">No resumes found</h3>
              <p className="text-base-content/70 mb-6 max-w-md mx-auto">
                Upload your first resume to get AI-powered feedback and improvements.
              </p>
              <button className="btn btn-primary">
                Upload Resume
              </button>
            </div>
            
            {/* Resume card template (hidden for now) */}
            <div className="hidden card bg-base-100 shadow-sm border border-base-200 overflow-hidden">
              <div className="p-5">
                <h3 className="text-lg font-semibold mb-2">Software Engineer Resume</h3>
                <div className="flex items-center text-sm text-base-content/70 mb-4">
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    ATS Score: 85/100
                  </span>
                  <span className="mx-2">•</span>
                  <span>Uploaded on May 15, 2023</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-base-content/70">Keyword Match</span>
                    <span className="text-sm font-medium">75%</span>
                  </div>
                  <div className="w-full bg-base-200 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "75%" }}></div>
                  </div>
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
