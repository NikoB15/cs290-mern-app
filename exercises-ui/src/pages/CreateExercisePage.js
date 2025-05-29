import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function CreateExercisePage() {

    const [name, setName] = useState("");
    const [reps, setReps] = useState("");
    const [weight, setWeight] = useState("");
    const [unit, setUnit] = useState("lbs");
    const [date, setDate] = useState("");
    const navigate = useNavigate();


    const createExercise = async () => {
        const response = await fetch("/exercises", {
            method: "POST",
            body: JSON.stringify({name, reps, weight, unit, date}),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.status === 201) {
            alert("Successfully created the exercise!");
        } else {
            alert("Failed to create the exercise.");
        }

        navigate('/');
    };

    return (
        <div>
            <h2>Create an Exercise</h2>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)} />
            <input
                type="number"
                min="1"
                value={reps}
                placeholder="Reps (Integer)"
                onChange={e => setReps(e.target.value)} />
            <input
                type="number"
                min="1"
                placeholder="Weight (Integer)"
                value={weight}
                onChange={e => setWeight(e.target.value)} />
            <select 
                onChange={e => setUnit(e.target.value)}
                defaultValue="lbs">
                <option value="lbs">lbs</option>
                <option value="kgs">kgs</option>
            </select>
            <input
                type="text"
                placeholder="Date (MM-DD-YY)"
                value={date}
                onChange={e => setDate(e.target.value)} />
            <button
                onClick={createExercise}
            >Create</button>
        </div>
    );
}

export default CreateExercisePage;