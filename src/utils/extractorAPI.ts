import { ExtractResponse } from './interfaces';

const API_URL = process.env.API_URL;
const extractURL = `${API_URL}/extract/`;

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
          error: false,
        };
      } else {
        throw new Error('Server error');
      }
    })
    .catch((error) => {
      throw new Error(error);
    });
};
