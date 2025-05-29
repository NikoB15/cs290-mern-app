import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function EditExercisePage({ exerciseToEdit }) {
    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(exerciseToEdit.date);
    const navigate = useNavigate();

    const editExercise = async () => {
        const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
            method: "PUT",
            body: JSON.stringify({ name, reps, weight, unit, date }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.status === 200) {
            alert("Successfully edited the exercise!");
        } else {
            alert("Failed to edit the exercise.");
        }

        navigate('/');
    };

    return (
        <div>
            <h2>Edit Exercise</h2>
            <input
                type="text"
                value={name}
                placeholder="Name"
                onChange={e => setName(e.target.value)} />
            <input
                type="number"
                value={reps}
                placeholder="Reps (Integer)"
                min="1"
                onChange={e => setReps(e.target.value)} />
            <input
                type="number"
                value={weight}
                placeholder="Weight (Integer)"
                min="1"
                onChange={e => setWeight(e.target.value)} />
            <select 
                onChange={e => setUnit(e.target.value)}
                defaultValue={unit}>
                <option value="lbs">lbs</option>
                <option value="kgs">kgs</option>
            </select>
            <input
                type="text"
                value={date}
                placeholder="Date (MM-DD-YY)"
                onChange={e => setDate(e.target.value)} />
            <button
                onClick={editExercise}
            >Save</button>
        </div>
    );
}

export default EditExercisePage;