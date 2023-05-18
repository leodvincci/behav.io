import { Link, useLoaderData } from 'react-router-dom';
import Header from '../components/ui/Header';
import SettingsImage from '../components/ui/SettingsImage';
import EmptyListImage from '../components/ui/EmptyListImage';
import { useEffect, useState } from 'react';
import YouTubeEmbed from '../components/YouTubeEmbed';
import { ResponseType } from '../types/types';

const FeedbackPage = () => {
  const data = useLoaderData();
  const [vidLink, setVidLink] = useState<string>('');
  const [questionText, setQuestionText] = useState<string>('');
  const [response_S, setResponse_S] = useState<string>('');
  const [response_T, setResponse_T] = useState<string>('');
  const [response_A, setResponse_A] = useState<string>('');
  const [response_R, setResponse_R] = useState<string>('');

  const fetchResponse = async (responseId: string) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/response/${responseId}/`,
        {
          credentials: 'include',
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.response) {
        setResponse_S(data.response.response_S);
        setResponse_T(data.response.response_T);
        setResponse_A(data.response.response_A);
        setResponse_R(data.response.response_R);
        setVidLink(data.response.vid_link);
        setQuestionText(data.response.question_text);
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-fit h-fit py-20 bg-accent min-w-full flex flex-col items-center tracking-wide text-black gap-10 p-3">
        <section>
          <div className="flex flex-col justify-center items-center md:flex-row gap-20 md:gap-20 my-10">
            <h1 className="text-5xl lg:text-6xl text-offBlue">All Feedback</h1>
            <SettingsImage width={250} />
          </div>
        </section>
        {data.feedback ? (
          <section className="min-h-fit grid grid-cols-1 bg-primary-dark rounded-xl w-full p-10 text-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {data.feedback.map((fb: any) => {
              return (
                <div
                  key={fb.id}
                  className="p-10 bg-primary-light text-secondary-dark uppercase rounded-xl bg-opacity-90 flex flex-col justify-between items-center gap-10 tracking-wider"
                >
                  {/* {getResponseId(fb.response_id)} */}
                  <h3 className="card-title text-accent">
                    {fb.feedback_text.slice(0, 8)}
                  </h3>
                  <h3 className="card-title">{fb.feedback_text.slice(8)}</h3>
                  <label
                    htmlFor="my-modal"
                    className="btn text-secondary w-full mt-3 mx-auto tracking-widest bg-primary-light hover:bg-primary-dark shadow-lg hover:shadow-xl active:shadow-lg"
                    onClick={() => fetchResponse(fb.response_id)}
                  >
                    View Response
                  </label>
                </div>
              );
            })}
          </section>
        ) : (
          <div className="text-primary-light uppercase font-primary mt-20">
            <h1 className="text-2xl text-center">No current feedback...</h1>
          </div>
        )}

        {/* ! RESPONSE INFORMATION */}
        {/* The button to open modal */}

        <input type="checkbox" id="my-modal" className="modal-toggle" />
        <div className="modal text-secondary-dark">
          <div className="modal-box">
            <p className="max-w-lg my-10 text-2xl text-offBlue text-center">
              {questionText || 'Error'}
            </p>
            <div className="flex flex-col w-full">
              <ul className="flex flex-col gap-4 p-4">
                <li className="card-text flex flex-col gap-1">
                  <span className="font-bold tracking-wider uppercase text-center">
                    Situation
                  </span>
                  <span className="font-thin">{response_S || 'Error'}</span>
                </li>
                <li className="card-text flex flex-col gap-1">
                  <span className="font-bold tracking-wider uppercase text-center">
                    Task
                  </span>
                  <span className="font-thin">{response_T || 'Error'}</span>
                </li>
                <li className="card-text flex flex-col gap-1 text-center">
                  <span className="font-bold tracking-wider uppercase text-center">
                    Action
                  </span>
                  <span className="font-thin">{response_A || 'Error'}</span>
                </li>
                <li className="card-text flex flex-col gap-1 text-center">
                  <span className="font-bold tracking-wider uppercase text-center">
                    Result
                  </span>
                  <span className="font-thin">{response_R || 'Error'}</span>
                </li>
                <li className="flex flex-col gap-10 mt-20 w-full">
                  {/* Video Link */}
                  <span className="font-thin">
                    {<YouTubeEmbed embedLink={vidLink} />}
                  </span>
                </li>
              </ul>
            </div>
            <div className="modal-action">
              <label
                htmlFor="my-modal"
                className="btn text-secondary w-full mt-10 mx-auto tracking-widest bg-primary-light hover:bg-primary-dark shadow-lg hover:shadow-xl active:shadow-lg"
              >
                Close
              </label>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default FeedbackPage;
