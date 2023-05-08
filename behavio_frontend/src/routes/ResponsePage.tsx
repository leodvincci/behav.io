import React from 'react'
import Header from '../components/ui/Header'
import SettingsImage from '../components/ui/SettingsImage'

const ResponsePage: React.FC = () => {
  return (
    <>
    <Header />
    <main className="min-h-fit py-20 bg-accent min-w-full flex flex-col items-center tracking-wide text-black gap-10 p-3">
      <section className="flex flex-col md:flex-row gap-10 md:gap-20 items-center">
        <SettingsImage width={250} />
        <h1 className="text-4xl md:text-6xl text-offBlue">QUESTION</h1>
      </section>
      <section className="w-full h-screen bg-accent max-w-6xl">
        {/* FORM FOR STAR METHOD INPUT */}
      </section>
    </main>
  </>
  )
}

export default ResponsePage