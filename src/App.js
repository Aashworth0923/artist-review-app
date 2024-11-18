import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ReviewProvider } from './context/reviewContext';
import ArtistSearch from './components/ArtistSearch/artistSearch';
import Profile from './pages/Profile/profile';
import './app.css';
import Header from './components/Header/header';

function App() {
  return (
    <Router>
      <Header />
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