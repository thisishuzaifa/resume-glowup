import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { OpenAI } from 'openai';

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get the job description from the request body
    const { jobDescription } = await request.json();
    
    if (!jobDescription) {
      return NextResponse.json(
        { error: 'No job description provided' },
        { status: 400 }
      );
    }

    // Analyze the job description with OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an expert job analyst and career coach. Analyze the job description and provide detailed insights.
          Focus on extracting key requirements, skills, and cultural aspects.
          Provide your response in a structured JSON format with the following fields:
          - keyRequirements: array of strings describing the main job requirements
          - requiredSkills: array of strings listing the required technical and soft skills
          - preferredSkills: array of strings listing the preferred or nice-to-have skills
          - cultureFit: array of strings describing the company culture and work environment
          - companyInsights
          - applicationTips: array of strings providing tips for applying to the job
          `
        },
        {
          role: "user",
          content: jobDescription
        }
      ]
    });

    return NextResponse.json(response.choices[0].message?.content);
  } catch (error) {
    console.error('Error analyzing job description:', error);
    return NextResponse.json(
      { error: 'Failed to analyze job description' },
      { status: 500 }
    );
  }
} 