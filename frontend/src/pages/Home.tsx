import React from 'react'
import Header from '../components/Header/Header'
import Hero from '../components/Hero/Hero'
import About from '../components/About/About'
import { useDispatch, useSelector } from 'react-redux'

import { setUser } from '../state/User/UserSlice'
import type { AppDispatch } from '../state/store/store'
import ResetStore from '../state/store/ResetStore'

export default function Home() {
  // Clear redux and session storage state 
  try{
    ResetStore();
  } catch{
    console.log("Ohh no it ddint work");
  }


  return (
    <article>
        <Header />
        <Hero />
        <About />
    </article>
  )
}