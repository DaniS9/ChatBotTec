// src/components/Sidebar.jsx
import React from "react";
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PsychologyIcon from "@mui/icons-material/Psychology";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import HistoryIcon from "@mui/icons-material/History";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HubIcon from "@mui/icons-material/Hub";
import InfoIcon from "@mui/icons-material/Info";



export default function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box" },
      }}
    >
      <List>
        <ListItemButton component={RouterLink} to="/">
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="Inicio" />
        </ListItemButton>

        <ListItemButton component={RouterLink} to="/chat">
          <ListItemIcon><SmartToyIcon /></ListItemIcon>
          <ListItemText primary="Detalles del Bot" />
        </ListItemButton>

        <ListItemButton component={RouterLink} to="/conocimiento">
          <ListItemIcon><PsychologyIcon /></ListItemIcon>
          <ListItemText primary="Conocimiento" />
        </ListItemButton>

        <ListItemButton component={RouterLink} to="/apariencia">
          <ListItemIcon><CheckroomIcon /></ListItemIcon>
          <ListItemText primary="Apariencia" />
        </ListItemButton>

        <ListItemButton component={RouterLink} to="/conversaciones">
          <ListItemIcon><HistoryIcon /></ListItemIcon>
          <ListItemText primary="Historial" />
        </ListItemButton>

        <ListItemButton component={RouterLink} to="/notificaciones">
          <ListItemIcon><NotificationsIcon /></ListItemIcon>
          <ListItemText primary="Notificaciones" />
        </ListItemButton>

        <ListItemButton component={RouterLink} to="/incrustacion">
          <ListItemIcon><HubIcon /></ListItemIcon>
          <ListItemText primary="Incrustación" />
        </ListItemButton>

        <ListItemButton component={RouterLink} to="/info">
          <ListItemIcon><InfoIcon /></ListItemIcon>
          <ListItemText primary="Acerca de" />
        </ListItemButton>
      </List>
    </Drawer>
  );
}
