import React from "react";

const Card = ({ bg, title, value }) => {
  return (
    <div className="relative flex-1 min-w-[260px] max-w-full md:max-w-[360px] h-[140px] rounded-2xl shadow-md transition-all duration-300 ease-in-out overflow-hidden text-white flex flex-col items-start justify-center gap-2 p-5 border border-white/10 hover:scale-[1.02] hover:shadow-lg">
      <img
        src={bg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-bottom blur-[1px] opacity-95"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
      <div className="relative z-10">
        <p className="text-sm font-semibold text-white/85 mb-1 tracking-wide uppercase">{title}</p>
        <p className="text-2xl md:text-3xl font-bold drop-shadow">{value}</p>
      </div>
    </div>
  );
};

export default Card;
