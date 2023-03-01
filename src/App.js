import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
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
    fetch("/exercises", {
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
    const newArray = exercises.filter((exercise) => exercise.id !== id);
    setExercises(newArray);
  }

  useEffect(() => {
    const getExercises = () => {
      fetch(`/exercises`)
        .then((res) => res.json())
        .then((data) => {
          setExercises(data);
        })
        .catch(alert);
    };
    getExercises();
  }, []);

  return (
    <div className="app">
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
          return (
            <div>
              <li key={exercise.id}>
                {exercise.dow} {exercise.exercise} {exercise.reps}
                <button onClick={() => deleteExercise(exercise.id)}>🙅</button>
              </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
