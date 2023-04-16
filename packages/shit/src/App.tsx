import React from 'react';
import './App.css';
import {
  dark,
  darkMui,
  ThemeProvider as ThemeInheritorStyled,
  ThemeProviderMui as ThemeInheritorMui,
  ZigButton,
  ZigChartMini,
} from '@zignaly-open/ui';

function App() {
  return (
    <ThemeInheritorStyled theme={dark}>
      <ThemeInheritorMui theme={darkMui}>
        <ZigChartMini midLine data={[0, 1, 21, 2, 0, 4, 5, 8, 8, 8, 8]} />

        <ZigButton variant={'contained'} size={'large'}>
          Hui
        </ZigButton>
      </ThemeInheritorMui>
    </ThemeInheritorStyled>
  );
}

export default App;
