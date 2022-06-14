import React from "react";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";

export default function Exercise() {
  const [exerciseData, setExerciseData] = useState([]);

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "f7dc99e6c0mshc6cddc3f418bb5dp1a1631jsn92b182b8d7bc",
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    },
  };

  useEffect(() => {
    fetch("https://exercisedb.p.rapidapi.com/exercises/bodyPart/chest", options)
      .then((response) => response.json())
      .then((response) => setExerciseData(response))
      .catch((err) => console.error(err));
  }, []);

  exerciseData.forEach((data) => {
    console.log(data);
  });

  return (
    <div className="min-h-[100vh] max-w-[1400px] h-auto mx-auto bg-[#202124]">
      <Navbar />

      <div className="grid mt-10 grid-cols-5 gap-6 xl:grid-cols-5  md:grid-cols-4 sm:grid-cols-2 ">
        {exerciseData.map((exerciseData) => {
          return (
            <div className="border-2 flex flex-col items-center">
              <img src={exerciseData.gifUrl} alt="" />
              <h1 className="text-xl text-white">{exerciseData.name}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
}
