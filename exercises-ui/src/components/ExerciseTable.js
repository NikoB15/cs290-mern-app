import React from 'react';
import Exercise from './Exercise';
import '../App.css';

function ExerciseTable({ exercises, onDelete, onEdit }) {
    return (
        <table id="exercises">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Reps</th>
                    <th>Weight</th>
                    <th>Unit</th>
                    <th>Date</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {exercises.map((exercise) => <Exercise exercise={exercise}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    key={exercise._id} />)}
            </tbody>
        </table>
    );
}

export default ExerciseTable;
