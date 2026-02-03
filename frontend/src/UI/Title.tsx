import React from 'react'

interface TitleProps {
    title: string
}

export default function Title({title}: TitleProps) {
  return (
    <h2 className='text-3xl font-bold'>
        {title}
    </h2>
  )
}