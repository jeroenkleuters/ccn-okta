// src/pages/my/ProfilePage.tsx
import React from "react";
import { useSelector } from "react-redux";

import { Typography, Container } from "@material-ui/core";

import { useTheme } from "../../lib/theme";
import { selectUser } from "../../store/auth/selectors";

export default function ProfilePage() {
  const { theme } = useTheme();
  const user = useSelector(selectUser);

  return (
    <Container fixed>
      <Typography
        variant="h3"
        component="h1"
        style={{ color: theme.colors.textColor }}
      >
        My profile
      </Typography>
      <p>Name: {user?.name}</p>
      <p>Email address: {user?.email}</p>
    </Container>
  );
}
