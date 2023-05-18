import React, { useState } from 'react';
import Header from '../components/ui/Header';
import SettingsImage from '../components/ui/SettingsImage';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import QuestionsImage from '../components/ui/QuestionsImage';

const QuestionPage: React.FC = () => {
  const data = useLoaderData();
  console.log(data);
  const navigate = useNavigate();

  const handleFavoriteQuestion = async (id: number, isFavorite: boolean) => {
    if (isFavorite) {
      navigate('/favorite-questions');
    } else {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/v1/favorite/${id}/`,
          {
            credentials: 'include',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': localStorage.getItem('csrftoken') as string,
            },
            body: JSON.stringify({ isFavorite: true }),
          }
        );
        const data = await response.json();
        console.log(data);
        if (data.success) {
          window.location.reload();
        } else {
          console.log('error');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Header />
      <main className="w-fit min-h-screen py-20 bg-accent min-w-full flex flex-col items-center tracking-wide text-black gap-10 p-3">
        <section>
          <div className="flex flex-col justify-center items-center md:flex-row gap-20 md:gap-20 my-10">
            <h1 className="text-5xl lg:text-6xl text-offBlue">Questions</h1>
            <QuestionsImage width={250} />
          </div>
        </section>
        <section className="grid grid-cols-1 bg-primary-dark rounded-xl w-full p-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {data.questions.map((question: any) => {
            return (
              <div
                key={question.id}
                className="p-6 bg-primary-light text-secondary-dark uppercase rounded-xl bg-opacity-90 flex font-primary flex-col justify-between items-center gap-10 tracking-widest "
              >
                <p className="card-title font-normal">
                  {question.question_text}
                </p>
                <div className="flex gap-3">
                  {/* When pressed, the answer button will link to /response also passing the question object - This option or state management. */}
                  <Link
                    to={`/response/${question.id}`}
                    className="btn text-secondary w-fit mt-3 mx-auto tracking-widest bg-primary-light hover:bg-primary-dark shadow-lg hover:shadow-xl active:shadow-lg"
                  >
                    Answer
                  </Link>
                  <aside
                    onClick={() =>
                      handleFavoriteQuestion(question.id, question.isFavorite)
                    }
                    className="btn text-secondary w-fit mt-3 mx-auto tracking-widest bg-primary-light hover:bg-primary-dark shadow-lg hover:shadow-xl active:shadow-lg"
                  >
                    {question.isFavorite ? <BsHeartFill /> : <BsHeart />}
                  </aside>
                </div>
              </div>
            );
          })}
        </section>
      </main>
    </>
  );
};

export default QuestionPage;
