import { useState, useEffect, createContext, useContext } from "react";
import { useAuth } from "../contexts/AuthProvider";

const Home = () => {
    const { user } = useAuth()
  return (
    <div>
      {user ? <h5>Welcome to TravelMate, {user?.username} </h5> : 'Travel Itinerary Generator'}
    </div>
  );
};

export default Home;
