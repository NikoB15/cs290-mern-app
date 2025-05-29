import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateExercisePage from './pages/CreateExercisePage'
import EditExercisePage from './pages/EditExercisePage'
import Navigation from './components/Navigation';

function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState();

  return (
    <div className="App">
      <header>
        <h1>Exercise Tracker</h1>
        <p>View and manage a list of exercises easily.</p>
      </header>
      <Router>
        <Navigation />
        <div className="centered-container">
          <div className="App-page">
            <Routes>
              <Route path="/" element={<HomePage setExerciseToEdit={setExerciseToEdit} />} />
              <Route path="/create-exercise" element={<CreateExercisePage />} />
              <Route path="/edit-exercise" element={<EditExercisePage exerciseToEdit={exerciseToEdit} />} />
            </Routes>
          </div>
        </div>
      </Router>
      <footer>
        {"\u00a9"} 2024 Niko Bransfield
      </footer>
    </div>
  );
}

export default App;
