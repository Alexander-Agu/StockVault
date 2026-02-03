import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Header from './components/Header/Header.tsx'
import Hero from './components/Hero/Hero.tsx'
import About from './components/About/About.tsx'
import Home from './pages/Home.tsx'
import SignUp from './pages/SignUp.tsx'
import SignIn from './pages/SignIn.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SignIn />
  </StrictMode>,
)
