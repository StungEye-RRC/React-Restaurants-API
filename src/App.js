import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  /* UseState hook to estalish our getters and setters for component state. */

  const [restaurants, setRestaurants] = useState([]);
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");

  /* Fetch all restaurants and save them into state. */
  /* Request does not include error handling logic. */
  useEffect(() => {
    fetch("http://localhost:3000/restaurants.json").then(response => {
      response.json().then(data => {
        setRestaurants(data);
      });
    });
  }, []);

  /* Add a new restaurant using the data supplied in the HTML inputs. */
  /* No front-end form/data validation is currently present.          */
  /* Server response is assumed to be confirmation. More logic is     */
  /* required to support back-end validation errors.                  */
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
    /* The ... is the Javascript spread operator. */
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

      {restaurants.length === 0 && (
        <p>No restaurants found. Check API server.</p>
      )}

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
