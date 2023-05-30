import { useState } from 'react';
import { useAuth } from "../src/contexts/AuthProvider";

import { Heading } from "@chakra-ui/react";

import { Routes, Route, Link } from "react-router-dom";
import './App.css';
import LoginForm from '../src/components/LoginForm';
import Logout from '../src/components/Logout';
import Home from "../src/pages/Home";
import NotFound from "../src/pages/NotFound";
import PrivateRoutes from '../src/components/PrivateRoutes';
import ViewTrips from '../src/components/ViewTrips';
import CreateTrip from '../src/components/CreateTrip';

function App() {
  const { user } = useAuth();

  return (
    <>
      <Heading>Travel Mate</Heading>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />

        <PrivateRoutes redirectTo="/login">
          {user && (
            <>
              Welcome {user.username}
              <Route path="/logout" element={<Logout />} />
              <Link to="/">Home</Link>
              <Link to="/view-trips">View Trips</Link>
              <Link to="/create-new-trip">Create New Trip</Link>
            </>
          )}

          <Route path="/view-trips" element={<ViewTrips />} />
          <Route path="/create-new-trip" element={<CreateTrip />} />
        </PrivateRoutes>

        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
