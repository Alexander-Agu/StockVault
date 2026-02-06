import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Header from './components/Header/Header.tsx'
import Hero from './components/Hero/Hero.tsx'
import About from './components/About/About.tsx'
import Home from './pages/Home.tsx'
import SignUp from './pages/SignUp.tsx'
import OtpActivation from './pages/OtpActivation.tsx'
import Portal from './pages/Portal.tsx'
import { Provider } from 'react-redux'
import { store } from './state/store/store.tsx'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
)
