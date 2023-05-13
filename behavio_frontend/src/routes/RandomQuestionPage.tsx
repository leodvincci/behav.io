import { useLoaderData } from 'react-router-dom';
import ResponseForm from '../components/ResponseForm';
import { RandomQuestionType } from '../types/types';
import Header from '../components/ui/Header';
import { useState } from 'react';

const RandomQuestionPage: React.FC = () => {
  const questionData = useLoaderData() as RandomQuestionType;
  console.log(questionData);
  const [questionText, setQuestionText] = useState<string>(
    questionData.question_text
  );
  const [questionId, setQuestionId] = useState<number>(questionData.id);

  return (
    <>
      <Header />
      <main className="min-h-screen py-20 bg-accent min-w-full flex flex-col items-center tracking-wide text-black gap-32 p-3">
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

export default RandomQuestionPage;
