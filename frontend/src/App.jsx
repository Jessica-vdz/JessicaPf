import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Projects } from './views/Projects/Projects';
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'


import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <nav>
          <Link to="/">Games</Link>
          <Link to="/">About me</Link>
          <Link to="">BookReviews</Link>
          <Link to="Projects">Projects</Link>
          <Link to="/">Gallery</Link>
        </nav>

        <Routes>
            <Route path="Projects" element={<Projects/>}/>
            
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
