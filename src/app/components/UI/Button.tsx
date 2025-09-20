const FancyButton = ({ children, isFullWidth ='' }) => {
  return (
    <button className={`relative px-8 py-3 rounded-lg font-semibold text-white bg-[#fe8900] overflow-hidden group ${isFullWidth}`}>
      {/* Sliding halves */}
      <span className="absolute inset-0 flex">
        {/* Left half */}
        <span className="w-1/2 bg-black transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></span>
        {/* Right half */}
        <span className="w-1/2 bg-black transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></span>
      </span>

      {/* Text always above layers */}
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default FancyButton;
