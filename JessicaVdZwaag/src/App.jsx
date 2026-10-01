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

function App() {
  const [count, setCount] = useState(0)
  const [open, setOpen] = useState(false);

  function handleClick() {
    if (open == true) {
      setOpen(false)
    } else {
      setOpen(true);
    }
  }
  function Menu() {
    if (open == true) {
      return (
        <div className='navContent'>
          <Link to={'/'} className='navItem'>
            <p>Home</p>
          </Link >
          <Link to={'/Projects'} className='navItem'>
            <p>Projecten</p>
          </Link>
          <Link to={'/Books'} className='navItem'>
            <p>Boeken reviews</p>
          </Link>
          <Link to={'/AboutMe'} className='navItem'>
            <p>Over Mij</p>
          </Link>
        </div>
      )

    }
  }
  return (
    <>

      <BrowserRouter>
        <nav className='menu'>
          <Menu />
          <button onClick={() => handleClick()} className='menuButton'>-</button>
        </nav>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Projects' element={<Projects />} />
          <Route path='/Books' element={<Books />} />
          <Route path='/AboutMe' element={<AboutMe />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App