import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [shift] = React.useState(0);
  useEffect(() => {



    console.error(shift);
  }, []);
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.tsx</code> and sdfffave to reload.
        </p>
        {[1, 2, 3, 4, 5].map((x) => (
          <p>
            Edit <code>src/App.tsx</code> and save ffto reload.
          </p>
        ))}
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn Reactdf
        </a>
      </header>
    </div>
  );
}

export default App;
