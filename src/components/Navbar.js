import React, { useState } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Toolbar } from "@mui/material";
import SideBar from "./SideBar";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const handleMenu = () => {
    setMenu(!menu);
  };
  return (
    <AppBar sx={{ position: "relative", background: "#00773c" }}>
      <Toolbar>
        <div onClick={handleMenu}>
          <MenuIcon sx={{ cursor: "pointer" }} />
        </div>
        <SideBar menu={menu} />
        <div style={{ position: "absolute", right: "3vw" }}>
          <span>{sessionStorage.getItem("email")}</span>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
