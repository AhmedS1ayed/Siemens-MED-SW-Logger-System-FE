import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InsertChartIcon from "@mui/icons-material/InsertChart";

export default function Navbar() {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#fffff3", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <InsertChartIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1, color: "#333333", fontWeight: "bold", textShadow: "1px 1px #cccccc" }}
            style={{ color: 'black' ,fontSize: 50}}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#333333",
              textDecoration: "none",
              textShadow: "1px 1px #cccccc"
            }}
          >
            LOGGER
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}