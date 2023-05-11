import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/ui/Header'

const LoaderPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0,0);
    const timer = setTimeout(() => {
      navigate('/dashboard')
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
    <Header />
    <main className="min-h-screen py-20 bg-accent min-w-full flex flex-col items-center tracking-wide text-black gap-32 p-3">
      <h1 className="text-5xl font-bold animate-pulse mt-10">Submitting...</h1>
    </main>
  </>
  )
}

export default LoaderPage