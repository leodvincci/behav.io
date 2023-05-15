import { useLoaderData, useNavigate } from 'react-router';
import Header from '../components/ui/Header';
import SettingsImage from '../components/ui/SettingsImage';
import { Link } from 'react-router-dom';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import QuestionsImage from '../components/ui/QuestionsImage';
import { ResponseType } from '../types/types';

const ResponsesPage = () => {
  const data = useLoaderData(); // Loads the  data from the loader in main.jsx
  const navigate = useNavigate();

  const handleDeleteResponse = async (id: number) => {
    const response = await fetch(
      `http://127.0.0.1:8000/api/v1/response/${id}/delete`,
      {
        credentials: 'include',
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': localStorage.getItem('csrftoken') as string,
        },
        body: JSON.stringify({ response_id: id }),
      }
    );

    const data = await response.json();
    if (data.success) {
      navigate('/responses');
    }
  };

  const handleAutoFeedback = async (id: number) => {
    const response = await fetch(
      `http://127.0.0.1:8000/api/v1/auto_feedback/${id}/`,
      {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': localStorage.getItem('csrftoken') as string,
        },
        body: JSON.stringify({ response_id: id }),
      }
    );
  };
  return (
    <>
      <Header />
      <main className="min-h-fit py-20 bg-accent min-w-full flex flex-col items-center tracking-wide text-black gap-10 p-3">
        <section>
          <div className="flex flex-col justify-center items-center md:flex-row gap-20 md:gap-20 my-10">
            <h1 className="text-5xl md:text-5xl lg:text-6xl text-offBlue">
              All Your Responses
            </h1>
            <QuestionsImage width={250} />
          </div>
        </section>
        <section className="grid grid-cols-1 bg-primary-dark rounded-xl w-full p-10 text-center lg:grid-cols-2 gap-10">
          {data.responses.map((response: ResponseType) => {
            return (
              <div
                key={response.id}
                className="p-10 bg-primary-light text-secondary uppercase rounded-xl bg-opacity-90 flex flex-col justify-around items-center gap-32 tracking-widest"
              >
                {/* Call fetchQuestion to call the questions API and return its text */}
                <p className="text-offBlue max-w-lg">
                  {response.question_text}
                </p>
                <div className="flex flex-col">
                  <ul className="flex flex-col gap-4">
                    <li className="card-text flex flex-col gap-1">
                      <span className="font-bold">Situation</span>
                      <span className="font-thin">
                        {response.response_S || 'Error'}
                      </span>
                    </li>
                    <li className="card-text flex flex-col gap-1">
                      <span>Task</span>
                      <span className="font-thin">
                        {response.response_T || 'Error'}
                      </span>
                    </li>
                    <li className="card-text flex flex-col gap-1">
                      <span>Action</span>
                      <span className="font-thin">
                        {response.response_A || 'Error'}
                      </span>
                    </li>
                    <li className="card-text flex flex-col gap-1">
                      <span>Results</span>
                      <span className="font-thin">
                        {response.response_R || 'Error'}
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="flex gap-4">
                  <Link
                    to={`/responses/${response.id}`}
                    className="btn text-secondary w-fit mt-3 mx-auto tracking-widest bg-primary-light hover:bg-primary-dark shadow-lg hover:shadow-xl active:shadow-lg"
                  >
                    View
                  </Link>
                  <Link
                    to={`/responses/${response.id}`}
                    className="btn text-secondary w-fit mt-3 mx-auto tracking-widest bg-primary-light hover:bg-primary-dark shadow-lg hover:shadow-xl active:shadow-lg"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn text-secondary w-fit mt-3 mx-auto tracking-widest bg-primary-light hover:bg-primary-dark shadow-lg hover:shadow-xl active:shadow-lg"
                    onClick={() => handleDeleteResponse(response.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn text-secondary w-fit mt-3 mx-auto tracking-widest bg-primary-light hover:bg-primary-dark shadow-lg hover:shadow-xl active:shadow-lg"
                    onClick={() => handleAutoFeedback(response.id)}
                  >
                    Auto Feedback
                  </button>
                </div>

                {/* <aside>
                      <div className="flex gap-1">
                        <BsHeartFill className="text-red-500" />
                        <p>{response.likes}</p>
                      </div>
                      <div className="flex gap-1">
                        <BsHeart className="text-red-500" />
                        <p>{response.dislikes}</p>
                      </div>
                    </aside> */}
              </div>
            );
          })}
        </section>
      </main>
    </>
  );
};

export default ResponsesPage;
