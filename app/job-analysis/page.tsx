'use client';

import { useState } from 'react';
import { ArrowLeft, Briefcase, Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

interface JobAnalysis {
  keyRequirements: string[];
  requiredSkills: string[];
  preferredSkills: string[];
  cultureFit: string[];
  companyInsights: string;
  applicationTips: string[];
}

export default function JobAnalysisPage() {
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<JobAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const handleAnalyze = async () => {
    if (!jobDescription.trim()) return;
    
    setIsAnalyzing(true);
    setError(null);
    
    try {
      // Call the API to analyze the job description
      const response = await fetch('/api/analyze-job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jobDescription }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to analyze job description');
      }
      
      const data = await response.json();
      setAnalysis(data);
    } catch (error) {
      console.error('Error analyzing job description:', error);
      setError('Failed to analyze job description. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-200 py-12 px-4">
      <div className="container mx-auto">
        <div className="mb-8">
          <Link href="/dashboard" className="btn btn-ghost gap-2 rounded-xl">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-3">
            <span className="text-secondary">Job</span> Analysis
          </h1>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            Analyze job descriptions to identify key requirements, skills, and cultural fit
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="card bg-base-100 shadow-card rounded-2xl border border-base-300 overflow-hidden">
            <div className="card-body p-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center mr-4">
                  <Briefcase className="w-5 h-5 text-secondary" />
                </div>
                <h2 className="text-xl font-semibold">Analyze Job Description</h2>
              </div>
              
              {error && (
                <div className="alert alert-error mb-6 rounded-xl">
                  <AlertCircle className="h-5 w-5" />
                  <span>{error}</span>
                </div>
              )}
              
              <div className="form-control mb-6">
                <textarea 
                  className="textarea textarea-bordered h-64 w-full rounded-xl focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                  placeholder="Paste job description here..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                ></textarea>
              </div>
              
              <div className="flex justify-end">
                <button 
                  className="btn btn-secondary rounded-xl px-8"
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !jobDescription.trim()}
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>Analyze Job</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 