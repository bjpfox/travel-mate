import { useState } from "react";
import { Navigate, Link, redirect, useParams } from "react-router-dom"
import { useEffect } from "react";

const DeleteTrip = () => {

  const { id } = useParams()
  
  const [trip, setFields] = useState( {} ) // Can just initiatilise to empty object {} ?

    useEffect(() => {
        const fetchTrips = async() => {
            const res = await fetch(`../api/trips?id=${id}`)
            console.log('res: ', res)
            const data = await res.json()
            setFields(data)
            console.log('data: ', data)
        }
        fetchTrips()
    }, [])


  const handleDelete = (event) => {
    event.preventDefault();
    const sendDeleteTripRequest = async() => {
            const res = await fetch(`/api/trips/${id}`, {
                method: "DELETE",
                headers: { "Content-type": "application/json", },
            })
            console.log('trip is: ', trip)
            console.log('res is: ', res)
        }
    sendDeleteTripRequest()
    return <Navigate to="/view-trips"/> //replace={true} />
    //redirect("/view-trips") 
        //return false
    }

  return (
    <>
      <h1>Delete your trip</h1>
      <h3>Are you sure you want to delete this trip?</h3>
      <br />Destination: {trip.destination}
      <br />Departure: {trip.time_of_departure}
      <br />Duration: {trip.duration}
      <br /><button onClick={handleDelete}>Yes - Delete</button> | <Link to={`/view-trips/`}>No - Cancel</Link>
    </>
  );
};

export default DeleteTrip 
