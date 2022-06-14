import React from "react";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import axios from "axios";

function Diet() {
  const [recipe, setRecipe] = useState([]);

  const [name, setName] = useState("bread");
  const [ingredients, setingredients] = useState("egg");
  const [time, setTime] = useState("50");
  const [click, setclick] = useState(1);

  const options = {
    method: "GET",
    url: "https://low-carb-recipes.p.rapidapi.com/search",
    params: {
      name: name,
      ingredients: ingredients,
      maxPrepareTime: time,
      maxCookTime: "20",
      maxCalories: "500",
      maxSugar: "3",
      maxAddedSugar: "0",
    },
    headers: {
      "X-RapidAPI-Key": "f7dc99e6c0mshc6cddc3f418bb5dp1a1631jsn92b182b8d7bc",
      "X-RapidAPI-Host": "low-carb-recipes.p.rapidapi.com",
    },
  };

  useEffect(() => {
    console.log("effecxt runs");
    axios
      .request(options)
      .then(function (response) {
        setRecipe(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [click]);

  recipe.forEach((data) => {
    console.log(data);
  });
  return (
    <div className="min-h-[100vh] max-h-auto max-w-[1400px] mx-auto">
      <Navbar />
      <div className="recipe w-full px-5 py-6 mt-10 rounded-md h-[100px] bg-[#333] flex gap-5">
        <input
          type="text"
          className="w-1/3 h-full px-10 rounded-md outline-none bg-gray-600 text text-xl text-gray-300"
          placeholder="search dish"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          className="w-1/3 h-full px-10 rounded-md outline-none bg-gray-600 text text-xl text-gray-300"
          placeholder="Add Ingredients"
          onChange={(e) => setingredients(e.target.value)}
        />
        <input
          type="text"
          className="w-1/3 h-full px-10 rounded-md outline-none bg-gray-600 text text-xl text-gray-300"
          placeholder="Set preparation time"
          onChange={(e) => setTime(e.target.value)}
        />
        <button
          onClick={() => setclick(click + 1)}
          className="w-[200px] h-full bg-red-400"
        >
          Find recipe
        </button>
      </div>
      {recipe.map((recipe) => {
        return (
          <div className="mt-[40px]    rounded-md p-10 bg-[#333]">
            <h1 className="text-2xl mb-5 text-white">{recipe.name}</h1>
            <p className="text-gray-400">{recipe.description}</p>
            <h1 className="text-xl text-gray-200 my-5">Ingredients List</h1>
            <table className="border-[1px] text-white my-5">
              <tr className="border-[1px] ">
                <th className="px-[20px] border-[1px]">Ingredients</th>
                <th className="px-[20px] border-[1px]">grams</th>
              </tr>

              {recipe.ingredients.map((res) => {
                return (
                  <tr>
                    <td className="px-[20px] border-[1px]">{res.name}</td>
                    <td className="px-[20px] border-[1px]">
                      {res.servingSize.grams}
                    </td>
                  </tr>
                );
              })}
            </table>

            <h1 className="text-2xl text-white underline my-5">Steps </h1>
            {recipe.steps.map((res) => {
              return <li className="my-5 list-decimal text-gray-400">{res}</li>;
            })}

            <h1 className="text-xl text-gray-200 my-5">Nutrients Table</h1>
            <table className="border-[1px] text-white my-5">
              <tr className="border-[1px] ">
                <th className="px-[20px] border-[1px]">Calcium</th>
                <th className="px-[20px] border-[1px]">Fiber</th>
                <th className="px-[20px] border-[1px]">Alcohol</th>
                <th className="px-[20px] border-[1px]">Sugar</th>
                <th className="px-[20px] border-[1px]">Protein</th>
              </tr>
              <tr>
                <td className="px-[20px] border-[1px]">
                  {recipe.nutrients.calcium}
                </td>
                <td className="px-[20px] border-[1px]">
                  {recipe.nutrients.fiber}
                </td>
                <td className="px-[20px] border-[1px]">
                  {recipe.nutrients.alcohol}
                </td>
                <td className="px-[20px] border-[1px]">
                  {recipe.nutrients.sugar}
                </td>
                <td className="px-[20px] border-[1px]">
                  {recipe.nutrients.protein}
                </td>
              </tr>
            </table>
          </div>
        );
      })}
    </div>
  );
}

export default Diet;
