import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import logoUCP from "../assets/logo-ucp.png";
import {
  checkLogin,
  // setAuthTrue,
  // setAuthFalse,
} from "../redux/action";

import { Box, TextField, Button } from "@mui/material";

const Login = ({ history }) => {
  const dispatch = useDispatch();
  const { auth, checkEmail } = useSelector((state) => state);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      checkLogin({
        email: email,
        password: password,
      })
    );
    sessionStorage.setItem("email", email);
    history.push("/home");
  };

  return (
    <Box
      height="95vh"
      width="99vw"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
      }}
    >
      <Box
        height="95vh"
        width="45vw"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <img style={{ width: "40vw" }} src={logoUCP} alt="UCP-PIC." />
      </Box>

      <Box
        height="95vh"
        width="45vw"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            width: "30vw",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #d1d1d1",
            borderRadius: "16px",
            padding: "1vw",
          }}
          onSubmit={handleSubmit}
        >
          <h1 style={{ color: "grey" }}>icon</h1>
          <TextField
            fullWidth
            sx={{ "& fieldset": { borderRadius: "14px" }, my: "6px" }}
            id="outlined-basico"
            label="Correo"
            variant="outlined"
            autoComplete="off"
            placeholder="Correo"
            className="size-to-search-bar-sm"
            onChange={handleEmail}
          />

          <TextField
            fullWidth
            sx={{ "& fieldset": { borderRadius: "14px" }, my: "6px" }}
            id="outlined-basic"
            label="Contraseña"
            type="password"
            variant="outlined"
            autoComplete="off"
            placeholder="Contraseña"
            className="size-to-search-bar-sm"
            onChange={handlePassword}
          />
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Link to="/olvido-contrasenia">Olvidé contraseña</Link>
            <Link to="/home">Dashboard</Link>
          </Box>

          <Button
            type="submit"
            variant="text"
            style={{
              width: "18.1rem",
              height: "3rem",
              color: "white",
              margin: "20px",
              backgroundColor: "#00773c",
            }}
          >
            Iniciar sesión
          </Button>
        </form>
        <span>{checkEmail?.length ? checkEmail : ""}</span>
        <p style={{ marginTop: "5vh" }}>
          No tienes una cuenta todavía?
          <Link to="/registro"> Regístrate</Link>
        </p>
      </Box>
    </Box>
  );
};

export default Login;
