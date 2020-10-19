// src/home/HomePage.tsx
import React from "react";

import {
  Grid,
  Card,
  CardContent,
  Typography,
  Container,
} from "@material-ui/core";

import { PostsResponse } from "../../lib/model";
import FetchData from "../../lib/FetchData";
import { FetchState } from "../../util/fetchstate";

export default function HomePage() {
  return (
    <Container fixed>
      <Typography variant="h3" component="h1">
        Codaisseur Coders Network
      </Typography>
      <FetchData url="https://codaisseur-coders-network-okta.herokuapp.com/posts">
        {(state: FetchState<PostsResponse>) => {
          if (state.status === "loading") {
            return <p>Loading...</p>;
          } else if (state.status === "error") {
            return <p>ERROR!</p>;
          } else {
            return (
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
                          >
                            {post.content}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            );
          }
        }}
      </FetchData>
    </Container>
  );
}
