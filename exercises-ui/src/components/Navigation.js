import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Navigation() {
    return (
        <nav className="App-nav centered-container">
            <Link to="/">Home</Link>
            <Link to="/create-exercise">Create</Link>
        </nav>
    );
}

export default Navigation;