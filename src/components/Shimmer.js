const Shimmer = () => {
  return (
    <>
      <div className="animate-pulse duration-100 rounded-xl w-60 h-80 m-4 bg-slate-200 hover:bg-slate-300">
        <div className="rounded-t-xl bg-slate-400 h-44"></div>
        <div className="m-4 h-6 bg-slate-300"></div>
        <div className="m-4 h-2 bg-slate-300"></div>
        <div className="m-4 h-2 bg-slate-300"></div>
      </div>
    </>
  );
};

export default Shimmer;
