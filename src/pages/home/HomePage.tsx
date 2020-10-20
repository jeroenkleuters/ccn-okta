// src/home/HomePage.tsx
import React, { useContext } from "react";

import {
  Grid,
  Card,
  CardContent,
  Typography,
  Container,
} from "@material-ui/core";

import { PostsResponse } from "../../lib/model";
import useFetchData from "../../lib/useFetchData";
import { ThemeContext } from "../../lib/theme";

export default function HomePage() {
  const state = useFetchData<PostsResponse>(
    "https://codaisseur-coders-network-okta.herokuapp.com/posts"
  );

  const theme = useContext(ThemeContext);

  return (
    <Container fixed>
      <Typography variant="h3" component="h1">
        Codaisseur Coders Network
      </Typography>
      {state.status === "loading" && <p>Loading...</p>}
      {state.status === "error" && <p>ERROR!</p>}
      {state.status === "success" && (
        <Grid container spacing={3}>
          {state.data.rows.map((post) => {
            return (
              <Grid key={post.id} item xs={4}>
                <Card>
                  <CardContent
                    style={{ maxHeight: "15rem", overflow: "hidden" }}
                  >
                    <Typography gutterBottom variant="h5" component="h2">
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
      )}
    </Container>
  );
}
