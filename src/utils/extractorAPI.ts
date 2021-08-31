import axios from 'axios';
import { ExtractResponse } from './interfaces';

const API_URL = process.env.API_URL;
const extractURL = `${API_URL}/extract/`;
const downloadSingleImageURL = `${API_URL}/download/single?weburl=`;

export const extractImages = (url: string): Promise<ExtractResponse> => {
  return new Promise((resolve, reject) => {
    axios
      .post(extractURL, {
        weburl: url,
      })
      .then((response) => response.data)
      .then((json: ExtractResponse) => {
        resolve({
          images: json.images || [],
          message: json.message,
          error: false,
        });
      })
      .catch((responseError) => {
        if (
          responseError.response &&
          responseError.response.data &&
          responseError.response.status >= 400
        ) {
          reject({
            images: responseError.response.data.images,
            message: responseError.response.data.message,
            error: responseError.response.data.error,
          });
        } else {
          reject(new Error('Internal error'));
        }
      });
  });
};

export const downloadSingleImage = (imageURL: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${downloadSingleImageURL}${imageURL}`, {
        responseType: 'blob',
      })
      .then((response) => resolve(response.data))
      .catch((responseError) => {
        if (
          responseError.response &&
          responseError.response.data &&
          responseError.response.status >= 400
        ) {
          reject(responseError.response.data);
        } else {
          reject(new Error('Internal error'));
        }
      });
  });
};
