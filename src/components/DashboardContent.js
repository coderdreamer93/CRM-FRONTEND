import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { Menu as MenuIcon, ShoppingCart, Dashboard as DashboardIcon } from "@mui/icons-material";

const drawerWidth = 260;

const DashboardLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ backgroundColor: "#1e1e2d", height: "100%", color: "white" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ mx: "auto", fontWeight: "bold" }}>
          Admin Panel
        </Typography>
      </Toolbar>
      <Divider sx={{ bgcolor: "gray" }} />
      <List>
        <ListItem button component={Link} to="/dashboard">
          <ListItemIcon>
            <DashboardIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        <ListItem button component={Link} to="/products">
          <ListItemIcon>
            <ShoppingCart sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Products" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` }, backgroundColor: "#1976d2" }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: "none" } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>Admin Dashboard</Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Drawer variant="permanent" sx={{ display: { xs: "none", sm: "block" }, "& .MuiDrawer-paper": { width: drawerWidth } }} open>
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content Area */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: { sm: `${drawerWidth}px` }, backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
        <Toolbar />
        <Outlet />  {/* ✅ Ye Protected Routes ke Content Show Karega */}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
