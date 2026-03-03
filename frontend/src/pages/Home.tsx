import React from 'react'
import Header from '../components/Header/Header'
import Hero from '../components/Hero/Hero'
import About from '../components/About/About'
import { useSelector } from 'react-redux'
import type { RootState } from '../state/store/store'

export default function Home() {
  const user = useSelector((state: RootState) => state.user);
  return (
    <article>
        <Header />
        <Hero />
        <About />
    </article>
  )
}