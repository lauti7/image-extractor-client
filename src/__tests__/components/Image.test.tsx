import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Image from '../../components/Image';
import { imagesMock } from '../../__mocks__/imagesMock';
import { downloadSingleImage } from '../../utils/extractorAPI';

jest.mock('../../utils/extractorAPI');

const forceRenderSizes = () => {
  Object.defineProperty(HTMLImageElement.prototype, 'naturalHeight', {
    get: () => 120,
  });
  Object.defineProperty(HTMLImageElement.prototype, 'naturalWidth', {
    get: () => 80,
  });
};

describe('<Image />', () => {
  afterAll(() => {
    jest.resetAllMocks();
  });
  it('it renders properly', async () => {
    render(<Image image={imagesMock[0]} />);

    forceRenderSizes();
    expect(screen.getByTestId('img')).toHaveAttribute('src', imagesMock[0].url);
    fireEvent.load(screen.getByTestId('img'));
    expect(screen.getByTestId('img-size')).not.toHaveTextContent('0 x 0');
    expect(screen.getByText(imagesMock[0].type)).toBeInTheDocument();
    expect(screen.getByTestId('img-download')).toBeInTheDocument();
    expect(screen.getByText('Invert Background')).toBeInTheDocument();
  });

  it('should change image background color', () => {
    render(<Image image={imagesMock[0]} />);
    expect(screen.getByText('Invert Background')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Invert Background'));
    expect(screen.getByTestId('img-bg')).not.toHaveClass('bg-opacity-10');
  });

  it('should call downloadSingleImage when download btn is clicked', () => {
    render(<Image image={imagesMock[0]} />);
    const blob = new Blob();
    (downloadSingleImage as jest.Mock).mockResolvedValue(blob);
    window.URL.createObjectURL = function (blob) {
      return '';
    };
    fireEvent.click(screen.getByTestId('download-btn'));
    expect(downloadSingleImage).toHaveBeenCalledTimes(1);
    expect(downloadSingleImage).toHaveBeenCalledWith(imagesMock[0].url);
  });

  it('should download the single image', async () => {
    render(<Image image={imagesMock[0]} />);
    const blob = new Blob();
    const blobLink = 'blob:https://imageblob/image_mock_1.png';
    (downloadSingleImage as jest.Mock).mockResolvedValue(blob);
    global.URL.createObjectURL = jest.fn(() => blobLink);
    const downloadableLink = {
      href: '',
      click: jest.fn(),
      download: '',
    };
    document.createElement = jest
      .fn()
      .mockImplementation(() => downloadableLink);
    document.body.appendChild = jest.fn();
    document.body.removeChild = jest.fn();
    fireEvent.click(screen.getByTestId('download-btn'));
    await waitFor(
      async () => await new Promise((resolve) => setTimeout(resolve, 0))
    );
    expect(global.URL.createObjectURL).toHaveBeenCalled();
    expect(document.createElement).toHaveBeenCalledWith('a');
    expect(downloadableLink.href).toBe(blobLink);
    expect(downloadableLink.download).toBe(imagesMock[0].fileName);
    expect(document.body.appendChild).toHaveBeenCalledWith(downloadableLink);
    expect(downloadableLink.click).toHaveBeenCalled();
  });
});
