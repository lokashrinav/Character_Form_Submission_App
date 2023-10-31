import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './components/App2.jsx';
import MainPage2 from './components/App3.jsx';
import ViewCharacterPage from './components/ViewCharacterPage.jsx'; // Import the new component
import AddCharacterPage from './components/AddCharacterPage';

function App() {
  return (
    <Router>
      <div className="full">
        <div className="title">Character Creator</div>
        <div className="idk">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/view-character" element={<ViewCharacterPage />} /> {/* New route */}
          </Routes>
          <div className="heyy"></div>
          <Routes>
            <Route path="/" element={<MainPage2 />} />
            <Route path="/add-character" element={<AddCharacterPage />} /> {/* New route */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;