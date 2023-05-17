import { useLoaderData, useNavigate } from 'react-router';
import Header from '../components/ui/Header';
import SettingsImage from '../components/ui/SettingsImage';
import { Link } from 'react-router-dom';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import QuestionsImage from '../components/ui/QuestionsImage';
import { ResponseType } from '../types/types';
import { useState } from 'react';

const ResponsesPage = () => {
  const data = useLoaderData(); // Loads the  data from the loader in main.jsx
  console.log(data);
  const navigate = useNavigate();
  const [aiFeedback, setAiFeedback] = useState<string>('');
  const [grade, setGrade] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    // MIGHT CAUSE ERROR (CHECK OLDER COMMITS)
    if (data.success) {
      navigate('/responses');
    }
  };

  const handleAutoFeedback = async (responseId: any) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        // `http://127.0.0.1:8000/api/v1/auto_feedback/${responseId}/`,
        {
          credentials: 'include',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': localStorage.getItem('csrftoken') as string,
          },
          body: JSON.stringify(responseId),
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.success) {
        console.log(data);
        setIsLoading(false);
        setGrade(data.feedback.slice(0, 8));
        setAiFeedback(data.feedback.slice(8));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Header />
      <main className="min-h-fit py-20 bg-accent min-w-full flex flex-col items-center tracking-wide text-black gap-10 p-3 text-center">
        <section>
          <div className="flex flex-col justify-center items-center md:flex-row gap-20 md:gap-20 my-10">
            <h1 className="text-5xl md:text-5xl lg:text-6xl text-offBlue">
              All Your Responses
            </h1>
            <QuestionsImage width={250} />
          </div>
        </section>

        <section className="grid grid-cols-1 bg-primary-dark rounded-xl w-full p-10 text-center lg:grid-cols-2 gap-10">
          {data.responses.map((response: ResponseType) => (
            <div
              key={response.id}
              className="p-10 bg-primary-light text-secondary uppercase rounded-xl bg-opacity-90 flex flex-col justify-around items-center tracking-widest w-full basis-1"
            >
              {!aiFeedback && (
                <div className="flex flex-col justify-center items-center gap-5 border-2 border-secondary-light">
                  <h4 className="text-2xl text-accent">Loading Feedback..</h4>
                  <p>Please be patient, this make take a few moments... </p>
                </div>
              )}
              {aiFeedback && (
                <div className="flex flex-col justify-center items-center gap-5 border-2 border-secondary-light p-10">
                  <h4 className="text-2xl text-accent">AI Feedback</h4>
                  <p>{aiFeedback}</p>
                  <p className="text-2xl text-accent">{grade}</p>
                </div>
              )}
              <p className="text-offBlue max-w-lg my-10">
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
                    <span>Result</span>
                    <span className="font-thin">
                      {response.response_R || 'Error'}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col my-20 justify-between items-center w-full">
                <button
                  className="btn text-secondary w-full mt-3 mx-auto tracking-widest bg-primary-light hover:bg-primary-dark shadow-lg hover:shadow-xl active:shadow-lg"
                  onClick={() => handleDeleteResponse(response.id)}
                >
                  Delete
                </button>
                <button
                  className="btn text-secondary w-full mt-3 mx-auto tracking-widest bg-primary-light hover:bg-primary-dark shadow-lg hover:shadow-xl active:shadow-lg"
                  onClick={() => handleAutoFeedback(response.id)}
                >
                  Ai Feedback
                </button>
                <Link
                  to="/dashboard/"
                  className="btn text-secondary w-full mt-3 mx-auto tracking-widest bg-primary-light hover:bg-primary-dark shadow-lg hover:shadow-xl active:shadow-lg"
                >
                  Dashboard
                </Link>
              </div>
            </div>
          ))}
        </section>
      </main>
    </>
  );
};

// <div
//   key={response.id}
//   className="p-10 bg-primary-light text-secondary uppercase rounded-xl bg-opacity-90 flex flex-col justify-around items-center gap-32 tracking-widest w-full"
// >
//   {/* Call fetchQuestion to call the questions API and return its text */}
//   <p className="text-offBlue max-w-lg">
//     {response.question_text}
//   </p>
//   <div className="flex flex-col">
//     <ul className="flex flex-col gap-4">
//       <li className="card-text flex flex-col gap-1">
//         <span className="font-bold">Situation</span>
//         <span className="font-thin">
//           {response.response_S || 'Error'}
//         </span>
//       </li>
//       <li className="card-text flex flex-col gap-1">
//         <span>Task</span>
//         <span className="font-thin">
//           {response.response_T || 'Error'}
//         </span>
//       </li>
//       <li className="card-text flex flex-col gap-1">
//         <span>Action</span>
//         <span className="font-thin">
//           {response.response_A || 'Error'}
//         </span>
//       </li>
//       <li className="card-text flex flex-col gap-1">
//         <span>Results</span>
//         <span className="font-thin">
//           {response.response_R || 'Error'}
//         </span>
//       </li>
//     </ul>
//   </div>
//   <div className="flex flex-col md:flex-row gap-4 w-full max-w-xl">
//     <button
//       onClick={() => handleDeleteResponse(response.id)}
//     >
//       Delete
//     </button>
//     <button
//       className="btn text-secondary w-full md:w-fit mt-3 mx-auto tracking-widest bg-primary-light hover:bg-primary-dark shadow-lg hover:shadow-xl active:shadow-lg"
//       onClick={() => handleAutoFeedback(response)}
//     >
//       Ask Chad
//     </button>
//   </div>

{
  /* <aside>
                      <div className="flex gap-1">
                        <BsHeartFill className="text-red-500" />
                        <p>{response.likes}</p>
                      </div>
                      <div className="flex gap-1">
                        <BsHeart className="text-red-500" />
                        <p>{response.dislikes}</p>
                      </div>
                    </aside> */
}

export default ResponsesPage;
