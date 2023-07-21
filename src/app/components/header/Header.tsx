"use client";
import {
  AppBar,
  Container,
  Divider,
  Hidden,
  IconButton,
  List,
  SwipeableDrawer,
  Toolbar,
  Typography,
  ListItemButton,
  ListItemIcon,
  Link,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useState } from "react";
import ListItemText from "@mui/material/ListItemText";
import { useRouter } from "next-intl/client";
import TranslateSelector from "./TranslateSelector";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ListAltIcon from '@mui/icons-material/ListAlt';

const navigationLinks = [
  { id: 1, name: "Home", href: "/" },
  { id: 2, name: "About", href: "/about" },
  { id: 2, name: "Management", href: "/management" }
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const toPage = (link: string) => {
    setOpen(false);
    router.push(link);
  };

  return (
    <AppBar position="absolute" color="primary">
      <Container maxWidth="md">
        <Toolbar disableGutters>
          <Hidden mdDown>
            {navigationLinks.map((item) => (
              <Box sx={{ ml: 2 }} key={item.id}>
                <Link color="textPrimary" href={item.href} underline="none">
                  <Typography
                    component="h1"
                    variant="h6"
                    color="#FFF"
                    noWrap
                    sx={{ flexGrow: 1 }}
                  >
                    {item.name}
                  </Typography>
                </Link>
              </Box>
            ))}
            <Box sx={{ ml: 2, width: 120 }}>
              <TranslateSelector />
            </Box>
          </Hidden>
          <Hidden mdUp>
            <IconButton onClick={() => setOpen(true)}>
              <MenuIcon sx={{ color: "#FFF" }}></MenuIcon>
            </IconButton>
          </Hidden>
        </Toolbar>
      </Container>
      <SwipeableDrawer
        anchor="left"
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: { width: "35%" },
        }}
      >
        <IconButton onClick={() => setOpen(false)}>
          <ChevronLeftIcon></ChevronLeftIcon>
        </IconButton>
        <Divider />
        <List component="nav">
          <ListItemButton onClick={() => toPage("/")}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
          <ListItemButton onClick={() => toPage("/about")}>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="About" />
          </ListItemButton>
          <ListItemButton onClick={() => toPage("/management")}>
            <ListItemIcon>
              <ListAltIcon />
            </ListItemIcon>
            <ListItemText primary="Management" />
          </ListItemButton>
          <TranslateSelector />
        </List>
      </SwipeableDrawer>
    </AppBar>
  );
}
