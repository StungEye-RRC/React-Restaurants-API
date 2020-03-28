import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { Avatar, Button } from "@material-ui/core";
import { Card, CardActions, CardContent, CardHeader } from "@material-ui/core";

function truncateString(str, num) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
}

function RestaurantGrid(props) {
  return (
    <Grid container spacing={5} style={{ marginTop: "2rem" }}>
      {props.restaurants.map(restaurant => (
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
  );
}

export default RestaurantGrid;
