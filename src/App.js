import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { ReviewProvider } from './context/reviewContext';
import ArtistSearch from './components/ArtistSearch/artistSearch';
import Profile from './pages/Profile/profile';
import Header from './components/Header/header';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <ReviewProvider>
        <Routes>
          <Route path="/" element={<ArtistSearch />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </ReviewProvider>
    </BrowserRouter>
  );
}

export default App;

/* 

<BrowserRouter> 
stores the current location in the browser's address bar using clean URLs and navigates
using the browser's built-in history stack.
When user clicks "Profile" in Header -> URL changes to "/profile"
BrowserRouter detects change -> renders Profile component
Back button works naturally
URL can be shared/bookmarked.
*/
