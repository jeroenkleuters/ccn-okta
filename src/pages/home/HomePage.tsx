// src/home/HomePage.tsx
import React, { useContext, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import {
  Grid,
  Card,
  CardContent,
  Typography,
  Container,
} from "@material-ui/core";

import { ThemeContext } from "../../lib/theme";
import { State, Action } from "../../store/types";
import { Dispatch } from "redux";

const selectHomepageFeed = (reduxState: State) => {
  return reduxState.homepageFeed;
};

export default function HomePage() {
  const dispatch = useDispatch<Dispatch<Action>>();
  const { theme } = useContext(ThemeContext);

  const state = useSelector(selectHomepageFeed);

  useEffect(() => {
    (async () => {
      dispatch({
        type: "homepage_feed_fetching",
      });
      try {
        const res = await axios.get(
          "https://codaisseur-coders-network-okta.herokuapp.com/posts"
        );
        dispatch({
          type: "homepage_feed_fetched",
          payload: res.data,
        });
      } catch (error) {
        dispatch({
          type: "homepage_feed_error",
          payload: error,
        });
      }
    })();
  }, [dispatch]);

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
        {state.status === "loading" && <p>Loading...</p>}
        {state.status === "error" && <p>ERROR</p>}
        {state.status === "success" &&
          state.data.rows.map((post) => {
            return (
              <Grid key={post.id} item xs={4}>
                <Card
                  style={{ backgroundColor: theme.colors.cardBackgroundColor }}
                >
                  <CardContent
                    style={{ maxHeight: "15rem", overflow: "hidden" }}
                  >
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
