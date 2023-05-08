import React from 'react'
import { useLoaderData } from 'react-router-dom'

const FilteredQuestionPage: React.FC = () => {
  const data = useLoaderData()
  return (
    <div>FilteredQuestionPage</div>
  )
}

export default FilteredQuestionPage