import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuestionType, ResponseType } from '../types/types';

interface ResponseFormProps {
  questionId: number;
}

const ResponseForm: React.FC<ResponseFormProps> = ({ questionId }) => {
  const navigate = useNavigate();

  const [situation, setSituation] = useState<string>('');
  const [task, setTask] = useState<string>('');
  const [action, setAction] = useState<string>('');
  const [results, setResults] = useState<string>('');
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [youtubeLink, setYoutubeLink] = useState<string>('');

  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const handleResponseSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = {
      response_S: situation,
      response_T: task,
      response_A: action,
      response_R: results,
      vid_link: youtubeLink.replace('watch?v=', 'embed/'),
      isPrivate: isPrivate,
    };

    const res = await fetch(
      `http://127.0.0.1:8000/api/v1/response/${questionId}/`,
      {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': `${localStorage.getItem('csrftoken')}`,
        },
        body: JSON.stringify(response),
      }
    );

    const data = await res.json();
    console.log(data);

    if (data.success) {
      console.log('Response Posted');
      navigate('/loading');
    } else {
      console.log(data);
    }
  };

  return (
    <form
      className="text-black flex items-center flex-col w-full max-w-lg lg:max-w-full mx-auto gap-20"
      onSubmit={handleResponseSubmit}
    >
      <div className="flex flex-col gap-20 lg:gap-10 lg:p-10 w-full">
        <div className="w-full flex flex-col gap-5">
          <div className="form-control w-full">
            <label htmlFor="situation" className="label">
              <span>Situation</span>
            </label>
            <textarea
              onChange={(e) => setSituation(e.target.value)}
              value={situation}
              name="situation"
              placeholder="Enter the situation"
              className="textarea input-bordered w-full bg-secondary"
            />
          </div>
          <div className="form-control w-full ">
            <label htmlFor="task" className="label">
              <span>Task</span>
            </label>
            <textarea
              value={task}
              onChange={(e) => setTask(e.target.value)}
              name="task"
              placeholder="Enter the task"
              className="textarea input-bordered w-full bg-secondary"
            />
          </div>
          <div className="form-control w-full ">
            <label htmlFor="action" className="label">
              <span>Action</span>
            </label>
            <textarea
              value={action}
              onChange={(e) => setAction(e.target.value)}
              name="action"
              placeholder="Enter the action you took"
              className="textarea input-bordered w-full bg-secondary"
            />
          </div>
          <div className="form-control w-full ">
            <label htmlFor="action" className="label">
              <span>Results </span>
            </label>
            <textarea
              value={results}
              onChange={(e) => setResults(e.target.value)}
              name="action"
              placeholder="Enter the results / outcome"
              className="textarea input-bordered w-full bg-secondary"
            />
          </div>
        </div>
        <div className="w-full flex flex-col gap-5 p-8 items-center justify-center">
          <div className="form-control w-full">
            <label htmlFor="youtube-link" className="label">
              <small>YouTube Video Link (optional)</small>
            </label>
            <input
              value={youtubeLink}
              onChange={(e) => setYoutubeLink(e.target.value)}
              name="youtube-link"
              placeholder="Enter your YouTube link to video"
              className="input input-bordered w-full bg-secondary"
            />
          </div>
          <div className="form-control w-full">
            <label htmlFor="isPrivate" className="label">
              <small>Make response private?</small>
            </label>
            <select
              name="isPrivate"
              className="select select-bordered w-full bg-secondary text-gray-400 font-normal font-primary"
              value={String(isPrivate)}
              onChange={(e) =>
                setIsPrivate(e.target.value === 'true' ? true : false)
              }
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="form-control w-full">
            <label htmlFor="isFavorite" className="label">
              {/* // NOT FOR BE */}
              <small>Favorite this response?</small>
            </label>
            <select
              name="isFavorite"
              className="select select-bordered w-full bg-secondary text-gray-400 font-normal font-primary"
              value={String(isFavorite)}
              onChange={(e) =>
                setIsFavorite(e.target.value === 'true' ? true : false)
              }
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <button
          type="reset"
          className="btn text-secondary mx-auto tracking-widest bg-primary-light hover:bg-primary-dark shadow-lg hover:shadow-xl active:shadow-lg"
        >
          Reset
        </button>
        <button
          type="submit"
          className="btn text-secondary mx-auto tracking-widest bg-primary-light hover:bg-primary-dark shadow-lg hover:shadow-xl active:shadow-lg"
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default ResponseForm;
