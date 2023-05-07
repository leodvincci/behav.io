import { Link } from "react-router-dom"
import DashboardImage from "../components/ui/DashboardImage"
import Header from "../components/ui/Header"

const DashboardPage = () => {
  return (
    <div>
      <Header />
      <main className="min-h-screen w-screen bg-accent text-primary-light flex flex-col font-primary gap-10 items-center text-center tracking-wide py-20">
        <div className="flex flex-col lg:flex-row-reverse justify-center items-center">
          <DashboardImage width={250} />
          <h1 className="text-4xl">Hey, User!</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-3 p-10">
          <Link className="btn text-secondary w-full mx-auto tracking-widest bg-primary-light hover:bg-primary-dark shadow-lg hover:shadow-xl active:shadow-lg" to={'/favorite-questions'}>Favorite Questions</Link>
          <Link className="btn text-secondary w-full mx-auto tracking-widest bg-primary-light hover:bg-primary-dark shadow-lg hover:shadow-xl active:shadow-lg" to={'/responses'}>Interview Responses</Link>
          <Link className="btn text-secondary w-full mx-auto tracking-widest bg-primary-light hover:bg-primary-dark shadow-lg hover:shadow-xl active:shadow-lg" to={'/questions'}>Interview Questions</Link>
          <Link className="btn text-secondary w-full mx-auto tracking-widest bg-primary-light hover:bg-primary-dark shadow-lg hover:shadow-xl active:shadow-lg" to={'#'}>Random Interview Question</Link>
          <Link className="btn text-secondary w-full mx-auto tracking-widest bg-primary-light hover:bg-primary-dark shadow-lg hover:shadow-xl active:shadow-lg" to={'#'}>Feedback</Link>
        </div>
      </main>
    </div>
  )
}

export default DashboardPage