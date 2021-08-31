import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Extractor from '../../components/Extractor';
import { extractImages } from '../../utils/extractorAPI';

jest.mock('../../utils/extractorAPI');

describe('<Extractor />', () => {
  it('it renders properly', () => {
    render(<Extractor />);

    expect(
      screen.getByText('Get images from any public website!')
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter URL')).toBeInTheDocument();
    expect(screen.getByText('Extract')).toBeInTheDocument();
  });

  it('displays loader when "Extract" button is clicked', async () => {
    (extractImages as jest.Mock).mockImplementation(
      () =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve([]);
          }, 1500);
        })
    );
    render(<Extractor />);

    fireEvent.change(screen.getByPlaceholderText('Enter URL'), {
      target: { value: 'https://google.com' },
    });
    fireEvent.click(screen.getByText('Extract'));
    await waitFor(() =>
      expect(screen.getByTestId('loader-container')).toBeInTheDocument()
    );
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('displays an error when entered URL is invalid', () => {
    render(<Extractor />);

    fireEvent.change(screen.getByPlaceholderText('Enter URL'), {
      target: { value: 'invalid-URL' },
    });
    fireEvent.click(screen.getByText('Extract'));
    expect(screen.getByTestId('error-message')).toBeInTheDocument();
  });

  it('displays an error when server fails', async () => {
    (extractImages as jest.Mock).mockRejectedValue({
      images: [],
      error: true,
      message: 'Server internal error',
    });
    render(<Extractor />);

    fireEvent.change(screen.getByPlaceholderText('Enter URL'), {
      target: { value: 'https://google.com' },
    });
    fireEvent.click(screen.getByText('Extract'));
    await waitFor(() => screen.getByTestId('server-message'));
    expect(screen.getByTestId('server-message')).toHaveTextContent(
      'Server internal error'
    );
  });
});
