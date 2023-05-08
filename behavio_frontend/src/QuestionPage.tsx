import { Link, useLoaderData } from "react-router-dom"

const QuestionPage: React.FC = () => {
  const data = useLoaderData()
  return (
    <div>
      <h1>QuestionPage</h1>
    </div>
  )
}

export default QuestionPage