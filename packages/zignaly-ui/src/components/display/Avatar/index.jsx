// Dependencies
import React, { useEffect, useRef } from 'react';
import Jazzicon from '@metamask/jazzicon';

// Types
import { sizeTypesId } from '@types/sizes';

// Styles
import * as styled from './styles';

function Avatar({
  size = sizeTypesId.MEDIUM,
  hash = '',
  image = null
}) {
  // Refs
  const jazzIconRef = useRef(null);

  useEffect(() => {
    if (!image && (jazzIconRef.current && hash)) {
      jazzIconRef.current.innerHTML = '';
      jazzIconRef.current.appendChild(Jazzicon(styled.sizes[size], parseInt(hash.slice(2, 10), 16)));
    }
  }, [image, hash, size]);

  return (
    <styled.Layout className={[size]}>
      {image ? (
        <styled.Image
          src={image}
        />
      ) : (
        <styled.JazzIcon
          ref={jazzIconRef}
        />
      )}
    </styled.Layout>
  );
}

export default Avatar;
