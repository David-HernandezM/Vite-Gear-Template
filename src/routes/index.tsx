import { useState } from 'react'
import reactLogo from '../assets/images/react.svg';
import viteLogo from '/vite.svg'
import gearLogo from '../assets/images/logo.svg'

export default function Index() {
    const [count, setCount] = useState(0);

    return (
        <>
          <div>
            <a href="https://vitejs.dev" target="_blank">
              <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
            <a href="https://vara-network.io/" target="_blank">
              <img src={gearLogo} className="logo gear" alt="Gear logo" />
            </a>
          </div>
          <h1>Vite + React + Gear</h1>
          <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </button>
            <p>
              Edit <code>src/App.tsx</code> and save to test HMR
            </p>
          </div>
          <p className="read-the-docs">
            Click on the Vite, React and Gear logos to learn more
          </p>
        </>
    );
}