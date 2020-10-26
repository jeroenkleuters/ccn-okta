// src/home/HomePage.tsx
import React, { useEffect, useState } from "react";

import {
  Grid,
  Card,
  CardContent,
  Typography,
  Container,
} from "@material-ui/core";

import { useFetchData } from "../../lib/useFetchData";

export default function HomePage() {
  const [searchText, setSearchText] = useState("");
  const [searchTag, setSearchTag] = useState("sequelize");

  const state = useFetchData(
    "https://codaisseur-coders-network-okta.herokuapp.com/posts?tag=" +
      searchTag
  );

  return (
    <Container fixed>
      <Typography variant="h3" component="h1">
        Codaisseur Coders Network
      </Typography>
      <p>
        Search posts:
        <input
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <button
          onClick={() => {
            setSearchTag(searchText);
          }}
        >
          Search!
        </button>
      </p>

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
