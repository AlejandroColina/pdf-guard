import { Box } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { closeAuth } from "../redux/action";

const SideBar = ({ menu }) => {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(closeAuth());
    sessionStorage.setItem("ingress", false);
    sessionStorage.setItem("auth", false);
  };

  return (
    <>
      {menu ? (
        <Box
          sx={{
            top: "8.8vh",
            background: "#f4f5f7",
            position: "absolute",
            height: "100vh",
            width: "20vw",
            zIndex: "10",
            left: "0",
            display: "flex",
            flexDirection: "column",
            boxShadow: "4px 0 4px -3px #888",
          }}
        >
          <Link className="sidebar-button" to="/perfil">
            Perfil
          </Link>
          <Link className="sidebar-button" to="/home">
            Home
          </Link>
          <Link className="sidebar-button" onClick={handleClose}>
            Cerrar sesión
          </Link>
        </Box>
      ) : null}
    </>
  );
};

export default SideBar;
