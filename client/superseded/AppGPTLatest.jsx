import { useState } from 'react'
import { useAuth } from "./contexts/AuthProvider";

import { Heading, Tabs } from "@chakra-ui/react"

import { Routes, Route, Link, Navigate, useParams } from "react-router-dom";
import './App.css'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout';
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import PrivateRoutes from './components/PrivateRoutes';
import ViewTrips from './components/ViewTrips';
import CreateTrip from './components/CreateTrip';

function App() {

  const { user } = useAuth()

  return (
      <>
      <Heading>Travel Mate</Heading>

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />

        {user ? (
          <>
            Welcome {user.username}
            <Route path="/logout" element={<Logout />} />
            <Link to="/">Home</Link>
            <Link to="/view-trips">View Trips</Link>
            <Link to="/create-new-trip">Create New Trip</Link>
          </>
        ) : (
          <Route exact path="/" element={<Navigate to="/login" replace />} />
        )}

        <Route path="/view-trips" element={<ViewTrips />} />
        <Route path="/create-new-trip" element={<CreateTrip />} />

        <Route path="/*" element={<NotFound />} />
      </Routes>

      </>
  )
}

export default App


// why isnt private routes being run
// if i deleted would it make a difference?


