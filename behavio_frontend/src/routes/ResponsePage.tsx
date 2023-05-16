import { useState } from 'react';
import Header from '../components/ui/Header';
import { useLoaderData, useNavigate } from 'react-router-dom';
import ResponseForm from '../components/ResponseForm';
import { QuestionType, ResponseLoaderType, ResponseType } from '../types/types';

const ResponsePage: React.FC = () => {
  const questionData = useLoaderData() as ResponseLoaderType;
  console.log(questionData);
  const [questionText, setQuestionText] = useState<string>(
    questionData.question[0].question_text
  );
  const [questionId, setQuestionId] = useState<number>(
    questionData.question[0].id
  );

  return (
    <>
      <Header />
      <main className="min-h-screen py-20 bg-accent min-w-full flex flex-col items-center tracking-wide text-black gap-32 p-3">
        {/* <section className="flex flex-col md:flex-row gap-10 md:gap-20 items-center">
        <h1 className="text-5xl lg:text-6xl text-offBlue">Your Response</h1>
        <SettingsImage width={250} />
      </section> */}
        <section className="w-full min-h-content bg-accent max-w-6xl flex flex-col gap-20">
          <div>
            <h2 className="text-3xl lg:text-4xl font-primary tracking-wide text-center text-black border-red-400">
              {questionText}
            </h2>
          </div>
          <div>
            <ResponseForm questionId={questionId} />
          </div>
        </section>
      </main>
    </>
  );
};

export default ResponsePage;
