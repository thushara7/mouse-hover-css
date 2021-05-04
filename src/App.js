import "./App.css";
import React, { useState, useEffect } from "react";

export default function App() {
  const [state, setState] = useState(null);
  const [info, setInfo] = useState("");

  const getResults = async function() {
    const data = await fetch("https://randomuser.me/api/?seed=thushara");
    const results = await data.json();

    //setState(results)
    console.log(results.results[0]);
    setState(results.results[0]);
  };

  useEffect(() => {
    getResults();
  }, []);

  function handleMouseEnter(e) {
    let displayValue = "";
    if (e.target.name === "profile") {
      displayValue =
        state["name"]["title"] +
        " " +
        state["name"]["first"] +
        " " +
        state["name"]["last"];
    } else if (e.target.name === "email") {
      displayValue = state["email"];
    } else if (e.target.name === "address") {
      // address
    }

    setInfo(displayValue);

    console.log(e.target.name);
  }

  function handleMouseLeave(e) {
    setInfo("");
  }
  return (
    <div className="App">
      {state && state.picture && (
        <div className="card">
          <img
            src={state?.picture.large}
            className="avatar"
            alt="profilePicture"
          />
          <p className="line"></p>
          <p> {info ? info : ""}</p>
          <div className="main">
            <button
              className="icon"
              onMouseEnter={handleMouseEnter}
              name="profile"
              onMouseLeave={handleMouseLeave}
            >
              Profile
            </button>
            <button
              className="icon"
              name="email"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Email
            </button>
            <button
              className="icon"
              name="address"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Address
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
