'use client';

import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Briefcase, Loader2 } from 'lucide-react';

interface MatchResults {
  matchScore: number;
  keywordMatch: {
    matched: string[];
    missing: string[];
  };
  improvementSuggestions: string[];
  coverLetterSuggestion: string | null;
}

export default function JobDescription() {
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [description, setDescription] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [matchResults, setMatchResults] = useState<MatchResults | null>(null);
  
  const { toast } = useToast();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!jobTitle || !description) {
      toast({
        title: "Missing information",
        description: "Please provide both a job title and description",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setAnalyzing(true);
      
      // This is a placeholder for the actual API call
      // Will be replaced when you have the API key
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Mock results
      const mockResults: MatchResults = {
        matchScore: 75,
        keywordMatch: {
          matched: ["React", "TypeScript", "Node.js", "API development"],
          missing: ["Docker", "Kubernetes", "CI/CD pipelines"]
        },
        improvementSuggestions: [
          "Highlight your experience with API development more prominently",
          "Add specific examples of React projects you've worked on",
          "Include metrics that demonstrate the impact of your work"
        ],
        coverLetterSuggestion: 
          "Your cover letter should emphasize your experience with React and Node.js development, and highlight any projects where you've worked with APIs. Consider mentioning your problem-solving skills and ability to work in a team environment."
      };
      
      setMatchResults(mockResults);
      
      toast({
        title: "Analysis complete",
        description: "We've analyzed your resume against this job description",
      });
      
    } catch (error) {
      console.error("Analysis error:", error);
      toast({
        title: "Analysis failed",
        description: "There was an error analyzing your job description. Please try again.",
        variant: "destructive"
      });
    } finally {
      setAnalyzing(false);
    }
  };
  
  return (
    <div className="card bg-base-100 shadow-sm border p-4 border-base-200">
      <div className="card-body">
        <h2 className="text-xl font-light mb-4">Add a Job Description</h2>
        <p className="text-base-content/70 mb-6">
          Add a job description to tailor your resume and generate a cover letter.
        </p>
        
        {!matchResults ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="jobTitle" className="block text-sm font-medium text-base-content/70 mb-1">
                Job Title
              </label>
              <input
                type="text"
                id="jobTitle"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="input shadow-lg p-2 rounded-lg input-bordered border-2 border-b-neutral-100 w-full"
                placeholder="e.g., Software Engineer"
              />
            </div>
            
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-base-content/70 mb-1">
                Company (Optional)
              </label>
              <input
                type="text"
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="input shadow-lg p-2 rounded-lg input-bordered border-2 border-b-neutral-100 w-full"
                placeholder="e.g., Acme Inc."
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-base-content/70 mb-1">
                Job Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                className="textarea shadow-lg p-2 rounded-lg textarea-bordered border-2 border-b-neutral-100 w-full"
                placeholder="Paste the job description here..."
              />
            </div>
            
            <button 
              type="submit"
              className="btn btn-primary w-full"
              disabled={analyzing}
            >
              {analyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>Analyze Job Description</>
              )}
            </button>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center p-4 bg-info/10 rounded-lg">
              <Briefcase className="h-6 w-6 text-info mr-3" />
              <div>
                <p className="font-medium">{jobTitle}</p>
                <p className="text-sm text-base-content/70">{company || "Company not specified"}</p>
              </div>
            </div>
            
            <div className="p-6 border border-base-200 rounded-lg space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Resume Match Analysis</h3>
                <div className="badge badge-lg bg-primary/10 text-primary">
                  Match: {matchResults.matchScore}%
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Matched Keywords</h4>
                <div className="flex flex-wrap gap-2">
                  {matchResults.keywordMatch.matched.map((keyword: string, i: number) => (
                    <span key={i} className="badge badge-success badge-outline">{keyword}</span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Missing Keywords</h4>
                <div className="flex flex-wrap gap-2">
                  {matchResults.keywordMatch.missing.map((keyword: string, i: number) => (
                    <span key={i} className="badge badge-error badge-outline">{keyword}</span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Improvement Suggestions</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {matchResults.improvementSuggestions.map((suggestion: string, i: number) => (
                    <li key={i} className="text-sm">{suggestion}</li>
                  ))}
                </ul>
              </div>
              
              <div className="pt-4 border-t border-base-200">
                <h4 className="font-medium mb-2">Cover Letter Suggestion</h4>
                <p className="text-sm">{matchResults.coverLetterSuggestion}</p>
              </div>
              
              <div className="pt-4 border-t border-base-200">
                <p className="text-sm text-base-content/70">
                  Note: This is a placeholder for AI-powered job matching. 
                  Actual analysis will be available once API integration is complete.
                </p>
              </div>
              
              <button 
                className="btn btn-outline w-full"
                onClick={() => setMatchResults(null)}
              >
                Try Another Job Description
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
