'use client';

import { useState } from 'react';
import { useFileUpload } from '@/utils/fileUpload';
import { analyzeResume } from '@/utils/ai';
import { Loader2, Upload, FileText, CheckCircle, ArrowLeft, Download, AlertCircle } from 'lucide-react';
import Link from 'next/link';

interface ResumeAnalysis {
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  atsScore: number;
  atsIssues: string[];
}

export default function ResumeAnalysisPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [parsing, setParsing] = useState(false);
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
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
        return;
      }
      
      setFile(selectedFile);
      setUploadComplete(false);
      setAnalysis(null);
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
        return;
      }
      
      setFile(droppedFile);
      setUploadComplete(false);
      setAnalysis(null);
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
      
      // Extract text from PDF
      const response = await fetch(`/api/parse-pdf?url=${encodeURIComponent(result.fileUrl)}`);
      if (!response.ok) {
        throw new Error("Failed to parse PDF");
      }
      
      const data = await response.json();
      
      // Analyze resume with AI
      const analysisResult = await analyzeResume(data.text);
      setAnalysis(analysisResult);
      
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setParsing(false);
      setUploadProgress(0);
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
            <span className="text-primary">Resume</span> Analysis
          </h1>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            Upload your resume to get AI-powered feedback and suggestions for improvement
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="card bg-base-100 shadow-card rounded-2xl border border-base-300 overflow-hidden">
            <div className="card-body p-8">
              {error && (
                <div className="alert alert-error mb-6 rounded-xl">
                  <AlertCircle className="h-5 w-5" />
                  <span>{error}</span>
                </div>
              )}
              
              {!uploadComplete ? (
                <div 
                  className="p-10 border-2 border-dashed border-base-300 rounded-xl bg-base-200/30 text-center"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Upload className="h-8 w-8 text-primary" />
                    </div>
                    <p className="text-lg font-medium text-base-content mb-2">
                      {file ? file.name : "Drag and drop your resume here"}
                    </p>
                    <p className="text-base-content/60 text-sm mb-6">or</p>
                    <label className="btn btn-primary rounded-xl px-6">
                      Browse Files
                      <input 
                        type="file" 
                        accept=".pdf" 
                        className="hidden" 
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="text-xs text-base-content/50 mt-4">Supported format: PDF (Max 4MB)</p>
                    
                    {file && (
                      <>
                        {isUploading && uploadProgress > 0 && (
                          <div className="w-full mt-8">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Uploading...</span>
                              <span>{uploadProgress}%</span>
                            </div>
                            <progress className="progress progress-primary w-full h-2" value={uploadProgress} max="100"></progress>
                          </div>
                        )}
                        
                        <button 
                          className="btn btn-primary rounded-xl px-8 mt-8"
                          onClick={handleUpload}
                          disabled={isUploading}
                        >
                          {isUploading ? (
                            <>
                              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                              Uploading...
                            </>
                          ) : (
                            <>Analyze Resume</>
                          )}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="flex items-center p-4 bg-success/10 rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center mr-4">
                      <CheckCircle className="h-5 w-5 text-success" />
                    </div>
                    <div>
                      <p className="font-medium">Resume uploaded successfully</p>
                      <p className="text-sm text-base-content/70">Your resume has been uploaded and analyzed</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-base-200/50 rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{file?.name}</p>
                      <p className="text-sm text-base-content/70">
                        {new Date().toLocaleDateString()}
                      </p>
                    </div>
                    <button 
                      className="btn btn-outline btn-sm rounded-lg"
                      onClick={() => {
                        setFile(null);
                        setUploadComplete(false);
                        setAnalysis(null);
                      }}
                    >
                      Replace
                    </button>
                  </div>
                  
                  {parsing ? (
                    <div className="p-12 border border-base-300 rounded-xl bg-base-100">
                      <div className="flex flex-col items-center justify-center">
                        <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
                        <p className="text-lg font-medium">Analyzing your resume...</p>
                        <p className="text-sm text-base-content/70 mt-2">This may take a moment</p>
                      </div>
                    </div>
                  ) : analysis ? (
                    <div className="border border-base-300 rounded-xl bg-base-100 overflow-hidden">
                      <div className="p-6 border-b border-base-200 bg-base-200/30">
                        <div className="flex justify-between items-center">
                          <h3 className="text-xl font-semibold">Resume Analysis</h3>
                          <div className="badge badge-lg px-4 py-3 rounded-lg" style={{
                            backgroundColor: getScoreColor(analysis.atsScore),
                            color: 'white'
                          }}>
                            ATS Score: {analysis.atsScore}/100
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-6">
                            <div className="bg-primary/5 p-5 rounded-xl border border-primary/10">
                              <h4 className="font-semibold text-primary flex items-center mb-3">
                                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                                  <span className="text-primary text-xs">✓</span>
                                </div>
                                Strengths
                              </h4>
                              <ul className="space-y-2">
                                {analysis.strengths.map((strength, i) => (
                                  <li key={i} className="flex items-start">
                                    <span className="text-primary mr-2">•</span>
                                    <span className="text-sm">{strength}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div className="bg-error/5 p-5 rounded-xl border border-error/10">
                              <h4 className="font-semibold text-error flex items-center mb-3">
                                <div className="w-6 h-6 rounded-full bg-error/10 flex items-center justify-center mr-2">
                                  <span className="text-error text-xs">!</span>
                                </div>
                                Areas for Improvement
                              </h4>
                              <ul className="space-y-2">
                                {analysis.weaknesses.map((weakness, i) => (
                                  <li key={i} className="flex items-start">
                                    <span className="text-error mr-2">•</span>
                                    <span className="text-sm">{weakness}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          
                          <div className="space-y-6">
                            <div className="bg-accent/5 p-5 rounded-xl border border-accent/10">
                              <h4 className="font-semibold text-accent flex items-center mb-3">
                                <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center mr-2">
                                  <span className="text-accent text-xs">↗</span>
                                </div>
                                Recommendations
                              </h4>
                              <ul className="space-y-2">
                                {analysis.recommendations.map((recommendation, i) => (
                                  <li key={i} className="flex items-start">
                                    <span className="text-accent mr-2">•</span>
                                    <span className="text-sm">{recommendation}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div className="bg-warning/5 p-5 rounded-xl border border-warning/10">
                              <h4 className="font-semibold text-warning flex items-center mb-3">
                                <div className="w-6 h-6 rounded-full bg-warning/10 flex items-center justify-center mr-2">
                                  <span className="text-warning text-xs">⚠</span>
                                </div>
                                ATS Issues
                              </h4>
                              <ul className="space-y-2">
                                {analysis.atsIssues.map((issue, i) => (
                                  <li key={i} className="flex items-start">
                                    <span className="text-warning mr-2">•</span>
                                    <span className="text-sm">{issue}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-end pt-4 border-t border-base-200">
                          <button className="btn btn-primary rounded-xl gap-2">
                            <Download className="h-4 w-4" />
                            Download Analysis
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getScoreColor(score: number): string {
  if (score >= 80) return '#36d399'; // Success
  if (score >= 60) return '#fbbd23'; // Warning
  return '#f87272'; // Error
} 