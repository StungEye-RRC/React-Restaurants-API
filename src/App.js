import React, { useState } from "react";
import "./App.css";

function App() {
  const [restaurants, setRestaurants] = useState([]);

  return (
    <div className="App">
      {restaurants.map(restaurant => (
        <div>
          <h1>{restaurant.name}</h1>
          <p>{restaurant.description}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
