import React from 'react';
import Image from './Image';

const ImagesLayout = ({ images }: { images: string[] }): JSX.Element => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-2 mt-2">
      {images.length > 0
        ? images.map((img) => <Image key={img} image={img} />)
        : null}
    </div>
  );
};

export default ImagesLayout;
