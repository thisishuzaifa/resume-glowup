import { OpenAI } from 'openai';

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

export async function analyzeResume(resumeContent: string): Promise<ResumeAnalysis> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `Analyze the resume content and provide detailed feedback in JSON format with:
          - strengths: array of resume strengths
          - weaknesses: array of areas to improve
          - recommendations: array of specific suggestions
          - atsScore: number from 0-100 for ATS compatibility
          - atsIssues: array of ATS-related issues`
        },
        {
          role: "user",
          content: resumeContent
        }
      ],
      response_format: { type: "json_object" }
    });

    return JSON.parse(response.choices[0].message.content || '{}') as ResumeAnalysis;
  } catch (error) {
    console.error('Error analyzing resume:', error);
    throw new Error('Failed to analyze resume');
  }
} 