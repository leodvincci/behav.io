import { useLoaderData, useNavigate } from 'react-router';
import Header from '../components/ui/Header';
import SettingsImage from '../components/ui/SettingsImage';
import { Link } from 'react-router-dom';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import QuestionsImage from '../components/ui/QuestionsImage';
import { ResponseType } from '../types/types';
import { useState } from 'react';
import FindingDataImage from '../components/ui/FindingDataImage';
import YouTubeEmbed from '../components/YouTubeEmbed';

const ResponsesPage = () => {
  const data = useLoaderData(); // Loads the  data from the loader in main.jsx
  console.log(data);
  const navigate = useNavigate();
  const [aiFeedback, setAiFeedback] = useState<string>('');
  const [grade, setGrade] = useState<string>('');
  const [responseId, setResponseId] = useState<string>('');
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
    console.log(responseId);
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/auto_feedback/${responseId}/`,
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

  const handleResponseSelect = (e: any) => {
    setResponseId(e.target.value);
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

        <section className="grid grid-cols-1 rounded-xl w-fit p-10 text-center gap-10">
          <div className="p-10 text-secondary rounded-xl bg-opacity-90 flex flex-col justify-around items-center tracking-widest w-full basis-1">
            {!aiFeedback && !isLoading && (
              <div className="flex flex-col justify-center items-center gap-5 shadow-xl p-10 bg-primary-light rounded-lg">
                <h4 className="text-2xl text-accent">AI Feedback</h4>
                <p>Select which response you want feedback on then submit</p>
                <form onSubmit={() => handleAutoFeedback(responseId)}>
                  <select
                    className="select w-full max-w-xl bg-primary-dark"
                    onChange={handleResponseSelect}
                  >
                    <option disabled selected>
                      Select your response
                    </option>
                    {data.responses.map((response: ResponseType) => (
                      <option key={response.id} defaultValue={response.id}>
                        {response.question_text}
                      </option>
                    ))}
                  </select>
                  <button
                    className="btn text-secondary w-full max-w-xl mt-3 mx-auto tracking-widest bg-primary-light hover:bg-primary-dark shadow-lg hover:shadow-xl active:shadow-lg"
                    type="submit"
                    disabled={!responseId}
                  >
                    Submit
                  </button>
                </form>
              </div>
            )}
            {aiFeedback && !isLoading && (
              <div className="flex flex-col gap-10 w-fit p-10 bg-primary-light">
                <div className="flex flex-col justify-center items-center gap-5 p-10">
                  <h4 className="text-2xl text-accent">AI Feedback</h4>
                  <p>{aiFeedback}</p>
                  <p className="text-2xl text-accent">{grade}</p>
                </div>
                <button
                  onClick={() => {
                    setAiFeedback('');
                    setGrade('');
                  }}
                  className="btn text-secondary w-full max-w-md mt-3 mx-auto tracking-widest bg-primary-light hover:bg-primary-dark shadow-lg hover:shadow-xl active:shadow-lg"
                >
                  Try another response
                </button>
              </div>
            )}
            {!aiFeedback && isLoading && (
              <div className="flex flex-col justify-center items-center gap-5 p-10 rounded-lg bg-primary-light">
                <h4 className="text-2xl text-accent animate-pulse">
                  Loading Feedback..
                </h4>
                <FindingDataImage width={500} />
                <p>Please be patient, this make take a few moments... </p>
              </div>
            )}
          </div>
        </section>

        {data.responses.length > 0 ? (
          <section className="grid grid-cols-1 bg-primary-dark rounded-xl w-full p-10 text-center lg:grid-cols-2 gap-10">
            {data.responses.map((response: ResponseType) => (
              <div
                key={response.id}
                className="p-10 bg-primary-light text-secondary uppercase rounded-xl bg-opacity-90 flex flex-col justify-around items-center tracking-widest w-full basis-1"
              >
                <p className="text-offBlue max-w-lg my-10">
                  {response.question_text}
                </p>
                <div className="flex flex-col w-full">
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
                    <li className="flex flex-col gap-10 mt-20 w-full">
                      {/* Video Link */}
                      <span className="font-bold">Video Link</span>
                      <span className="font-thin">
                        {<YouTubeEmbed embedLink={response.vid_link} /> ||
                          'Error'}
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
                    disabled
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
        ) : (
          <div className="text-primary-light bg-accent h-screen uppercase font-primary w-full">
            <h1 className="text-2xl text-center">You have no responses...</h1>
          </div>
        )}
      </main>
    </>
  );
};

export default ResponsesPage;
