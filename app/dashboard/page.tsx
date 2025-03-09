import { FileText, Briefcase, FileSignature, Sparkles } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-200">
      <div className="container mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">
            <span className="text-primary">Resume</span> GlowUp
          </h1>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            Enhance your resume, analyze job descriptions, and create compelling cover letters with AI assistance
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Link href="/resume-analysis" className="group">
            <div className="card bg-base-100 shadow-card hover:shadow-hover border border-base-300 rounded-2xl transition-all duration-300 transform group-hover:-translate-y-1 h-full overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
              <div className="card-body p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mr-4">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="card-title text-xl font-semibold">Resume Analysis</h2>
                </div>
                <p className="text-base-content/70 mb-6">
                  Upload your resume and get AI-powered feedback to improve it. Identify strengths, weaknesses, and ATS compatibility.
                </p>
                <div className="card-actions justify-end mt-auto">
                  <button className="btn btn-primary btn-md rounded-xl px-6">
                    Analyze Resume
                  </button>
                </div>
              </div>
            </div>
          </Link>
          
          <Link href="/job-analysis" className="group">
            <div className="card bg-base-100 shadow-card hover:shadow-hover border border-base-300 rounded-2xl transition-all duration-300 transform group-hover:-translate-y-1 h-full overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-secondary"></div>
              <div className="card-body p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mr-4">
                    <Briefcase className="w-6 h-6 text-secondary" />
                  </div>
                  <h2 className="card-title text-xl font-semibold">Job Description Analysis</h2>
                </div>
                <p className="text-base-content/70 mb-6">
                  Analyze job descriptions to identify key requirements, skills, and cultural fit indicators.
                </p>
                <div className="card-actions justify-end mt-auto">
                  <button className="btn btn-secondary btn-md rounded-xl px-6">
                    Analyze Job
                  </button>
                </div>
              </div>
            </div>
          </Link>
        </div>
        
        <div className="mb-12">
          <Link href="/cover-letter" className="group">
            <div className="card bg-base-100 shadow-card hover:shadow-hover border border-base-300 rounded-2xl transition-all duration-300 transform group-hover:-translate-y-1 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-accent"></div>
              <div className="card-body p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mr-4">
                    <FileSignature className="w-6 h-6 text-accent" />
                  </div>
                  <h2 className="card-title text-xl font-semibold">Cover Letter Generator</h2>
                </div>
                <p className="text-base-content/70 mb-6">
                  Generate tailored cover letters based on your resume and job descriptions. Stand out with personalized content.
                </p>
                <div className="card-actions justify-end">
                  <button className="btn bg-accent hover:bg-accent-focus text-white btn-md rounded-xl px-6">
                    Create Cover Letter
                  </button>
                </div>
              </div>
            </div>
          </Link>
        </div>
        
        <div className="card bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 shadow-soft rounded-2xl border border-base-300">
          <div className="card-body p-8">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-xl bg-base-100 flex items-center justify-center mr-4 shadow-soft">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <h2 className="card-title text-xl font-semibold">Pro Tips</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-base-100 p-6 rounded-xl shadow-soft border border-base-200">
                <h3 className="font-semibold text-primary mb-3">Tailor Your Resume</h3>
                <p className="text-sm text-base-content/80 leading-relaxed">
                  Customize your resume for each job application to highlight relevant skills and experience that match the position.
                </p>
              </div>
              
              <div className="bg-base-100 p-6 rounded-xl shadow-soft border border-base-200">
                <h3 className="font-semibold text-secondary mb-3">Use Keywords</h3>
                <p className="text-sm text-base-content/80 leading-relaxed">
                  Include industry-specific keywords from the job description to pass ATS screening and improve visibility.
                </p>
              </div>
              
              <div className="bg-base-100 p-6 rounded-xl shadow-soft border border-base-200">
                <h3 className="font-semibold text-accent mb-3">Quantify Achievements</h3>
                <p className="text-sm text-base-content/80 leading-relaxed">
                  Use numbers and metrics to demonstrate your impact and results in previous roles for more compelling content.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
