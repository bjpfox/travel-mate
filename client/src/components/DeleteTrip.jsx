import { useState } from "react";
import { Navigate, Link, redirect, useParams } from "react-router-dom"
import { useEffect } from "react";
import { Button, Modal, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, useDisclosure } from "@chakra-ui/react"

const DeleteTrip = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const id = props.tripId
  const { duration, destination, departure, trips, setTrips } = props
  const [trip, setFields] = useState( {} ) 

    useEffect(() => {
        const fetchTrips = async() => {
          try {
            const res = await fetch(`../api/trips?id=${id}`)
            //console.log('res: ', res)
            const data = await res.json()
            setFields(data)
            //console.log('data: ', data)
          } catch (error) {
            console.error(error)
          }
        }
        fetchTrips()
    }, [])

  function removeTrip() {
    const updatedTripsList = trips.filter((trip) => trip.id !== parseInt(id))
    setTrips(updatedTripsList)
  }

  const handleDelete = (event) => {
    event.preventDefault();
    const sendDeleteTripRequest = async() => {
            const res = await fetch(`/api/trips/${id}`, {
                method: "DELETE",
                headers: { "Content-type": "application/json", },
            })
        }
    sendDeleteTripRequest()
    removeTrip()
    onClose()
    }

  return (
    <>
      <Button m={3} backgroundColor={"#7EB6D7"} onClick={onOpen}>Delete trip</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
          <ModalContent backgroundColor={"#FCEE96"} >
            <ModalHeader>Delete Trip</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <h3>Are you sure you want to delete this trip?</h3>
        <br />Destination: {destination}
        <br />Departure: {departure}
        <br />Duration: {duration}
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
