import { OpenAI } from "@langchain/openai";
import { StructuredOutputParser } from "langchain/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { z } from "zod";

// Initialize the OpenAI model
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Create a parser for resume analysis
export const resumeAnalysisParser = StructuredOutputParser.fromZodSchema(
  z.object({
    strengths: z.array(z.string()).describe("Strengths of the resume"),
    weaknesses: z.array(z.string()).describe("Areas for improvement in the resume"),
    recommendations: z.array(z.string()).describe("Specific recommendations to improve the resume"),
    atsScore: z.number().min(0).max(100).describe("ATS compatibility score from 0-100"),
    atsIssues: z.array(z.string()).describe("Issues that might affect ATS compatibility"),
  })
);

// Resume analysis prompt
export const createResumeAnalysisPrompt = async (resumeContent: string) => {
  const format_instructions = resumeAnalysisParser.getFormatInstructions();

  const promptTemplate = new PromptTemplate({
    template: `You are an expert resume reviewer and career coach. Analyze the following resume and provide detailed feedback.

Resume content:
{resumeContent}

{format_instructions}

Provide a thorough analysis focusing on content, structure, formatting, and ATS compatibility.
For the ATS score, consider factors like proper keyword usage, formatting, and overall structure.
`,
    inputVariables: ["resumeContent"],
    partialVariables: { format_instructions },
  });

  return promptTemplate.format({ resumeContent });
};

// Create a parser for tailored resume
export const tailoredResumeParser = StructuredOutputParser.fromZodSchema(
  z.object({
    tailoredContent: z.string().describe("The tailored resume content"),
    changes: z.array(z.string()).describe("List of changes made to tailor the resume"),
    keywordsAdded: z.array(z.string()).describe("Keywords added to match the job description"),
  })
);

// Tailor resume prompt
export const createTailorResumePrompt = async (resumeContent: string, jobDescription: string) => {
  const format_instructions = tailoredResumeParser.getFormatInstructions();

  const promptTemplate = new PromptTemplate({
    template: `You are an expert resume writer. Tailor the following resume to match the job description provided.

Resume content:
{resumeContent}

Job Description:
{jobDescription}

{format_instructions}

Your task is to modify the resume to highlight relevant skills and experiences that match the job description.
Maintain the original format but adjust content to emphasize relevant qualifications.
Add appropriate keywords from the job description.
Do not fabricate experiences or skills that are not mentioned in the original resume.
`,
    inputVariables: ["resumeContent", "jobDescription"],
    partialVariables: { format_instructions },
  });

  return promptTemplate.format({ resumeContent, jobDescription });
};

// Create a parser for cover letter generation
export const coverLetterParser = StructuredOutputParser.fromZodSchema(
  z.object({
    coverLetter: z.string().describe("The complete cover letter"),
  })
);

// Cover letter generation prompt
export const createCoverLetterPrompt = async (resumeContent: string, jobDescription: string, company: string, jobTitle: string) => {
  const format_instructions = coverLetterParser.getFormatInstructions();

  const promptTemplate = new PromptTemplate({
    template: `You are an expert cover letter writer. Create a professional cover letter based on the resume and job description provided.

Resume content:
{resumeContent}

Job Description:
{jobDescription}

Company: {company}
Job Title: {jobTitle}

{format_instructions}

Your task is to write a compelling cover letter that:
1. Addresses the specific company and position
2. Highlights relevant skills and experiences from the resume that match the job description
3. Demonstrates enthusiasm for the role and company
4. Includes a professional greeting and closing
5. Is concise (no more than 400 words) and well-structured
6. Has a professional tone
`,
    inputVariables: ["resumeContent", "jobDescription", "company", "jobTitle"],
    partialVariables: { format_instructions },
  });

  return promptTemplate.format({ resumeContent, jobDescription, company, jobTitle });
};
