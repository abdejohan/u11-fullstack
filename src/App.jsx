import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import axios from "axios";
import Header from "./components/Header";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Posts from "./components/Posts";
// eslint-disable-next-line no-unused-vars
import Note from "./components/Note";
import UserContext from "./context/UserContext";
import Profile from "./components/Profile";
import UserProfileView from "./components/profilePages/UserProfileView";

const App = () => {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await axios.post(
        "http://localhost:5000/user/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await axios.get("http://localhost:5000/user/", {
          headers: { "x-auth-token": token },
        });
        setUserData({ token, user: userRes.data });
      }
    };
    checkLoggedIn();
  }, []);
  return (
    <div>
      <Router>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Header />
          <section className="mainContainer">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/posts/:postId" component={Posts} />
              <Route exact path="/user/:id" component={UserProfileView} />
              <Route path="/profile" component={Profile} />
              <Route path="/search" component={Home} />
            </Switch>
          </section>
        </UserContext.Provider>
      </Router>
    </div>
  );
};

export default App;
