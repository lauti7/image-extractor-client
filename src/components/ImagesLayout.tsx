import React from 'react';
import Image from './Image';
import { ImageResponse } from '../utils/interfaces';

const ImagesLayout = ({ images }: { images: ImageResponse[] }): JSX.Element => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-2 auto-rows-fr mt-2">
      {images.length > 0
        ? images.map((img) => <Image key={img.fileName} image={img} />)
        : null}
    </div>
  );
};

export default ImagesLayout;
