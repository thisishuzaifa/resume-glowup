import { useState } from 'react';

export interface FileUploadResult {
  fileUrl: string;
  fileName: string;
  fileSize: number;
  fileType: string;
}

export interface UseFileUploadOptions {
  endpoint: string;
  maxSizeMB?: number;
  allowedTypes?: string[];
  onUploadProgress?: (progress: number) => void;
}

export function useFileUpload({
  endpoint,
  maxSizeMB = 4,
  allowedTypes = ['application/pdf'],
  onUploadProgress
}: UseFileUploadOptions) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File): string | null => {
    // Check file size
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      return `File size exceeds the maximum allowed size of ${maxSizeMB}MB`;
    }

    // Check file type
    if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
      return `Invalid file type. Allowed types: ${allowedTypes.join(', ')}`;
    }

    return null;
  };

  const uploadFile = async (file: File): Promise<FileUploadResult | null> => {
    // Validate file before uploading
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return null;
    }

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const xhr = new XMLHttpRequest();
      
      // Set up progress tracking if callback provided
      if (onUploadProgress) {
        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable) {
            const progress = Math.round((event.loaded / event.total) * 100);
            onUploadProgress(progress);
          }
        });
      }

      // Create a promise to handle the XHR request
      const uploadPromise = new Promise<FileUploadResult>((resolve, reject) => {
        xhr.open('POST', endpoint);
        
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              const response = JSON.parse(xhr.responseText);
              resolve(response);
            } catch {
              reject(new Error('Invalid response format'));
            }
          } else {
            reject(new Error(`Upload failed with status ${xhr.status}`));
          }
        };
        
        xhr.onerror = () => reject(new Error('Network error occurred'));
        xhr.send(formData);
      });

      const result = await uploadPromise;
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    uploadFile,
    isUploading,
    error,
    clearError: () => setError(null)
  };
} 