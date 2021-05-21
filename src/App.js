import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Users from "./pages/Users";
import PrivatePage from "./pages/PrivatePage";
import ProtectedRoute from "./components/ProtectedRoute";
import Button from "./components/Button";

import { HOME, PROFILE, USERS, PRIVATE } from "./constants/routes";
import AuthContextProvider from "./components/AuthContextProvider";
import LocaleContextProvider from "./components/LocaleContextProvider";

function App() {
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(0);

  function saveUser(userData) {
    setUsers((prevState) => [...prevState, userData]);
  }

  return (
    <>
      <LocaleContextProvider>
        <AuthContextProvider>
          <Switch>
            <Route path={PROFILE}>
              <Profile saveUser={saveUser} />
            </Route>
            <Route path={USERS}>
              <Users users={users} />
            </Route>
            <ProtectedRoute path={PRIVATE}>
              <PrivatePage />
            </ProtectedRoute>
            <Route path={HOME} exact>
              <Home users={users} />
            </Route>
          </Switch>
        </AuthContextProvider>
      </LocaleContextProvider>
      <div className="container">
        <div className="row">
          <div className="col col-12 mb-3">
            <h2 className="h4">Current count: {count}</h2>
          </div>
          <div className="col col-12 d-flex">
            <div className="mr-4">
              <Button onClick={() => setCount((prevCount) => prevCount + 1)}>
                +
              </Button>
            </div>
            <div className="mr-4">
              <Button onClick={() => setCount((prevCount) => prevCount - 1)}>
                -
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
