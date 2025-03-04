import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function DashboardPage() {
  const { userId } = await auth();
  const user = await currentUser();
  
  if (!userId || !user) {
    redirect("/sign-in");
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8">Welcome, {user.firstName || "User"}!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Upload Your Resume</h2>
          <p className="text-gray-600 mb-6">
            Upload your resume to get AI-powered feedback and improvements.
          </p>
          <div className="p-8 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 text-center">
            <p className="text-gray-500 mb-2">Drag and drop your resume here</p>
            <p className="text-gray-400 text-sm">or</p>
            <button className="mt-2 btn btn-primary">
              Browse Files
            </button>
            <p className="text-xs text-gray-400 mt-2">Supported formats: PDF, DOCX, TXT</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Add a Job Description</h2>
          <p className="text-gray-600 mb-6">
            Add a job description to tailor your resume and generate a cover letter.
          </p>
          <div className="space-y-4">
            <div>
              <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">
                Job Title
              </label>
              <input
                type="text"
                id="jobTitle"
                className="input input-bordered w-full"
                placeholder="e.g., Software Engineer"
              />
            </div>
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                Company
              </label>
              <input
                type="text"
                id="company"
                className="input input-bordered w-full"
                placeholder="e.g., Acme Inc."
              />
            </div>
            <div>
              <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700 mb-1">
                Job Description
              </label>
              <textarea
                id="jobDescription"
                rows={5}
                className="textarea textarea-bordered w-full"
                placeholder="Paste the job description here..."
              ></textarea>
            </div>
            <button className="btn btn-primary w-full">
              Save Job
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-8">
        <h2 className="text-xl font-semibold mb-6">Your Resumes</h2>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Title</th>
                <th>ATS Score</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center">
                <td colSpan={4} className="py-8 text-gray-500">
                  No resumes found. Upload your first resume to get started.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h2 className="text-xl font-semibold mb-6">Your Job Applications</h2>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Company</th>
                <th>Resume</th>
                <th>Cover Letter</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center">
                <td colSpan={6} className="py-8 text-gray-500">
                  No job applications found. Add a job description to get started.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
