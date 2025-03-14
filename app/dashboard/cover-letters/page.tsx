import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function CoverLettersPage() {
  const { userId } = await auth();
  const user = await currentUser();
  
  if (!userId || !user) {
    redirect("/sign-in");
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-light tracking-tight">Your Cover Letters</h1>
        <button className="btn btn-primary">
          Generate New Cover Letter
        </button>
      </div>
      
      <div className="card bg-base-100 shadow-sm border border-base-200 mb-8">
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Empty state */}
            <div className="col-span-full text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">No cover letters found</h3>
              <p className="text-base-content/70 mb-6 max-w-md mx-auto">
                Generate personalized cover letters for your job applications.
              </p>
              <button className="btn btn-primary">
                Generate Cover Letter
              </button>
            </div>
            
            {/* Cover letter card template (hidden for now) */}
            <div className="hidden card bg-base-100 shadow-sm border border-base-200 overflow-hidden">
              <div className="p-5">
                <h3 className="text-lg font-semibold mb-1">Cover Letter for Senior Software Engineer</h3>
                <p className="text-sm text-base-content/70 mb-3">Acme Corporation</p>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-base-content/50 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Generated on May 22, 2023</span>
                  </div>
                </div>
                <div className="mt-4 bg-base-200/50 p-3 rounded-md">
                  <p className="text-sm text-base-content/70 line-clamp-3">
                    Dear Hiring Manager, I am writing to express my interest in the Senior Software Engineer position at Acme Corporation. With over 5 years of experience in full-stack development...
                  </p>
                </div>
              </div>
              <div className="bg-base-200/50 px-5 py-3 border-t border-base-200 flex justify-between">
                <button className="text-sm text-base-content/70 hover:text-primary transition-colors">
                  View Full Letter
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
