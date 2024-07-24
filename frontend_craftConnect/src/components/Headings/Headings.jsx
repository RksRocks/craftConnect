function Headings({ heading, link }) {
  return (
    <div className="flex justify-between items-end pr-2 w-full">
      <h1 className="font-bold text-3xl">{heading}</h1>
      {/* <a href={link}></a> */}
      <p className="underline-offset-2 underline font-semibold text-gray-500">
        View More
      </p>
    </div>
  );
}

export default Headings;
