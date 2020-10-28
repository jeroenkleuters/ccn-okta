// src/home/HomePage.tsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  Grid,
  Card,
  CardContent,
  Typography,
  Container,
  Box,
  Select,
  MenuItem,
} from "@material-ui/core";

import { useTheme } from "../../lib/theme";
import { AppDispatch } from "../../store/types";
import { fetchPostsForTag } from "../../store/homepageFeed/actions";
import { selectHomepageFeed } from "../../store/homepageFeed/selectors";

const knownTags = [
  "github",
  "react",
  "hooks",
  "sequelize",
  "useMemo",
  "bundling",
  "tech",
];

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { theme } = useTheme();

  const [tag, setTag] = useState(knownTags[0]);

  const state = useSelector(selectHomepageFeed);

  useEffect(() => {
    dispatch(fetchPostsForTag(tag));
  }, [dispatch, tag]);

  return (
    <Container fixed>
      <Typography
        variant="h3"
        component="h1"
        style={{ color: theme.colors.textColor }}
      >
        Codaisseur Coders Network
      </Typography>
      <Box my={3}>
        <Typography>
          Fetch posts for tag:{" "}
          <Select
            value={tag}
            onChange={(e) => setTag(e.target.value as string)}
          >
            {knownTags.map((tag) => {
              return (
                <MenuItem key={tag} value={tag}>
                  {tag}
                </MenuItem>
              );
            })}
          </Select>
        </Typography>
      </Box>
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
