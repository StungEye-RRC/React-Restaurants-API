import React, { useState, useEffect } from "react";
import { Container, Typography } from "@material-ui/core";
import NewRestaurantPrompt from "./NewRestaurantPrompt";
import RestaurantGrid from "./RestaurantGrid";

function App() {
  /* UseState hook to estalish our getters and setters for component state. */

  const [restaurants, setRestaurants] = useState([]);

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
  const addRestaurant = (newName, newDescription) => {
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
      <Container>
        <Typography variant="h1" gutterBottom>
          Restaurants
        </Typography>

        <NewRestaurantPrompt addRestaurantHandler={addRestaurant} />

        <RestaurantGrid restaurants={restaurants} />
      </Container>
    </div>
  );
}

export default App;
