import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Button } from './components/Button';
import { NavBar } from './components/NavBar';
import { LeftSideBar } from './components/LeftSideBar';

import './App.scss'

function App() {
  const [disabled, setDisabled] = useState(false);
  
  return (
    <>
      <NavBar />
      <div className="page-with-sidebar">
        <LeftSideBar />
        <div className='page-body'>
          <Button
            text="Primary Button"
            variant="primary"
            disabled={disabled}
            onClick={() => setDisabled(true)}
          />

          <br/>

          <Button
            text="Secondary Button"
            variant="secondary"
            onClick={() => setDisabled(false)}
          />

          <br/>

          <Button
            text="Utility"
            variant="utility"
            onClick={() => setDisabled(false)}
          />
        </div>
      </div>
    </>
  )
}

export default App
