import React, { useState } from "react";
import "./App.css";

function App() {
  // State hook - useState
  const [newExercise, setNewExercise] = useState("");
  const [exercises, setExercises] = useState([]);

  const getExercises = () => {
    fetch(`http://127.0.0.1:5002/exercises`)
      .then((res) => res.json())
      .then((data) => {
        setExercises(data);
      })
      .catch(alert);
  };

  // Helper functions

  function addExercise() {
    if (!newExercise) {
      alert("Enter an exercise!");
      return;
    }
    const exercise = {
      id: Math.floor(Math.random() * 1000),
      value: newExercise,
    };

    // Reset newExercise back to original state
    setNewExercise("");
  }

  // Deletes an item based on the exercise id
  function deleteExercise(id) {
    const newArray = exercises.filter((exercise) => exercise.id !== id);
    setExercises(newArray);
  }

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
      <button onClick={() => getExercises()}>Get</button>
      <button onClick={() => addExercise()}>😍</button>
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
