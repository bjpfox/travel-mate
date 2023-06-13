import { useState, useEffect, createContext, useContext } from "react";
import { useAuth } from "../contexts/AuthProvider";

const Home = () => {
    const { user } = useAuth()
  return (
    <div>
      {user ? <h3>Welcome to TravelMate, {user?.username}! </h3> : 'Travel Itinerary Generator'}
    </div>
  );
};

export default Home;
