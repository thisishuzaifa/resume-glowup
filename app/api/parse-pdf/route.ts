import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import pdfParse from 'pdf-parse';

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get the file URL from query params
    const url = request.nextUrl.searchParams.get('url');
    if (!url) {
      return NextResponse.json(
        { error: 'No URL provided' },
        { status: 400 }
      );
    }

    // Fetch the PDF file
    const fileUrl = url.startsWith('/') ? `${request.nextUrl.origin}${url}` : url;
    const response = await fetch(fileUrl);
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch PDF file' },
        { status: 500 }
      );
    }

    // Parse the PDF
    const buffer = await response.arrayBuffer();
    const data = await pdfParse(Buffer.from(buffer));

    return NextResponse.json({
      text: data.text,
      info: {
        pageCount: data.numpages,
        author: data.info?.Author || null,
        title: data.info?.Title || null,
      }
    });
  } catch (error) {
    console.error('Error parsing PDF:', error);
    return NextResponse.json(
      { error: 'Failed to parse PDF' },
      { status: 500 }
    );
  }
} 