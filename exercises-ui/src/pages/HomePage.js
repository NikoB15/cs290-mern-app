import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ExerciseTable from '../components/ExerciseTable'
import '../App.css';

function HomePage({ setExerciseToEdit }) {
    const [exercises, setExercises] = useState([]);
    const navigate = useNavigate();

    const loadExercises = async () => {
        const response = await fetch('/exercises');
        const data = await response.json();
        setExercises(data);
    };

    const onDelete = async _id => {
        const response = await fetch(`/exercises/${_id}`, { method: "DELETE" });
        if (response.status === 204) {
            setExercises(exercises.filter(ex => ex._id !== _id));
        } else {
            console.error(`Failed to delete exercise with _id = ${_id}; status code = ${response.status}`);
        }
    };

    const onEdit = async exercise => {
        setExerciseToEdit(exercise);
        navigate("/edit-exercise");
    };

    useEffect(() => {
        loadExercises();
    }, []);

    return (
        <div>
            <h2>List of Exercises</h2>
            <p>
                Click <Link to="/create-exercise"> here</Link> to create a new exercise.
            </p>
            <ExerciseTable exercises={exercises} onDelete={onDelete} onEdit={onEdit} />
        </div>
    );
}

export default HomePage;