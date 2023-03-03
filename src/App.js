import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import "./App.css";
import { auth, authenticate, logout } from "./firebase/firebase";

const host = "https://final-project-ed875.web.app";

function App() {
  const [user, loadingUser] = useAuthState(auth);
  // State hook - useState
  const [newExercise, setNewExercise] = useState("");
  const [newDow, setNewDow] = useState("");
  const [newReps, setNewReps] = useState("");
  const [exercises, setExercises] = useState([]);

  // Helper functions

  function addExercise() {
    if (!newExercise) {
      alert("Enter an exercise!");
      return;
    }
    const exercise = {
      exercise: newExercise,
      dow: newDow,
      reps: newReps,
    };
    fetch(`${host}/exercises`, {
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
    fetch(`${host}/exercises/${id}`, {
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
    fetch(`${host}/exercises/${id}`, {
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
      fetch(`${host}/exercises`)
        .then((res) => res.json())
        .then((data) => {
          setExercises(data);
        })
        .catch(alert);
    };
    getExercises();
  }, []);

  if (loadingUser) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <div>
        <button onClick={() => authenticate()}>Sign In</button>
      </div>
    );
  }

  return (
    <div className="app">
      <button onClick={logout}>Log out</button>
      {/* Header */}
      <h1>Today's Practice Plan</h1>
      {/* Input (input and button) */}
      <input
        type="text"
        placeholder="Add an exercise..."
        value={newExercise}
        onChange={(e) => setNewExercise(e.target.value)}
      />
      <input
        type="text"
        placeholder="Day of the week"
        value={newDow}
        onChange={(e) => setNewDow(e.target.value)}
      />
      <input
        type="number"
        placeholder="reps"
        value={newReps}
        onChange={(e) => setNewReps(e.target.value)}
      />
      {/* <button onClick={}>Get</button> */}
      <button onClick={() => addExercise()}>🚀</button>
      {/* List of exercises (unordered list with list of exercises */}
      <ul>
        {exercises.map((exercise) => {
          console.log(exercise);
          return (
            <div>
              <li key={exercise.id}>
                <span
                  style={{
                    textDecoration: exercise.done ? "line-through" : undefined,
                  }}
                >
                  {exercise.dow} {exercise.exercise} {exercise.reps}
                </span>
                <button onClick={() => markExerciseDone(exercise.exercisesID)}>
                  ✅
                </button>
                <button onClick={() => deleteExercise(exercise.exercisesID)}>
                  🙅
                </button>
              </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
