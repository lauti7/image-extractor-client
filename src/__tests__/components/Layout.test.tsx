import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Layout from '../../components/Layout';
import Extractor from '../../components/Extractor';

describe('<Layout />', () => {
  it('it renders properly its children', () => {
    render(<Layout children={<Extractor />} />);

    expect(
      screen.getByText('Get images from any public website!')
    ).toBeInTheDocument();
  });
});
