import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ReviewProvider } from './context/reviewContext';
import ArtistSearch from './components/ArtistSearch/artistSearch';
import Profile from './pages/Profile';
import './App.css';

function App() {
  return (
    <Router>
      <ReviewProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<ArtistSearch />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </ReviewProvider>
    </Router>
  );
}

export default App;