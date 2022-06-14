import React from "react";
import { useState, useEffect } from "react";
import info from "./info.png";
import Navbar from "./Navbar";
import corona from "./corona.png";

export default function News() {
  const [post, setPost] = useState([]);
  const [covid, setcovidStats] = useState([]);

  const [trendingclr, setTrendingclr] = useState("bg-red-400");
  const [news, setNews] = useState(
    "https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=14ca7051b89b45fca6adf6fc35da4824"
  );
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "f8c12d704dmsh9d800336105051fp1ebb98jsn3cb33ae80541",
      "X-RapidAPI-Host": "covid-193.p.rapidapi.com",
    },
  };

  useEffect(() => {
    fetch(news).then((response) =>
      response.json().then((data) => setPost(data.articles))
    );
    fetch("https://covid-193.p.rapidapi.com/statistics?country=India", options)
      .then((response) => response.json())
      .then((response) => setcovidStats(response.response))
      .catch((err) => console.error(err));

    console.log("ss");
  }, [news]);

  covid.forEach((article) => {
    console.log(article.time);
  });

  return (
    <div className="bg-[#202124]   h-auto   max-w-[1400px] mx-auto">
      <Navbar />
      <div className="flex flex-row gap-10 mt-16">
        <div className="news-list max-w-[70%]">
          <div className="hhh bg-[#202124] h-[80px]">
            <h1 className=" text-xl  text-white pt-4">NEWS</h1>
          </div>

          <div className="">
            {post.map((post) => (
              <div className="flex  mt-0 mb-4  ">
                <div className="w-full p-5 h-auto bg-[#333] items-center rounded-md">
                  <div className="flex  justify-between gap-24 mb-3">
                    <div>
                      {" "}
                      <h1 className="text-xl text-white">{post.title}</h1>
                      <h1 className="text-sm mt-2 text-gray-400">
                        {post.author}
                      </h1>
                      <h1 className="text-mds mt-2 text-gray-400">
                        {post.description}
                      </h1>
                    </div>{" "}
                    <img
                      className="rounded-lg max-w-[150px] "
                      src={post.urlToImage}
                      alt=""
                    />
                  </div>

                  <a href={post.url} className=" text-md text-blue-400">
                    View full coverage
                  </a>
                </div>{" "}
              </div>
            ))}
          </div>
        </div>

        <div className="top-list w-[35%] sticky h-[700px]  ">
          <div className="flex flex-col gap-5">
            <div className="flex rounded-md  bg-yellow-500 flex-col mt-[75px] p-5 ">
              <h1 className="font-bold text-black">Health information</h1>
              <div className="flex justify-between ">
                <p className="text-gray-900 mt-4 pr-8">
                  See the latest on coronavirus (COVID-19) prevention, symptoms
                  and treatment from the World Health Organization (WHO) and
                  others
                </p>
                <img className="w-[100px] h-[60px]" src={info} alt="" />
              </div>
              <a href="https://www.google.com/search?q=coronavirus">
                <p className="text-center mt-4 font-medium text-blue-800">
                  See Information
                </p>
              </a>
            </div>
            <div className="w-full h-auto bg-green-400 rounded-md">
              {covid.map((covid) => {
                return (
                  <div className="flex flex-col p-5 gap-2">
                    {" "}
                    <h1 className="text-2xl font-medium my-3 uppercase">
                      Live Covid Statistics
                    </h1>
                    <h1 className="uppercase font-medium text-xl text-gray-800">
                      {covid.country}
                    </h1>
                    <h1 className="uppercase font-medium text-sm my-1">
                      {covid.day}
                    </h1>{" "}
                    <h1 className="uppercase text-sm font-medium text-gray-800">
                      total cases : {covid.cases.total}
                    </h1>
                    <h1 className="uppercase font-bold text-2xl ">
                      {" "}
                      active cases : {covid.cases.active}
                    </h1>
                    <h1 className="uppercase text-sm  font-medium text-gray-800">
                      recovered : {covid.cases.recovered}
                    </h1>
                    <h1 className="uppercase text-sm  font-medium text-gray-800">
                      total tests : {covid.tests.total}
                    </h1>
                    <h1 className="uppercase text-sm  font-medium text-gray-800">
                      total death :{covid.deaths.total}
                    </h1>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
