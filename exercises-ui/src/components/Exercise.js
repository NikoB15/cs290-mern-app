import React from 'react';
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import '../App.css';

function Exercise({ exercise, onDelete, onEdit }) {
    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date}</td>
            <td className="table-icon"><MdEdit onClick={() => onEdit(exercise)} /></td>
            <td className="table-icon"><MdDeleteForever onClick={() => onDelete(exercise._id)} /></td>
        </tr>
    );
}

export default Exercise;