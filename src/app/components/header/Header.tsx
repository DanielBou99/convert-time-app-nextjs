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

const navigationLinks = [
  { id: 1, name: "Home", href: "/" },
  { id: 2, name: "About", href: "/about" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const toPage = (link: string) => {
    router.push(link);
  };

  return (
    <AppBar position="sticky" color="default">
      <Container maxWidth="md">
        <Toolbar disableGutters>
          <Hidden mdDown>
            {navigationLinks.map((item) => (
              <Box sx={{ ml: 2 }} key={item.id}>
                <Link color="textPrimary" href={item.href} underline="none">
                  <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
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
            <IconButton>
              <MenuIcon onClick={() => setOpen(true)}></MenuIcon>
            </IconButton>
          </Hidden>
        </Toolbar>
      </Container>
      <SwipeableDrawer
        anchor="left"
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
      >
        <div>
          <IconButton>
            <ChevronLeftIcon onClick={() => setOpen(false)}></ChevronLeftIcon>
          </IconButton>
        </div>
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
          <TranslateSelector />
        </List>
      </SwipeableDrawer>
    </AppBar>
  );
}
