function Headings({ heading, link }) {
  return (
    <div className="flex justify-between items-end pr-2 w-full">
      <h1 className="font-bold text-lg md:text-xl lg:text-2xl text-white/90">
        {heading}
      </h1>
      {/* <a href={link}></a> */}
      {/* <p className="underline-offset-2 underline text-sm font-semibold text-white/60">
        View More
      </p> */}
    </div>
  );
}

export default Headings;
