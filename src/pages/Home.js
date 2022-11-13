import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFiles } from "../redux/action";

import PictureAsPdfRoundedIcon from "@mui/icons-material/PictureAsPdfRounded";

import { Box, TextField, InputAdornment, Grid } from "@mui/material";
import "../style.css";

import SearchIcon from "@mui/icons-material/Search";
import Navbar from "../components/Navbar";

const Home = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  useEffect(() => {
    dispatch(getFiles(input));
  }, [dispatch]);

  const { files } = useSelector((state) => state);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getFiles(input));
  };

  return (
    <Grid container>
      <Navbar />
      <Grid item xs={2}></Grid>
      <Grid item xs={8}>
        <Box sx={{ minHeight: "100vh" }}>
          <form
            style={{ margin: "2vh auto" }}
            onSubmit={input.length ? handleSubmit : null}
          >
            <TextField
              fullWidth
              sx={{ "& fieldset": { borderRadius: "14px", outlined: "green" } }}
              id="outlined-basic"
              variant="outlined"
              autoComplete="off"
              placeholder="Buscar"
              className="size-to-search-bar-sm"
              onChange={(e) => setInput(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </form>
          {files?.length ? (
            <>
              <h2 style={{ marin: "3vh 0", textAlign: "center" }}>
                DOCUMENTOS EXISTENTES
              </h2>

              <div
                style={{
                  margin: "5vh auto",
                  width: "70vw",
                }}
              >
                <Grid
                  container
                  sx={{
                    background: "#478264",
                    color: "white",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    padding: "0 8px",
                  }}
                >
                  <Grid item xs={2}>
                    <b>Nombre</b>
                  </Grid>
                  <Grid item xs={5}>
                    <b>Descripción</b>
                  </Grid>
                  <Grid item xs={4}>
                    <b>Facultad</b>
                  </Grid>
                  <Grid item xs={1}>
                    <b>Visualizar</b>
                  </Grid>
                </Grid>

                {files &&
                  files.map((file, index) => (
                    <Grid
                      key={index + 1}
                      container
                      className={
                        (index + 1) % 2 === 0 ? "gray-color-item-form" : ""
                      }
                      sx={{
                        height: "40px",
                        display: "flex",
                        alignItems: "center",
                        padding: "0 8px",
                      }}
                    >
                      <Grid item xs={2}>
                        {file.name}
                      </Grid>
                      <Grid item xs={5}>
                        {file.description}
                      </Grid>
                      <Grid item xs={4}>
                        {file.Faculty.name}
                      </Grid>
                      <Grid item xs={1}>
                        <a
                          href={file.urlDocument}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <PictureAsPdfRoundedIcon sx={{color:"grey"}}  />
                        </a>
                      </Grid>
                    </Grid>
                  ))}
              </div>
            </>
          ) : (
            <h3 style={{ margin: "5vh auto" }}>Sin registro de documentos.</h3>
          )}
        </Box>
      </Grid>
      <Grid item xs={2}></Grid>
    </Grid>
  );
};

export default Home;
