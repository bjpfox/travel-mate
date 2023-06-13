import { useEffect, useState } from "react"
import { Link, useLocation, useParams, Navigate, useNavigate } from "react-router-dom"
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Text,
    Button,
  } from '@chakra-ui/react'
import DeleteTrip from "./DeleteTrip"

// Displays a list of trips (title, departure) so user can then, view, edit, or delete a specific trip
function ViewTrips() {
    const [trips, setTrips] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        const fetchTrips = async() => {
            const res = await fetch(`./api/trips`)
            const data = await res.json()
            console.log(data)
            setTrips(data)
        }
        fetchTrips()
    }, [])
    return (<Accordion allowMultiple><h3>My saved trips</h3>
        {
        //trips && console.log('trips:', trips) && trips.map(([trip_id, trip_destination, trip_time_of_departure, 
        // trip_duration, trip_activities, trip_budget, trip_additional_information, trip_created_on, trip_updated_on ]) => {
          //console.log('trips:', trips) && 
        trips && trips.map((trip) => {
              // const location = useLocation()
              // const{ id } = location.state
                return (
                    <AccordionItem key={trip.id}>
                        <AccordionButton>
                        {trip.destination}, {trip.time_of_departure} for {trip.duration}
                        <AccordionIcon/>
                        </AccordionButton>
                        <AccordionPanel>
                        Activities: <Text as="i">{trip.activities}</Text>
                        <br />Budget: <Text as="i">{trip.budget}</Text>
                        <br />Additional Information: <Text as="i">{trip.additional_information}</Text>
                        <br /><Text as="i">Last updated {trip.updated_on}</Text>
                        <br /> 
                        {/* <Link to={`/edit-trip/${trip.id}`}> Edit Trip</Link>  |  */}
                        {/* </AccordionPanel> */}
                        <Button backgroundColor={"#7EB6D7"} onClick={() => navigate(`/edit-trip/${trip.id}`)}>Edit Trip</Button>
                        {/* <Link to={`/edit-trip/${trip.id}`}> Edit Trip</Link>  |  */}
                        <DeleteTrip trips={trips} destination={trip.destination} departure={trip.time_of_departure} duration={trip.duration} setTrips={setTrips} tripId={`${trip.id}`}></DeleteTrip>
                        {/* <Link to={`/delete-trip/${trip.id}`}> Delete Trip</Link> | */}
                        <Button backgroundColor={"#7EB6D7"} onClick={() => navigate(`/view-itinerary/${trip.id}`)}>View/Edit Itinerary</Button>
                        {/* <Link to={`/view-itinerary/${trip.id}`}> View/Edit Itinerary</Link>   */}
                        </AccordionPanel>
                    </AccordionItem>
                )
              })
        }
       </Accordion>)
}

export default ViewTrips

