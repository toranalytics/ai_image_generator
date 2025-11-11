export interface UploadedImage {
  id: string;
  file: File;
  preview: string;
  prompt: string;
  enhancedPrompt: string;
  generatedImages: string[];
  isGenerating: boolean;
  error: string | null;
}
