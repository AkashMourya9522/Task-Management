import React from "react";

export default function Task({ data, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-slate-200 rounded-lg p-3 w-[300px] h-60  flex flex-col gap-3 hover:translate-y-2 hover:shadow-lg hover:cursor-pointer hover:bg-green-100 transition-all duration-300"
    >
      <h1 className="text-2xl font-semibold truncate">{data.title}</h1>
      <p className="text-slate-500 truncate"> {data.description} </p>
      {data.priority && <p className="text-red-400 font-semibold">Priority</p>}
    </div>
  );
}
