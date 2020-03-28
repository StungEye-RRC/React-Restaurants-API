import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/restaurants.json").then(response => {
      response.json().then(data => {
        setRestaurants(data);
      });
    });
  }, []);

  const addRestaurant = () => {
    fetch("http://localhost:3000/restaurants.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        restaurant: { name: newName, description: newDescription }
      })
    })
      .then(response => response.json())
      .then(newRestaurant => setRestaurants([...restaurants, newRestaurant]));
  };

  return (
    <div className="App">
      <div>
        <input
          onChange={e => setNewName(e.target.value)}
          placeholder="Restaurant Name"
        />
        <input
          onChange={e => setNewDescription(e.target.value)}
          placeholder="Description"
        />
        <button onClick={addRestaurant}>Create New Restaurant</button>
      </div>
      {restaurants.map(restaurant => (
        <div key={restaurant.id}>
          <h1>{restaurant.name}</h1>
          <p>{restaurant.description}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
