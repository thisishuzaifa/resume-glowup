import { OpenAI } from 'openai';

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface ResumeAnalysis {
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  atsScore: number;
  atsIssues: string[];
}

export interface TailoredResume {
  tailoredContent: string;
  changes: string[];
  keywordsAdded: string[];
}

export interface CoverLetter {
  coverLetter: string;
}

/**
 * Analyzes a resume and provides feedback
 */
export async function analyzeResume(resumeContent: string): Promise<ResumeAnalysis> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an expert resume reviewer and career coach. Analyze the resume content and provide detailed feedback.
          Focus on content, structure, formatting, and ATS compatibility.
          For the ATS score, consider factors like proper keyword usage, formatting, and overall structure.
          Provide your response in a structured JSON format with the following fields:
          - strengths: array of strings describing strengths of the resume
          - weaknesses: array of strings describing areas for improvement
          - recommendations: array of specific recommendations to improve the resume
          - atsScore: number from 0-100 representing ATS compatibility
          - atsIssues: array of strings describing issues that might affect ATS compatibility`
        },
        {
          role: "user",
          content: resumeContent
        }
      ],
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    return result as ResumeAnalysis;
  } catch (error) {
    console.error('Error analyzing resume:', error);
    throw new Error('Failed to analyze resume');
  }
}

/**
 * Tailors a resume to match a job description
 */
export async function tailorResume(resumeContent: string, jobDescription: string): Promise<TailoredResume> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an expert resume writer. Tailor the resume to match the job description provided.
          Your task is to modify the resume to highlight relevant skills and experiences that match the job description.
          Maintain the original format but adjust content to emphasize relevant qualifications.
          Add appropriate keywords from the job description.
          Do not fabricate experiences or skills that are not mentioned in the original resume.
          Provide your response in a structured JSON format with the following fields:
          - tailoredContent: string containing the complete tailored resume
          - changes: array of strings describing changes made to tailor the resume
          - keywordsAdded: array of strings listing keywords added to match the job description`
        },
        {
          role: "user",
          content: `Resume content: ${resumeContent}\n\nJob Description: ${jobDescription}`
        }
      ],
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    return result as TailoredResume;
  } catch (error) {
    console.error('Error tailoring resume:', error);
    throw new Error('Failed to tailor resume');
  }
}

/**
 * Generates a cover letter based on resume and job description
 */
export async function generateCoverLetter(
  resumeContent: string, 
  jobDescription: string, 
  company: string, 
  jobTitle: string
): Promise<CoverLetter> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an expert cover letter writer. Create a professional cover letter based on the resume and job description provided.
          Your task is to write a compelling cover letter that:
          1. Addresses the specific company and position
          2. Highlights relevant skills and experiences from the resume that match the job description
          3. Demonstrates enthusiasm for the role and company
          4. Includes a professional greeting and closing
          5. Is concise (no more than 400 words) and well-structured
          6. Has a professional tone
          Provide your response in a structured JSON format with the following field:
          - coverLetter: string containing the complete cover letter`
        },
        {
          role: "user",
          content: `Resume content: ${resumeContent}\n\nJob Description: ${jobDescription}\n\nCompany: ${company}\n\nJob Title: ${jobTitle}`
        }
      ],
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    return result as CoverLetter;
  } catch (error) {
    console.error('Error generating cover letter:', error);
    throw new Error('Failed to generate cover letter');
  }
} 