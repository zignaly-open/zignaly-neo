import React, { useState } from 'react';
import { CountryFlag } from './styles';

const Flag: React.FC<{ country: string; onError?: () => void }> = ({
  country,
  onError,
}) => {
  const [flagInFolder, setFlagInFolder] = useState(true);
  if (!flagInFolder) return null;
  return (
    <CountryFlag
      src={`/images/country-flags/${country.toUpperCase()}.svg`}
      onError={() => {
        setFlagInFolder(false);
        onError?.();
      }}
    />
  );
};

export default Flag;
