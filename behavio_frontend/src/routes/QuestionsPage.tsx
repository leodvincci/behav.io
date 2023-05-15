import { useLoaderData } from 'react-router';
import Header from '../components/ui/Header';
import SettingsImage from '../components/ui/SettingsImage';
import { Link } from 'react-router-dom';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import QuestionsImage from '../components/ui/QuestionsImage';
import { useNavigate } from 'react-router-dom';

const QuestionsPage = () => {
  const data = useLoaderData(); // Loads the  data from the loader in main.jsx
  const { id, question_text, category_id, is_favorite } = data.questions;
  const [isFavorite, setIsFavorite] = useState(is_favorite);
  const navigate = useNavigate();

  const handleFavoriteQuestion = async (id: string) => {
    console.log('clicked');
    setIsFavorite(!isFavorite);
    const response = await fetch(
      `http://127.0.0.1:8000/api/v1/favorite/${id}/`,
      {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': localStorage.getItem('csrftoken') as string,
        },
        body: JSON.stringify({ isFavorite }),
      }
    );
    console.log(localStorage.getItem('csrftoken'));
    const data = await response.json();

    if (data.success) {
      navigate('/questions');
    } else {
      console.log('error');
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-fit py-20 bg-accent min-w-full flex flex-col items-center tracking-wide text-black gap-10 p-3">
        <section>
          <div className="flex flex-col justify-center items-center md:flex-row gap-20 md:gap-20 my-10">
            <h1 className="text-5xl md:text-5xl lg:text-6xl text-offBlue">
              All Questions
            </h1>
            <QuestionsImage width={250} />
          </div>
        </section>
        <section className="grid grid-cols-1 bg-primary-dark rounded-xl w-full p-10 text-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {data.questions.map((question: any) => {
            return (
              <div
                key={question.id}
                className="p-10 bg-primary-light text-secondary-dark uppercase rounded-xl bg-opacity-90 flex flex-col justify-between items-center gap-10 tracking-widest"
              >
                <h3 className="card-title">{question.question_text}</h3>
                <div className="flex gap-3">
                  <Link
                    to={`/response/${question.id}`}
                    className="btn text-secondary w-fit mt-3 mx-auto tracking-widest bg-primary-light hover:bg-primary-dark shadow-lg hover:shadow-xl active:shadow-lg"
                  >
                    Answer
                  </Link>
                  <aside
                    onClick={() => handleFavoriteQuestion(question.id)}
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

export default QuestionsPage;
