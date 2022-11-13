import React from "react";

import { BrowserRouter as Routes, Route, useHistory } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./pages/Register";
import LossPassword from "./pages/LossPassword";
import Profile from "./pages/Profile";
import "./style.css";

function App() {
  let history = useHistory();
  return (
    <div className="App">
      <Routes>
        <Route exact path="/">
          <Login history={history} />
        </Route>
        <Route path="/registro" component={Register} />
        <Route path="/olvido-contrasenia" component={LossPassword} />
        <PrivateRoute exact path="/perfil" component={Profile} />
        <PrivateRoute exact path="/home" component={Home} />
      </Routes>
    </div>
  );
}

export default App;
