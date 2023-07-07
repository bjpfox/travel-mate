import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
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
            try {
                const res = await fetch(`./api/trips`)
                if (!res.ok) {
                    throw new Error("Failed to fetch trips")
                }
                const data = await res.json()
                setTrips(data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchTrips()
    }, [])
    return (
        <Accordion allowMultiple>
            <h3>My saved trips</h3>
            {
            trips && trips.map((trip) => {
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
                        <Button backgroundColor={"#7EB6D7"} onClick={() => navigate(`/edit-trip/${trip.id}`)}>Edit Trip</Button>
                        <DeleteTrip trips={trips} destination={trip.destination} departure={trip.time_of_departure} duration={trip.duration} setTrips={setTrips} tripId={`${trip.id}`}></DeleteTrip>
                        <Button backgroundColor={"#7EB6D7"} onClick={() => navigate(`/view-itinerary/${trip.id}`)}>View/Edit Itinerary</Button>
                        </AccordionPanel>
                    </AccordionItem>
                )
                })
            }
       </Accordion>
    )
}

export default ViewTrips

