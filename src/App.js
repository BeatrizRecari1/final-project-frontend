import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import "./App.css";
import "./Splash.css";
import "./Background.css";
import {
  auth,
  authenticateWithGoogle,
  authenticateWithEmail,
  logout,
} from "./firebase/firebase";
import logo from "./logo.png";
import rocketSound from "./assets/rocket-sound.wav";
import clappingAudio from "./assets/celebrate2.wav";
import deleteAudio from "./assets/explosion.wav";

const host = "https://final-project-ed875.web.app";
// const host = "http://localhost:5002";

function App() {
  const [user, loadingUser] = useAuthState(auth);
  // State hook - useState
  const [newExercise, setNewExercise] = useState("");
  const [newDow, setNewDow] = useState("");
  const [newReps, setNewReps] = useState(""); // should be a number since that is the data type
  const [exercises, setExercises] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rocketAnimating, setRocketAnimating] = useState(false);

  // Helper functions

  function addExercise() {
    if (!newExercise) {
      alert("Enter an exercise!");
      return;
    }
    setRocketAnimating(true);
    new Audio(rocketSound).play();
    setTimeout(() => {
      setRocketAnimating(false);
    }, 7000);
    const exercise = {
      exercise: newExercise,
      dow: newDow,
      reps: newReps,
      owner: user.uid,
      done: false,
    };
    fetch(`${host}/exercises/${user.uid}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(exercise),
    })
      // This is a method chain on a Promise object that is returned from an HTTP request in JavaScript.
      .then((res) => res.json())
      .then((data) => {
        setExercises(data);
        setNewExercise("");
        setNewDow("");
        setNewReps("");
      })
      .catch(alert);

    // Reset newExercise back to original state
  }

  //   const newItem = { exercises };
  //   fetch("https://127.0.0.1:5002/exercises", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(newExercise),
  //   })
  //     .then(() => {
  //       (res) => res.json();
  //     })
  //     .catch(alert);
  // }

  // Deletes an item based on the exercise id
  function deleteExercise(id) {
    console.log(id);
    fetch(`${host}/exercises/${user.uid}/${id}`, {
      method: "DELETE",
      // headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setExercises(data);
        new Audio(deleteAudio).play();
      })
      .catch(alert);

    // setExercises(newArray);
  }

  function markExerciseDone(id) {
    fetch(`${host}/exercises/${user.uid}/${id}`, {
      method: "PATCH",
      // headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setExercises(data);
        new Audio(clappingAudio).play();
      })
      .catch(alert);
  }

  useEffect(() => {
    const getExercises = () => {
      setExercises([]);
      if (!user) return;
      fetch(`${host}/exercises/${user.uid}`)
        .then((res) => res.json())
        .then((data) => {
          setExercises(data);
        })
        .catch(alert);
    };
    getExercises();
  }, [user]);

  if (loadingUser) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <div className="app credentials-page">
        <div className="main-content">
          <div className="logo-container column">
            <img className="logo" src={logo} />
            <p className="slogan">
              Where <span className="emphasized-text">PERFECT</span> practice
              makes&nbsp;<span className="emphasized-text">PERFECT</span>
            </p>
          </div>
          <div className="credentials column">
            <h1 className="main-title">Login</h1>
            <input
              className="input"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="input"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="action-buttons">
              <button
                onClick={() => authenticateWithEmail(email, password, "signIn")}
              >
                Sign In
              </button>
              <button
                onClick={() => authenticateWithEmail(email, password, "signUp")}
              >
                Sign Up
              </button>
            </div>
            <hr />
            <button
              className="google-signin"
              onClick={() => authenticateWithGoogle()}
            >
              <span>Sign In With</span>
              <img
                className="icon"
                src="https://tabler-icons.io/static/tabler-icons/icons/brand-google.svg"
              />
            </button>
          </div>
        </div>
      </div>
    );
  }
  console.log(exercises);
  return (
    <div className="app">
      <div className="top-bar">
        <button className="logout-button" onClick={logout}>
          Log out
        </button>
      </div>
      <div className="main-content">
        {/* Header */}
        <h1 className="main-title">Today's Practice Plan</h1>
        <div className="input-controls">
          {/* Input (input and button) */}
          <input
            className="input"
            type="text"
            placeholder="Add an exercise..."
            value={newExercise}
            onChange={(e) => setNewExercise(e.target.value)}
          />
          {/* <input
        type="text"
        placeholder="Day of the week"
        value={newDow}
        onChange={(e) => setNewDow(e.target.value)}
      /> */}
          <select
            className="input"
            value={newDow}
            onChange={(e) => setNewDow(e.target.value)}
          >
            <option></option>
            <option>Monday</option>
            <option>Tuesday</option>
            <option>Wednesday</option>
            <option>Thursday</option>
            <option>Friday</option>
            <option>Saturday</option>
            <option>Sunday</option>
          </select>
          <input
            className="input"
            min={1} // fixed no negative numbers
            type="number"
            placeholder="reps"
            value={newReps}
            onChange={(e) => setNewReps(e.target.value)}
          />
          {/* <button onClick={}>Get</button> */}
          <button
            className={[
              "todo-button",
              "rocket",
              rocketAnimating && "animateRocket",
            ]
              .filter((e) => e)
              .join(" ")}
            onClick={() => addExercise()}
          >
            🚀
          </button>
        </div>
        {/* List of exercises (unordered list with list of exercises */}
        <ul className="exercise-list">
          {!exercises ? (
            <h1>Loading...</h1>
          ) : (
            exercises.map((exercise) => {
              return (
                <li className="exercise" key={exercise.id}>
                  <span
                    className="exercise-description"
                    style={{
                      textDecoration: exercise.done
                        ? "line-through"
                        : undefined,
                    }}
                  >
                    {exercise.dow} {exercise.exercise} {exercise.reps}
                  </span>
                  <button
                    className="action-button"
                    onClick={() => markExerciseDone(exercise.exercisesID)}
                  >
                    ✅
                  </button>
                  <button
                    className="action-button"
                    onClick={() => deleteExercise(exercise.exercisesID)}
                  >
                    🙅
                  </button>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
