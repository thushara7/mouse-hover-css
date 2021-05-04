import "./App.css";
import React, { useState, useEffect } from "react";

export default function App() {
  const [state, setState] = useState(null);
  const [info, setInfo] = useState("");
  const [selected, setSelected] = useState("profile");

  const getResults = async function() {
    const data = await fetch("https://randomuser.me/api/?seed=thushara");
    const results = await data.json();

    //setState(results)
    console.log(results.results[0]);
    setState(results.results[0]);
  };

  useEffect(() => {
    if (state && state["name"]["title"]) {
      setInfo(
        state["name"]["title"] +
          " " +
          state["name"]["first"] +
          " " +
          state["name"]["last"]
      );
    }
  }, [state]);

  useEffect(() => {
    getResults();
  }, []);

  function handleMouseEnter(e) {
    setSelected(e.target.name);
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
      displayValue = state["location"]["city"];
    }

    setInfo(displayValue);
    console.log(e.target.name);
  }

  return (
    <div className="App">
      {state && state.picture && (
        <div className="card ">
          <img
            src={state?.picture.large}
            className="avatar"
            alt="profilePicture"
          />
          <p className="line"></p>
          <p className="helperInfo"> {`My ${selected} is`}</p>
          <p> {info ? info : ""}</p>
          <div className="main">
            <button
              className={
                info && selected === "profile" ? "invertedIcon" : "icon"
              }
              onMouseEnter={handleMouseEnter}
              name="profile"
            >
              Profile
            </button>
            <button
              className={info && selected === "email" ? "invertedIcon" : "icon"}
              name="email"
              onMouseEnter={handleMouseEnter}
            >
              Email
            </button>
            <button
              className={
                info && selected === "address" ? "invertedIcon" : "icon"
              }
              name="address"
              onMouseEnter={handleMouseEnter}
            >
              Address
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
