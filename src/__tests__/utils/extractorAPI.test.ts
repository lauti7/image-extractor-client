import { extractImages, downloadSingleImage } from '../../utils/extractorAPI';
import { imagesMock } from '../../__mocks__/imagesMock';
import axios from 'axios';

jest.mock('axios');

describe('Utils - ExtractAPI', () => {
  it('extractImages() - when server responds OK', async () => {
    (axios.post as jest.Mock).mockResolvedValue({
      data: {
        images: imagesMock,
        message: '',
      },
    });
    const response = await extractImages('https://google.com');
    expect(response).toEqual({ images: imagesMock, error: false, message: '' });
  });

  it('extractImages() - when server responds with error', async () => {
    (axios.post as jest.Mock).mockRejectedValue({
      response: {
        status: 400,
        data: {
          images: [],
          error: true,
          message: 'weburl is missing',
        },
      },
    });

    try {
      await extractImages('https://google.com');
    } catch (responseError) {
      expect(responseError).toEqual({
        images: [],
        error: true,
        message: 'weburl is missing',
      });
    }
  });

  it('extractImages() - unexpected error', async () => {
    (axios.post as jest.Mock).mockImplementation(() => {
      throw new Error('ERROR MESSAGE');
    });

    try {
      await extractImages('https://google.com');
    } catch (error) {
      expect(error.message).toEqual('ERROR MESSAGE');
    }
  });

  it('downloadSingleImage() - when server responds OK', async () => {
    const blob = new Blob();
    (axios.get as jest.Mock).mockResolvedValue({
      data: blob,
    });

    const response = await downloadSingleImage(imagesMock[0].url);
    expect(response).toBe(blob);
  });

  it('downloadSingleImage() - when server fails', async () => {
    (axios.get as jest.Mock).mockRejectedValue({
      response: {
        status: 400,
        data: {
          error: true,
          message:
            'something went wrong while getting your image. Is it the correct url?',
        },
      },
    });

    try {
      await downloadSingleImage(imagesMock[0].url);
    } catch (responseError) {
      expect(responseError).toEqual({
        error: true,
        message:
          'something went wrong while getting your image. Is it the correct url?',
      });
    }
  });

  it('downloadSingleImage() - unexpected error', async () => {
    (axios.get as jest.Mock).mockImplementation(() => {
      throw new Error('ERROR MESSAGE');
    });

    try {
      await downloadSingleImage(imagesMock[0].url);
    } catch (error) {
      expect(error.message).toMatch('ERROR MESSAGE');
    }
  });
});
