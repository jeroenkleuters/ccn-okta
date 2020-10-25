// src/home/HomePage.tsx
import React, { useContext } from "react";
import { useSelector } from "react-redux";

import {
  Grid,
  Card,
  CardContent,
  Typography,
  Container,
} from "@material-ui/core";

import { ThemeContext } from "../../lib/theme";
import { State } from "../../store/types";

const selectHomepageFeed = (reduxState: State) => {
  return reduxState.homepageFeed;
};

export default function HomePage() {
  const { theme } = useContext(ThemeContext);

  const posts = useSelector(selectHomepageFeed);

  return (
    <Container fixed>
      <Typography
        variant="h3"
        component="h1"
        style={{ color: theme.colors.textColor }}
      >
        Codaisseur Coders Network
      </Typography>
      <Grid container spacing={3}>
        {posts.map((post) => {
          return (
            <Grid key={post.id} item xs={4}>
              <Card
                style={{ backgroundColor: theme.colors.cardBackgroundColor }}
              >
                <CardContent style={{ maxHeight: "15rem", overflow: "hidden" }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                    style={{ color: theme.colors.textColor }}
                  >
                    {post.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    style={{ color: theme.colors.textColor }}
                  >
                    {post.content}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}
