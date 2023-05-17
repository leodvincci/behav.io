const Spinner = () => {
  return (
    <div className="p-10 bg-primary-light text-secondary uppercase rounded-xl bg-opacity-90 flex flex-col justify-around items-center gap-32 tracking-widest w-full">
      <h3 className="text-5xl md:text-5xl lg:text-6xl text-offBlue">
        Generating Response!
      </h3>
    </div>
  );
};

export default Spinner;
