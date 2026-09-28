import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Projects } from './views/Projects/Projects';
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'


import './App.css'
import { Home } from './views/Home/Home';
import { AboutMe } from './views/AboutMe/AboutMe';
import { Books } from './views/Books/Books';
import Game from './views/Game/Game';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Projects' element={<Projects />} />
          <Route path='/Books' element={<Books/>}/>
          <Route path='/AboutMe' element={<AboutMe/>}/>
          <Route path='/Game' element= {<Game/>}/>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App