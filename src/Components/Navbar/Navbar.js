import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InsertChartIcon from "@mui/icons-material/InsertChart";

export default function Navbar() {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#0C0C0C", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)" }}>
      <Container maxWidth="x">
        <Toolbar disableGutters>
          <InsertChartIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1, color: "#333333", fontWeight: "bold", textShadow: "1px 1px #cccccc" }}
            style={{ color: 'white' ,fontSize: 50}}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontSize:"18px",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".05rem",
              color: "white",
              textDecoration: "none",
              textShadow: "0.5px 1px #cccccc"
            }}
          >
            TEST RESULT VISUALIZER
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}