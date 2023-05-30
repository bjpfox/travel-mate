import { useState } from 'react';
import { useAuth } from "./contexts/AuthProvider";

import { Heading } from "@chakra-ui/react";

import { Routes, Route, Link } from "react-router-dom";
import './App.css';
import LoginForm from './components/LoginForm';
import Logout from './components/Logout';
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import PrivateRoutes from './components/PrivateRoutes';
import ViewTrips from './components/ViewTrips';
import CreateTrip from './components/CreateTrip';

function App() {
  const { user } = useAuth();

  return (
    <>
      <Heading>Travel Mate</Heading>

{/* Does this home component make sense? Should Links be part of a Nav component? */}
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
        { !user ? 
        <LoginForm /> : 
        <>
          <Logout /> 
              <Link to="/">Home</Link> | 
              <Link to="/view-trips"> View Trips</Link> |  
              <Link to="/create-new-trip"> Create New Trip</Link>
        </>
    }
      <Routes>
        <Route element={<PrivateRoutes redirectTo="/login" />}>
          <Route path="/view-trips" element={<ViewTrips />} />
          <Route path="/create-new-trip" element={<CreateTrip />} />
        </Route>
      <Route path='/' /> 
      <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
