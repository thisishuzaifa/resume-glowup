declare module 'pdf-parse' {
  interface PDFInfo {
    Author?: string;
    Title?: string;
    [key: string]: string | undefined;
  }

  interface PDFData {
    text: string;
    numpages: number;
    info: PDFInfo;
  }

  function PDFParse(dataBuffer: Buffer): Promise<PDFData>;
  export = PDFParse;
} 