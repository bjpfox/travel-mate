import { useState } from "react";
import { Navigate, Link, redirect, useParams } from "react-router-dom"
import { useEffect } from "react";
import { Button, Modal, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, useDisclosure } from "@chakra-ui/react"



const DeleteTrip = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  // const { id } = useParams()
  const id = props.tripId
  
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
    onClose()
    // return <Navigate to="/view-trips"/> //replace={true} />
    //redirect("/view-trips") 
        //return false
    }

  return (
    <>
      <Button onClick={onOpen}>Delete trip</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
          <ModalContent>
            <ModalHeader>Delete Trip</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <h3>Are you sure you want to delete this trip?</h3>
        <br />Destination: {trip.destination}
        <br />Departure: {trip.time_of_departure}
        <br />Duration: {trip.duration}
            </ModalBody>
            <ModalFooter>              
              <Button colorScheme='red' mr={3} onClick={handleDelete}>
               Yes - Delete
              </Button>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
               No - Cancel 
              </Button>
              </ModalFooter>
          </ModalContent>
        </Modal>
      </>
  );
};

export default DeleteTrip 
