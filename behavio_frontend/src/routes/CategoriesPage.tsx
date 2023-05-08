import { useLoaderData } from "react-router"
import Header from "../components/ui/Header"
import SettingsImage from "../components/ui/SettingsImage"
const CategoriesPage = () => {
  const categories = useLoaderData() // Loads the  data from the loader in main.jsx
  console.log(categories)
  return (
    <>
      <Header/>
      <main className="min-h-fit py-20 bg-accent min-w-full flex flex-col items-center tracking-wide text-black gap-10 p-3">
        <section className="flex flex-col md:flex-row gap-10 md:gap-20 items-center">
        </section>
      </main>
    </>
  )
}

export default CategoriesPage