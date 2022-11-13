import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmail, newUser } from "../redux/action";
import { Box, TextField, Button } from "@mui/material";
import { useHistory } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      setEmail("");
    };
  }, []);

  const { checkEmail } = useSelector((state) => state);
  const [email, setEmail] = useState("");
  const [input, setInput] = useState({
    name: "",
    fistLastName: "",
    secondLastName: "",
    urlAvatar: "",
    age: "",
    password: "",
  });

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmitEmail = (e) => {
    e.preventDefault();
    if (email?.length) {
      dispatch(verifyEmail(email));
    } else {
      alert("Debe ingresar un email válido.");
    }
  };

  const handlesubmitUser = (e) => {
    e.preventDefault();
    dispatch(newUser({ ...input, email: email }));
    useHistory.push("/home");
    console.log(input);
  };
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prevState) => {
      let newState = {
        ...prevState,
        [name]: value,
      };
      return newState;
    });
  };

  return (
    <Box
      minHeight="95vh"
      width="99vw"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        overflowY: "scroll",
      }}
    >
      <h1 style={{ marginTop: "5vh" }}>Regístrate</h1>
      <h4>Es gratis y cualquiera puede unirse</h4>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          width: "30vw",
          alignItems: "center",
          justifyContent: "center",
          padding: "1vw",
        }}
        onSubmit={handleSubmitEmail}
      >
        <TextField
          fullWidth
          type="email"
          sx={{ "& fieldset": { borderRadius: "14px" }, my: "6px" }}
          id="outlined-basico"
          variant="outlined"
          autoComplete="off"
          placeholder="Correo"
          className="size-to-search-bar-sm"
          onChange={handleEmail}
        />
        <Button
          type="submit"
          style={{
            width: "18.1rem",
            height: "3rem",
            color: "white",
            margin: "20px",
            backgroundColor: "#00773c",
          }}
        >
          Validar
        </Button>
      </form>
      {checkEmail === false ? (
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            width: "30vw",
            alignItems: "center",
            justifyContent: "center",
            padding: "1vw",
          }}
          onSubmit={handlesubmitUser}
        >
          <TextField
            fullWidth
            type="text"
            placeholder="Nombre..."
            onChange={handleInput}
            name="name"
          />
          <TextField
            fullWidth
            type="text"
            placeholder="Primer apellido..."
            onChange={handleInput}
            name="fistLastName"
            sx={{ my: "6px" }}
          />
          <TextField
            fullWidth
            type="text"
            placeholder="Segundo apellido..."
            onChange={handleInput}
            name="secondLastName"
            sx={{ my: "6px" }}
          />
          <TextField
            fullWidth
            type="file"
            placeholder="imagen"
            onChange={handleInput}
            name="urlAvatar"
            sx={{ my: "6px" }}
          />
          <TextField
            fullWidth
            type="text"
            placeholder="Edad..."
            onChange={handleInput}
            name="age"
            sx={{ my: "6px" }}
          />
          <TextField
            fullWidth
            type="text"
            placeholder="Contraseña..."
            onChange={handleInput}
            name="password"
            sx={{ my: "6px" }}
          />
          <Button
            type="submit"
            style={{
              width: "18.1rem",
              height: "3rem",
              color: "white",
              margin: "20px",
              backgroundColor: "#00773c",
            }}
          >
            Registrarse
          </Button>
        </form>
      ) : checkEmail === true ? (
        <span>el correo: {email} ya ha sido usado.</span>
      ) : (
        ""
      )}
    </Box>
  );
};

export default Register;
