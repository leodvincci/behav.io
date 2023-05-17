import { useLoaderData } from 'react-router-dom';
import Header from '../components/ui/Header';
import SettingsImage from '../components/ui/SettingsImage';
import EmptyListImage from '../components/ui/EmptyListImage';

const FeedbackPage = () => {
  const data = useLoaderData(); // Loads the  data from the loader in main.jsx
  // if (!data.success) {
  //   return (
  //     <div className="text-primary-light uppercase font-primary">
  //       <h1 className="text-2xl text-center">No Favorited Questions</h1>
  //     </div>
  //   );
  // }

  return (
    <>
      <Header />
      <main className="min-h-fit h-screen py-20 bg-accent min-w-full flex flex-col items-center tracking-wide text-black gap-10 p-3">
        <section>
          <div className="flex flex-col justify-center items-center md:flex-row gap-20 md:gap-20 my-10">
            <h1 className="text-5xl lg:text-6xl text-offBlue">All Feedback</h1>
            <SettingsImage width={250} />
          </div>
        </section>
        {data.success ? (
          <section className="grid grid-cols-1 bg-primary-dark rounded-xl w-full p-10 text-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {data.feedback.map((fb: any) => {
              return (
                <div
                  key={fb.id}
                  className="p-10 bg-primary-light text-secondary-dark uppercase rounded-xl bg-opacity-90 flex flex-col justify-center items-center gap-10 tracking-wider"
                >
                  <h3 className="card-title">{fb.category_txt}</h3>
                  <Link
                    to={`/questions/${fb.category_txt}`}
                    className="btn text-secondary w-fit mt-3 mx-auto tracking-widest bg-primary-light hover:bg-primary-dark shadow-lg hover:shadow-xl active:shadow-lg"
                  >
                    View
                  </Link>
                </div>
              );
            })}
          </section>
        ) : (
          <div className="text-primary-light uppercase font-primary">
            {/* <div>
              <EmptyListImage width={500} />
            </div> */}
            <h1 className="text-2xl text-center">No current feedback...</h1>
          </div>
        )}
      </main>
    </>
  );
};

export default FeedbackPage;
