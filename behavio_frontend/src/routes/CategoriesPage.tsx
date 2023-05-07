import { useLoaderData } from "react-router"
const CategoriesPage = () => {
  const categories = useLoaderData() // Loads the  data from the loader in main.jsx
  console.log(categories)
  return (
    <div>{!categories && <h1>No Categories</h1>}</div>
  )
}

export default CategoriesPage