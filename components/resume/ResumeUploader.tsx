'use client';

import { useState } from 'react';
import { useFileUpload } from '@/utils/fileUpload';
import { Loader2, Upload, FileText, CheckCircle } from 'lucide-react';

interface ResumeInsights {
  score: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
}

export default function ResumeUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [parsing, setParsing] = useState(false);
  const [insights, setInsights] = useState<ResumeInsights | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const { uploadFile, isUploading, error, clearError } = useFileUpload({
    endpoint: '/api/upload',
    maxSizeMB: 4,
    allowedTypes: ['application/pdf'],
    onUploadProgress: (progress) => setUploadProgress(progress)
  });
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        // Show error toast or message
        return;
      }
      
      setFile(selectedFile);
      setUploadComplete(false);
      setInsights(null);
      clearError();
    }
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      if (droppedFile.type !== 'application/pdf') {
        // Show error toast or message
        return;
      }
      
      setFile(droppedFile);
      setUploadComplete(false);
      setInsights(null);
      clearError();
    }
  };
  
  const handleUpload = async () => {
    if (!file) return;
    
    try {
      setParsing(true);
      
      const result = await uploadFile(file);
      
      if (!result) {
        throw new Error("Upload failed");
      }
      
      setUploadComplete(true);
      
      // Placeholder for resume parsing
      setTimeout(() => {
        // Placeholder for AI insights - this would be replaced with actual API call
        const mockInsights: ResumeInsights = {
          score: 82,
          strengths: [
            "Good experience section with quantifiable achievements",
            "Clear skills section with relevant technologies"
          ],
          weaknesses: [
            "Summary could be more tailored to specific roles",
            "Education section lacks details"
          ],
          suggestions: [
            "Add metrics to demonstrate impact in your roles",
            "Include relevant certifications if available"
          ]
        };
        
        setInsights(mockInsights);
        setParsing(false);
      }, 3000);
      
    } catch (err) {
      console.error("Upload error:", err);
      // Show error toast or message
    } finally {
      setUploadProgress(0);
    }
  };
  
  return (
    <div className="card bg-base-100 font-light shadow-sm border border-base-200">
      <div className="card-body p-4">
        <h2 className="text-xl font-light mb-4">Upload Your Resume</h2>
        <p className="text-base-content/70 mb-6">
          Upload your resume to get AI-powered feedback and improvements.
        </p>
        
        {error && (
          <div className="alert alert-error mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{error}</span>
          </div>
        )}
        
        {!uploadComplete ? (
          <div 
            className="p-8 border-2 border-dashed border-base-300 rounded-lg bg-base-200/50 text-center"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center">
              <Upload className="h-10 w-10 text-base-content/50 mb-2" />
              <p className="text-base-content/70 mb-2">
                {file ? file.name : "Drag and drop your resume here"}
              </p>
              <p className="text-base-content/50 text-sm mb-4">or</p>
              <label className="btn btn-primary">
                Browse Files
                <input 
                  type="file" 
                  accept=".pdf" 
                  className="hidden" 
                  onChange={handleFileChange}
                />
              </label>
              <p className="text-xs text-base-content/50 mt-2">Supported format: PDF</p>
              
              {file && (
                <>
                  {isUploading && uploadProgress > 0 && (
                    <div className="w-full mt-4">
                      <progress className="progress progress-primary w-full" value={uploadProgress} max="100"></progress>
                      <p className="text-xs text-center mt-1">{uploadProgress}%</p>
                    </div>
                  )}
                  
                  <button 
                    className="btn btn-primary mt-4"
                    onClick={handleUpload}
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>Upload Resume</>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center p-4 bg-success/10 rounded-lg">
              <CheckCircle className="h-6 w-6 text-success mr-3" />
              <div>
                <p className="font-medium">Resume uploaded successfully</p>
                <p className="text-sm text-base-content/70">Your resume has been uploaded and analyzed</p>
              </div>
            </div>
            
            <div className="flex items-center p-4 border border-base-200 rounded-lg">
              <FileText className="h-6 w-6 text-primary mr-3" />
              <div className="flex-1">
                <p className="font-medium">{file?.name}</p>
                <p className="text-sm text-base-content/70">
                  {new Date().toLocaleDateString()}
                </p>
              </div>
              <button 
                className="btn btn-sm btn-outline"
                onClick={() => {
                  setFile(null);
                  setUploadComplete(false);
                  setInsights(null);
                }}
              >
                Replace
              </button>
            </div>
            
            {parsing ? (
              <div className="p-6 border border-base-200 rounded-lg">
                <div className="flex items-center justify-center space-x-2">
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                  <p>Analyzing your resume...</p>
                </div>
              </div>
            ) : insights ? (
              <div className="p-6 border border-base-200 rounded-lg space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Resume Analysis</h3>
                  <div className="badge badge-lg bg-primary/10 text-primary">
                    Score: {insights.score}/100
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Strengths</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {insights.strengths.map((strength, i) => (
                      <li key={i} className="text-sm">{strength}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Areas for Improvement</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {insights.weaknesses.map((weakness, i) => (
                      <li key={i} className="text-sm">{weakness}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Suggestions</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {insights.suggestions.map((suggestion, i) => (
                      <li key={i} className="text-sm">{suggestion}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
