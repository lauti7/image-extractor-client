export interface ImageResponse {
  name: string;
  fileName: string;
  url: string;
  type: string;
}

export interface ExtractResponse {
  images: ImageResponse[] | null;
  message: string;
  error?: boolean;
}
