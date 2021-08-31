import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ImagesLayout from '../../components/ImagesLayout';
import { imagesMock } from '../../__mocks__/imagesMock';

describe('<ImagesLayout />', () => {
  it('should display only N images', () => {
    render(<ImagesLayout images={imagesMock} serverMessage="" />);
    expect(screen.getByTestId('images-layout').childNodes).toHaveLength(
      imagesMock.length
    );
  });

  it('should display server message when exists message and images list is empty ', () => {
    render(
      <ImagesLayout images={[]} serverMessage="no images on your entered URL" />
    );
    expect(screen.getByTestId('server-message')).toHaveTextContent(
      'no images on your entered URL'
    );
  });

  it('should display nothing when does not exist message and image list is empty ', () => {
    const { container } = render(<ImagesLayout images={[]} serverMessage="" />);
    expect(container.firstChild).toBe(null);
  });
});
