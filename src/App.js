import React, { useState, useEffect } from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import { Avatar, Button, TextField } from "@material-ui/core";
import { Card, CardActions, CardContent, CardHeader } from "@material-ui/core";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";

function truncateString(str, num) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
}

function App() {
  /* UseState hook to estalish our getters and setters for component state. */

  const [restaurants, setRestaurants] = useState([]);
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [open, setOpen] = useState(false);

  /* Fetch all restaurants and save them into state. */
  /* Request does not include error handling logic. */
  useEffect(() => {
    fetch("http://localhost:3000/restaurants.json").then(response => {
      response.json().then(data => {
        setRestaurants(data);
      });
    });
  }, []);

  /* Open/close helpers for our modal dialog. */

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

    handleClose();
  };

  return (
    <div className="App">
      <Container>
        <Typography variant="h1" gutterBottom>
          Restaurants
        </Typography>

        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          New Restaurant
        </Button>

        <Grid container spacing={5} style={{ marginTop: "2rem" }}>
          {restaurants.map(restaurant => (
            <Grid key={restaurant.id} item xs={12} sm={6} md={4} lg={4} xl={3}>
              <Card>
                <CardHeader
                  avatar={
                    <Avatar style={{ backgroundColor: "#EE3333" }}>
                      {restaurant.name.match(/\b(\w)/g).join("")}
                    </Avatar>
                  }
                  titleTypographyProps={{ variant: "h6" }}
                  title={restaurant.name}
                />
                <CardContent>
                  <Typography
                    paragraph
                    color="textSecondary"
                    style={{ height: "10rem" }}
                  >
                    {truncateString(restaurant.description, 220)}
                  </Typography>
                  {/* <Typography paragraph color="textSecondary">
                    Number of Dishes: {restaurant.dishes.length}
                  </Typography> */}
                </CardContent>
                <CardActions style={{ justifyContent: "right" }}>
                  <Button size="small" color="primary">
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Restaurant</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Add a new website by providing a name and a description.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Restaurant Name"
              fullWidth
              onChange={e => setNewName(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Description"
              fullWidth
              onChange={e => setNewDescription(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={addRestaurant} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
}

export default App;
