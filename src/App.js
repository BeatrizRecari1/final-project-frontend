import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import "./App.css";
import {
  auth,
  authenticateWithGoogle,
  authenticateWithEmail,
  logout,
} from "./firebase/firebase";

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
    setTimeout(() => {
      setRocketAnimating(false);
    }, 7000);
    const exercise = {
      exercise: newExercise,
      dow: newDow,
      reps: newReps,
      owner: user.uid,
    };
    fetch(`${host}/exercises/${user.uid}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(exercise),
    })
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
        setExercises(data);
      })
      .catch(alert);
  }

  useEffect(() => {
    const getExercises = () => {
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
      <div>
        <h1>Login with Email and Password</h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
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
        <h1>Login with Google</h1>
        <button onClick={() => authenticateWithGoogle()}>Sign In</button>
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
      {/* Header */}
      <h1>Today's Practice Plan</h1>
      {/* Input (input and button) */}
      <input
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
      <select value={newDow} onChange={(e) => setNewDow(e.target.value)}>
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
        min={1} // fixed no negative numbers
        type="number"
        placeholder="reps"
        value={newReps}
        onChange={(e) => setNewReps(e.target.value)}
      />
      {/* <button onClick={}>Get</button> */}
      <button
        className={["todo-button", "rocket", rocketAnimating && "animateRocket"]
          .filter((e) => e)
          .join(" ")}
        onClick={() => addExercise()}
      >
        🚀
      </button>
      {/* List of exercises (unordered list with list of exercises */}
      <ul>
        {exercises.map((exercise) => {
          return (
            <li className="exercise" key={exercise.id}>
              <span
                style={{
                  textDecoration: exercise.done ? "line-through" : undefined,
                }}
              >
                {exercise.dow} {exercise.exercise} {exercise.reps}
              </span>
              <button
                className="update-button"
                onClick={() => markExerciseDone(exercise.exercisesID)}
              >
                ✅
              </button>
              <button
                className="delete-button"
                onClick={() => deleteExercise(exercise.exercisesID)}
              >
                🙅
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
