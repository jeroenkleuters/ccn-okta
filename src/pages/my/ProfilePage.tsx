// src/pages/my/ProfilePage.tsx
import React from "react";

import { Typography, Container } from "@material-ui/core";

import { useTheme } from "../../lib/theme";

export default function ProfilePage() {
  const { theme } = useTheme();

  return (
    <Container fixed>
      <Typography
        variant="h3"
        component="h1"
        style={{ color: theme.colors.textColor }}
      >
        My profile
      </Typography>
    </Container>
  );
}
