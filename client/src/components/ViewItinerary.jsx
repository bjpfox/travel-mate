import { useEffect, useState } from "react"
import { Link, useLocation, useParams } from "react-router-dom"

import ItineraryMap from "./ItineraryMap"
import { getMapCenter } from '../utility/mapUtil.js';


import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Text
  } from '@chakra-ui/react'

  import {
    Button,
    Editable,
    EditableInput,
    EditableTextarea,
    EditablePreview,
    Card,
    CardBody,
    Heading,
    FormLabel,
    Grid,
    GridItem
  } from '@chakra-ui/react'



// Displays a list of trips (title, departure) so user can then, view, edit, or delete a specific trip
function ViewItinerary () {
    const [itinerary, setItinerary] = useState([])
    const [center, setMapCenter] = useState(null)
    const [trip, setTrips] = useState(null)

    const { id } = useParams()

    function addNewActivity() {
      const newActivity = {
        "Title": "",
        "Description": "",
        "Latitude": 0,
        "Longitude": 0,
        "Website": "",
        "Category": ""
      }
      setItinerary([...itinerary, newActivity])
    }

    function saveChanges(event) {
      const sendPutItinRequest = async() => {
              const requestBody = {
                "json_result": JSON.stringify(itinerary)
              };
              const res = await fetch(`/api/itineraries/${id}`, {
                  method: "PUT",
                  headers: {
                    "Content-type": "application/json",
                  },
                  body: JSON.stringify(requestBody),
                  })
          }
      sendPutItinRequest()
      }

    useEffect(() => {
      const fetchTrips = async() => {
          const res = await fetch(`../api/trips?id=${id}`)
          const data = await res.json()
          setTrips(data)
      }
      fetchTrips()
  }, [])

    useEffect(() => {
        const fetchItinerary = async() => {
            const res = await fetch(`../api/itineraries/${id}`)
            const data = await res.json()
            let itineraryData = JSON.parse(data[0]['json_result'])
            itineraryData = itineraryData.map((activity) => {
              return {...activity, 'key': activity["Description"]}
            })
            setItinerary(itineraryData)
            
            const center = getMapCenter(itineraryData)
            setMapCenter(center)
        }
        fetchItinerary()
    }, [])
    return (
    <>
      <Heading color={"#4D5264"}>{trip && trip.destination}</Heading>
        {
          // Ideally the code below could be made more DRY, unfort chakra ui doesnt pass event target only value
        itinerary && itinerary.map((activity, index) => {
                return (
                  <Card backgroundColor={"#FCEE96"} key={activity["key"]} m={5} p={3}>
                    <CardBody backgroundColor={"#FCEE96"} p={5}>
                      <Grid h='200px' templateRows='repeat(7, 1fr)' templateColumns='repeat(4, 1fr)' gap={1}>

                      <GridItem rowSpan={1} colSpan={4} bg=''>
                      <Editable onChange={(newValue) => {
                        const newItinerary = itinerary.map((act, i) => i === index ? {...act, 'Title': newValue} : act)
                        setItinerary(newItinerary)
                      }} fontSize='xl' placeholder="Enter a title e.g. Hyde Park" defaultValue={activity["Title"]}>
                        <EditablePreview />
                        <EditableInput />
                        </Editable>
                      </GridItem>

                      <GridItem rowSpan={1} colSpan={4} bg=''>
                        <Editable onChange={(newValue) => {
                        const newItinerary = itinerary.map((act, i) => i === index ? {...act, 'Description': newValue} : act)
                        setItinerary(newItinerary)
                        }} placeholder="Enter a description, e.g. Take a stroll around Hyde Park" defaultValue={activity["Description"]}>
                        <EditablePreview />
                        <EditableInput />
                        </Editable>
                      </GridItem>
                   
                      <GridItem rowSpan={1} colSpan={4}  bg=''>
                        <Editable onChange={(newValue) => {
                        const newItinerary = itinerary.map((act, i) => i === index ? {...act, 'Website': newValue} : act)
                        setItinerary(newItinerary)
                        }} placeholder="Enter a website URL e.g. https://www.royalparks.org.uk/parks/hyde-park" defaultValue={activity["Website"]}>
                        <EditablePreview />
                        <EditableInput />
                        </Editable>
                      </GridItem>
                   
                      <GridItem rowSpan={1} colSpan={4} bg=''>
                        <Editable onChange={(newValue) => {
                        const newItinerary = itinerary.map((act, i) => i === index ? {...act, 'Category': newValue} : act)
                        setItinerary(newItinerary)
                        }} placeholder="Enter a category e.g. Parks" defaultValue={activity["Category"]}>
                        <EditablePreview />
                        <EditableInput />
                        </Editable> 
                      </GridItem> 

                      <GridItem rowSpan={1} colSpan={2} bg=''>
                        <Editable  _before={{content: '"Longitude: "', display: 'inline-block', mr: '5px' }}  onChange={(newValue) => {
                        const newItinerary = itinerary.map((act, i) => i === index ? {...act, 'Longitude': newValue} : act)
                        setItinerary(newItinerary)
                        }} placeholder="Measured in degrees from North e.g. 51.25" defaultValue={activity["Longitude"]}>
                        <EditablePreview />
                        <EditableInput />
                        </Editable> 
                      </GridItem>

                      <GridItem rowSpan={1} colSpan={2} bg=''>
                        <Editable _before={{content: '"Latitude: "', display: 'inline-block', mr: '5px' }} onChange={(newValue) => {
                        const newItinerary = itinerary.map((act, i) => i === index ? {...act, 'Latitude': newValue} : act)
                        setItinerary(newItinerary)
                        }} placeholder="Measured in degrees from West e.g. -2.15" defaultValue={activity["Latitude"]}>
                        <EditablePreview />
                        <EditableInput />
                        </Editable>
                      </GridItem>

                      <GridItem rowSpan={1} colSpan={4} bg=''>
                        <Button backgroundColor={"#7EB6D7"} id={index} onClick={(event) => {
                        const newItinerary = itinerary.filter((act, i) => i !== parseInt(event.currentTarget.id))
                        setItinerary(newItinerary)
                        }}>Delete activity</Button>
                      </GridItem>
                      </Grid>
                    </CardBody>
                    </Card>
                )
              })
        }
        <Button backgroundColor={"#7EB6D7"} onClick={addNewActivity}>Add new activity</Button>
        <Button m={3} backgroundColor={"#7EB6D7"} onClick={saveChanges}>Save changes...</Button>
        <ItineraryMap center={center} itinerary={itinerary}></ItineraryMap>
      </>
       )
}

// const itineraryMockData = [
//   {
//     "Title": "British Museum",
//     "Description": "Take a walk around the British Museum",
//     "Latitude": 51.5194,
//     "Longitude": -0.1269,
//     "Website": "https://www.britishmuseum.org/",
//     "Category": "Museum"
//   },
//   {
//     "Title": "Covent Museum",
//     "Description": "Take a walk around the Covent Garden",
//     "Latitude": 51.5129,
//     "Longitude": -0.1227,
//     "Website": "https://www.coventgarden.london/",
//     "Category": "Shopping & Entertainment"
//   },
//   {
//     "Title": "Tower of London",
//     "Description": "Take a walk around the Tower of London",
//     "Latitude": 51.5081,
//     "Longitude": -0.0759,
//     "Website": "https://www.hrp.org.uk/tower-of-london/",
//     "Category": "Historic Site"
//   },
//   {
//     "Title": "Tower Bridge",
//     "Description": "Take a walk around Tower Bridge",
//     "Latitude": 51.5055,
//     "Longitude": -0.0754,
//     "Website": "https://www.towerbridge.org.uk/",
//     "Category": "Landmark"
//   }
// ]

// const packingList = {
//         "Clothing": {
//           "Thermal Tops": 6,
//           "Long-Sleeve Tops": 6,
//           "Sweaters": 4,
//           "Thermal Bottoms": 6,
//           "Pants/Jeans": 4,
//           "Thermal Socks": 10,
//           "Regular Socks": 10,
//           "Underwear": 14,
//           "Pajamas": 2,
//           "Swimwear": 2, //(optional for indoor pools/spas),
//           "Winter Coat": 1,
//           "Hat": 1,
//           "Gloves": 1,// pair,
//           "Scarf": 1,
//           "Boots": 1,// pair,
//           "Shoes": 1,// pair
//         },
//         "Toiletries": {
//           "Toothbrush": 1,
//           "Toothpaste": 1,
//           "Shampoo/Conditioner": 1,// (travel-sized),
//           "Soap/Body Wash": 1,// (travel-sized),
//           "Deodorant": 1,
//           "Razor": 1,
//           "Hairbrush/Comb": 1,
//           "Hair Products": ["Gel", "Hairspray", "Hair ties/clips"],
//           "Skincare Products": ["Moisturizer", "Lip balm"],
//           "Makeup": ["Foundation", "Mascara"],
//           "Nail Care": ["Nail clippers", "Nail file"]
//         },
//         "Electronics": {
//           "Mobile Phone": 1,
//           "Charger": 1,
//           "Adapter/Converter": 1,
//           "Camera": 1,
//           "Extra Batteries": ["AA", "AAA"],
//           "Portable Power Bank": 1
//         },
//         "Documents": {
//           "Passport": 1,
//           "Visa": 1,// (if required),
//           "Travel Insurance": 1,
//           "Driver's License": 1,
//           "Credit/Debit Cards": ["Mastercard", "Visa"],
//           "Cash": {
//             "Currency": "Euros",
//             "Amount": "Varies depending on personal preference and planned expenses"
//           }
//         },
//         "Miscellaneous": {
//           "Travel Guidebook": 1,
//           "Maps/Navigation App": 1,
//           "Reusable Water Bottle": 1,
//           "Snacks": ["Granola bars", "Trail mix"],
//           "Umbrella": 1,
//           "Laundry Bag": 1,
//           "Travel Locks": 2,
//           "First Aid Kit": 1,
//           "Medications": ["Prescription medications", "Pain relievers", "Cold medicine"],
//           "Travel Pillow": 1,
//           "Earplugs/Headphones": 1
//         }
// }
  


export default ViewItinerary 

