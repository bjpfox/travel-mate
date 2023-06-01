import { useState } from "react";
import { Navigate, redirect, useParams } from "react-router-dom"
import { useEffect } from "react";

const EditTrip = () => {

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


  const handleSubmit = (event) => {
    event.preventDefault();
    const sendPutTripRequest = async() => {
            const res = await fetch(`/api/trips/${id}`, {
                method: "PUT",
                headers: {
                  "Content-type": "application/json",
                },
                body: JSON.stringify({ trip }),
                })
            console.log('trip is: ', trip)
            console.log('res is: ', res)
        }
    sendPutTripRequest()
    return redirect("/view-trips") // TODO - not working properly - debug this
        //return false
    }

  const handleChange = (event) => {
    setFields({ ...trip, [event.target.name]: event.target.value });
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1>Edit your trip</h1>
      <input
        type="text"
        name="destination"
        placeholder="Where? e.g. London"
        value={trip.destination}
        onChange={handleChange}
      />
      <br />
      <input
        type="text"
        name="time_of_departure"
        placeholder="When? e.g. Summer 2024"
        value={trip.time_of_departure}
        onChange={handleChange}
      />

      <br />
      <input
        type="text"
        name="duration"
        placeholder="How Long? e.g. 3 weeks"
        value={trip.duration}
        onChange={handleChange}
      />
      <br />
      <input
        type="text"
        name="activities"
        placeholder="Activities (optional) e.g. sightseeing, Wimbledon"
        value={trip.activities}
        onChange={handleChange}
      />
      <br />
      <input
        type="text"
        name="budget"
        placeholder="Budget (optional) e.g. 100 pounds per day"
        value={trip.budget}
        onChange={handleChange}
      />
      <br />
      <textarea
        type="text"
        name="additional_information"
        placeholder="Additional information (optional) e.g. include at least one museum"
        value={trip.additional_information}
        onChange={handleChange}
      />
      <br />
      <input type="submit" />
    </form>
  );
};

export default EditTrip 