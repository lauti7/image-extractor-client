import { ExtractResponse } from './interfaces';

const API_URL = process.env.API_URL;
const extractURL = `${API_URL}/extract/`;
const downloadSingleImageURL = `${API_URL}/download/single?weburl=`;

export const extractImages = (url: string): Promise<ExtractResponse> => {
  return fetch(extractURL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ weburl: url }),
  })
    .then((response) => response.json())
    .then((json: ExtractResponse) => {
      if (!json.error) {
        return {
          images: json.images,
          message: json.message,
          error: false,
        };
      } else {
        throw new Error('Server error');
      }
    })
    .catch((error) => {
      throw new Error('Server error');
    });
};

export const downloadSingleImage = (imageURL: string): Promise<any> => {
  return fetch(`${downloadSingleImageURL}${imageURL}`)
    .then((response) => response.blob())
    .catch((error) => {
      throw new Error(error);
    });
};
