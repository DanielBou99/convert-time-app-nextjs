"use client";

import { Box, Container, Paper } from "@mui/material";
import { useTranslations } from "next-intl";

export default function About() {

  const t = useTranslations('About');

  return (
    <Container maxWidth="sm">
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <h1>{t('title')}</h1>
        </Box>
      </Paper>
    </Container>
  );
}
