import React, { createContext, useContext, useState } from 'react';

const ReviewContext = createContext();

export function ReviewProvider({ children }) {
  const [reviews, setReviews] = useState([]);

  const addReview = (review) => {
    setReviews(prevReviews => [...prevReviews, review]);
    // Optionally, you could also save to localStorage here
    localStorage.setItem('musicReviews', JSON.stringify([...reviews, review]));
  };

  return (
    <ReviewContext.Provider value={{ reviews, addReview }}>
      {children}
    </ReviewContext.Provider>
  );
}

export function useReviews() {
  return useContext(ReviewContext);
}