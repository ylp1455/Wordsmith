import { ArticleOptions } from '../types';

// Mock AI API service (would connect to real API in production)
export async function generateArticle(
  pdfContent: string | null,
  prompt: string,
  options: ArticleOptions
): Promise<string> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // In a real application, this would send a request to your AI API
  console.log('Sending to AI API:', { pdfContent, prompt, options });
  
  // Mock response based on the input
  const toneText = getToneText(options.tone);
  const styleText = getStyleText(options.style);
  const lengthFactor = options.length / 500; // Normalize length
  
  // Generate a mock article based on the inputs
  return `# ${prompt.split(' ').slice(0, 5).join(' ')}...

${toneText} ${styleText} article on "${prompt}".

${generateMockParagraphs(options.length, pdfContent)}

This article was generated with AI based on your prompt and the uploaded document.`;
}

function getToneText(tone: string): string {
  const tones = {
    formal: 'A formal and professional',
    informal: 'A casual and conversational',
    persuasive: 'A compelling and persuasive',
    academic: 'A scholarly and well-researched',
    conversational: 'A friendly and approachable'
  };
  return tones[tone as keyof typeof tones] || 'A well-written';
}

function getStyleText(style: string): string {
  const styles = {
    essay: 'essay-style',
    article: 'informative',
    report: 'detailed report',
    blog: 'engaging blog post',
    technical: 'technical documentation'
  };
  return styles[style as keyof typeof styles] || 'comprehensive';
}

function generateMockParagraphs(length: number, pdfContent: string | null): string {
  const paragraphCount = Math.max(3, Math.floor(length / 200));
  let result = '';
  
  for (let i = 0; i < paragraphCount; i++) {
    result += `## Section ${i + 1}\n\n`;
    
    // Create 2-3 paragraphs per section
    for (let j = 0; j < 2 + Math.random(); j++) {
      const sentenceCount = 3 + Math.floor(Math.random() * 5);
      let paragraph = '';
      
      for (let k = 0; k < sentenceCount; k++) {
        const sentenceLength = 10 + Math.floor(Math.random() * 15);
        const words = [];
        
        for (let l = 0; l < sentenceLength; l++) {
          words.push(getRandomWord());
        }
        
        paragraph += words.join(' ') + '. ';
      }
      
      result += paragraph + '\n\n';
    }
  }
  
  // Add a reference to the PDF content if provided
  if (pdfContent) {
    result += '\n## References\n\nThis article was generated with reference to the uploaded document.\n';
  }
  
  return result;
}

function getRandomWord(): string {
  const words = [
    'article', 'content', 'writing', 'analysis', 'research', 'data', 'information',
    'study', 'report', 'findings', 'results', 'conclusion', 'introduction', 'method',
    'theory', 'practice', 'example', 'illustration', 'evidence', 'argument', 'point',
    'perspective', 'approach', 'technique', 'strategy', 'solution', 'problem', 'challenge',
    'opportunity', 'development', 'innovation', 'progress', 'advancement', 'improvement'
  ];
  
  return words[Math.floor(Math.random() * words.length)];
}

export async function parseUploadedPdf(file: File): Promise<string> {
  // In a real application, you would use PDF.js to extract text
  // For this demo, we'll just return a mock extraction
  
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return `Sample text extracted from ${file.name}. In a real application, the actual content of the PDF would be extracted using PDF.js or a similar library.`;
}