import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const KEY = "b9232526b18e47788c160916234fd913";

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [data, setData] = useState(null);

  const fetchRecipes = async () => {
    try {
      const res = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch`,
        {
          params: {
            query: name,
            maxFat: 25,
            number: quantity,
            apiKey: KEY
          }
        }
      );
      setData(res.data);
      console.log(res.data);
    } catch (err) {
      console.log("Error fetching the API", err);
    }
  };

  return (
    <div className="app">
      <div className="heading">
        <h1>Recipe Finder</h1>
      </div>

      <div className="searchQuery">
        <input
          placeholder="Enter recipe keywords"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="searchQuery">
        <input
          placeholder="Enter number of recipes"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>

      <button className="btn" onClick={fetchRecipes}>Find Recipes</button>

      {data && data.results && (
        <div className="recipes">
          {data.results.map(recipe => (
            <div key={recipe.id} className="recipe">
              <h2>{recipe.title}</h2>
              <img src={recipe.image} alt={recipe.title} style={{ width: "100%", maxWidth: "300px" }} />
              <p>Fat: {recipe.nutrition.nutrients.find(nutrient => nutrient.name === 'Fat')?.amount.toFixed(2)} g</p>
              <p>Ready in {recipe.readyInMinutes ? recipe.readyInMinutes : "N/A"} minutes</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
