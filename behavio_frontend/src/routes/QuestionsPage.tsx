import { useLoaderData } from "react-router"
import Header from "../components/ui/Header"
import SettingsImage from "../components/ui/SettingsImage"
import { Link } from "react-router-dom"
import {BsHeart, BsHeartFill} from 'react-icons/bs'
import { useState } from "react"
import QuestionsImage from "../components/ui/QuestionsImage"

const QuestionsPage = () => {
  const data = useLoaderData() // Loads the  data from the loader in main.jsx
  const {id, question_text, category_id, is_favorite} = data.questions
  const [isFavorite, setIsFavorite] = useState(is_favorite)

  const handleFavoriteQuestion = () => {
    // TODO: Add logic to favorite a question
    setIsFavorite(!isFavorite)
  }

  return (
    <>
      <Header/>
      <main className="min-h-fit py-20 bg-accent min-w-full flex flex-col items-center tracking-wide text-black gap-10 p-3">
        <section>
          <div className="flex flex-col justify-center items-center md:flex-row gap-20 md:gap-20 my-10">
            <h1 className="text-5xl md:text-5xl lg:text-6xl text-offBlue">Questions</h1>
            <QuestionsImage width={250} />
          </div>
        </section>
        <section className="grid grid-cols-1 bg-primary-dark rounded-xl w-full p-10 text-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {
            data.questions.map((question: any) => {
              return (
                <div key={question.id} className="p-10 bg-primary-light text-secondary-dark uppercase rounded-xl bg-opacity-90 flex flex-col justify-between items-center gap-10 tracking-widest">
                  <h3 className="card-title">{question.question_text}</h3>
                  <div className="flex gap-3">
                    {/* When pressed, the answer button will link to /response also passing the question object - This option or state management. */}
                    <Link to={`/response`}  className="btn text-secondary w-fit mt-3 mx-auto tracking-widest bg-primary-light hover:bg-primary-dark shadow-lg hover:shadow-xl active:shadow-lg">Answer</Link>
                    <aside onClick={handleFavoriteQuestion} className="btn text-secondary w-fit mt-3 mx-auto tracking-widest bg-primary-light hover:bg-primary-dark shadow-lg hover:shadow-xl active:shadow-lg">
                      {/* // TODO Add logic to show filled heart if question is favorited NEED POST REQ TO UPDATE IS_FAVORITE */}
                      {question.isFavorite ? <BsHeartFill /> : <BsHeart />} 
                    </aside>
                  </div>
                </div>
              )
            })
          }
        </section>
      </main>
    </>
  )
}

export default QuestionsPage