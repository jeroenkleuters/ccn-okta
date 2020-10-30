// src/home/HomePage.tsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  Badge,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Container,
  Box,
  Select,
  MenuItem,
  IconButton,
} from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";

import { useTheme } from "../../lib/theme";
import { AppDispatch } from "../../store/types";
import {
  fetchPostsForTag,
  likePost,
  dislikePost,
} from "../../store/homepageFeed/actions";
import { selectHomepageFeed } from "../../store/homepageFeed/selectors";
import { selectUser } from "../../store/auth/selectors";

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

  const me = useSelector(selectUser);

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
            const likedByMe = post.post_likes.find((like) => {
              return like.developer.id === me?.id;
            });

            return (
              <Grid key={post.id} item xs={4}>
                <Card
                  style={{ backgroundColor: theme.colors.cardBackgroundColor }}
                >
                  <CardContent style={{ overflow: "hidden" }}>
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
                      style={{
                        color: theme.colors.textColor,
                        maxHeight: "10rem",
                        overflow: "hidden",
                      }}
                    >
                      {post.content}
                    </Typography>
                  </CardContent>
                  {me && (
                    <CardActions disableSpacing>
                      <Badge
                        badgeContent={post.post_likes.length}
                        color="primary"
                      >
                        {likedByMe ? (
                          <IconButton
                            color="primary"
                            component="span"
                            onClick={() => dispatch(dislikePost(post.id))}
                          >
                            <ThumbUpIcon />
                          </IconButton>
                        ) : (
                          <IconButton
                            color="primary"
                            component="span"
                            onClick={() => dispatch(likePost(post.id))}
                          >
                            <ThumbUpOutlinedIcon />
                          </IconButton>
                        )}
                      </Badge>
                    </CardActions>
                  )}
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </Container>
  );
}
