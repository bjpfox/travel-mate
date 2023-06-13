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

// import { eventNames } from "process"

  const itineraryMockData = [
      {
        "Title": "British Museum",
        "Description": "Take a walk around the British Museum",
        "Latitude": 51.5194,
        "Longitude": -0.1269,
        "Website": "https://www.britishmuseum.org/",
        "Category": "Museum"
      },
      {
        "Title": "Covent Museum",
        "Description": "Take a walk around the Covent Garden",
        "Latitude": 51.5129,
        "Longitude": -0.1227,
        "Website": "https://www.coventgarden.london/",
        "Category": "Shopping & Entertainment"
      },
      {
        "Title": "Tower of London",
        "Description": "Take a walk around the Tower of London",
        "Latitude": 51.5081,
        "Longitude": -0.0759,
        "Website": "https://www.hrp.org.uk/tower-of-london/",
        "Category": "Historic Site"
      },
      {
        "Title": "Tower Bridge",
        "Description": "Take a walk around Tower Bridge",
        "Latitude": 51.5055,
        "Longitude": -0.0754,
        "Website": "https://www.towerbridge.org.uk/",
        "Category": "Landmark"
      }
    ]

// Displays a list of trips (title, departure) so user can then, view, edit, or delete a specific trip
function ViewItinerary () {
    const [itinerary, setItinerary] = useState([])
    const [center, setMapCenter] = useState(null)
    const [trip, setTrips] = useState(null)

    const { id } = useParams()

    function addNewActivity() {
      console.log('clickedbtn')
      const newActivity = {
        "Title": "",
        "Description": "",
        "Latitude": 0,
        "Longitude": 0,
        "Website": "",
        "Category": ""
      }
      console.log('add',newActivity)
      console.log('to',itinerary)
      setItinerary([...itinerary, newActivity])
    }

    function saveChanges(event) {
      //event.preventDefault();
      console.log('saving changes')
      const sendPutItinRequest = async() => {
              // const json_result = {"json_result": itinerary }
              const requestBody = {
                "json_result": JSON.stringify(itinerary)
              };
              // console.log('itin will be: ', json_result)
              // console.log('body will be: ', JSON.stringify(json_result))
              const res = await fetch(`/api/itineraries/${id}`, {
                  method: "PUT",
                  headers: {
                    "Content-type": "application/json",
                  },
                  body: JSON.stringify(requestBody),
                  })
              console.log('res is: ', res)
          }
      sendPutItinRequest()
      //return navigate("/view-itine") 
          //return false
      }

    useEffect(() => {
      const fetchTrips = async() => {
        console.log('fetchingtrips')
          const res = await fetch(`../api/trips?id=${id}`)
          console.log('trips res',res)
          const data = await res.json()
          console.log('tripdata:',data)
          setTrips(data)
      }
      fetchTrips()
  }, [])

    useEffect(() => {
        const fetchItinerary = async() => {
            // TODO - connect up to db and fetch based on trip id
            const res = await fetch(`../api/itineraries/${id}`)
            console.log('url itenfetchis: ', `../api/itineraries/${id}`)
            console.log('res itenis: ', res)
            const data = await res.json()
            console.log('data is: ', data)
            console.log('json is: ', data[0]['json_result'])
            console.log('json is: ', JSON.parse(data[0]['json_result']))
            console.log('json type is: ', typeof data[0]['json_result'])
            console.log('json parsetypeis: ', typeof JSON.parse(data[0]['json_result']))
            let itineraryData = JSON.parse(data[0]['json_result'])
            //itineraryData.forEach((activity) => activity.key = activity["Description"])
            itineraryData = itineraryData.map((activity) => {
              // console.log(activity["Description"])
              return {...activity, 'key': activity["Description"]}
            })
            // setTrips(data)
            setItinerary(itineraryData)
            
            const center = getMapCenter(itineraryData)
            setMapCenter(center)
            //setItinerary(itineraryMockData)
        }
        fetchItinerary()
    }, [])
    return (
    // <Accordion allowMultiple>
    <>
      <Heading color={"#4D5264"}>{trip && trip.destination}</Heading>
      {/* <ItineraryMap></ItineraryMap> */}
        {
        //trips && console.log('trips:', trips) && trips.map(([trip_id, trip_destination, trip_time_of_departure, 
        // trip_duration, trip_activities, trip_budget, trip_additional_information, trip_created_on, trip_updated_on ]) => {
          //console.log('trips:', trips) && 
          // Ideally the code below could be made more DRY, unfort chakra ui doesnt pass event target only value
        itinerary && itinerary.map((activity, index) => {
              // const location = useLocation()
              // const{ id } = location.state
                return (
                  // Ideally we would have unique keys, this will still work but react will remount if title is changed
                  <Card backgroundColor={"#FCEE96"} key={activity["key"]} m={5} p={3}>
                    <CardBody backgroundColor={"#FCEE96"} p={5}>
                    {/* <AccordionItem key={activity["Location"]}> */}
                      <Grid h='200px' templateRows='repeat(7, 1fr)' templateColumns='repeat(4, 1fr)' gap={1}>

                      <GridItem rowSpan={1} colSpan={4} bg=''>
                      <Editable onChange={(newValue) => {
                        const newItinerary = itinerary.map((act, i) => i === index ? {...act, 'Title': newValue} : act)
                        setItinerary(newItinerary)
                        console.log(itinerary)
                      }} fontSize='xl' placeholder="Enter a title e.g. Hyde Park" defaultValue={activity["Title"]}>
                        <EditablePreview />
                        <EditableInput />
                        </Editable>
                      </GridItem>

                      <GridItem rowSpan={1} colSpan={4} bg=''>
                        <Editable onChange={(newValue) => {
                        const newItinerary = itinerary.map((act, i) => i === index ? {...act, 'Description': newValue} : act)
                        setItinerary(newItinerary)
                        console.log(itinerary)
                        }} placeholder="Enter a description, e.g. Take a stroll around Hyde Park" defaultValue={activity["Description"]}>
                        <EditablePreview />
                        <EditableInput />
                        </Editable>
                      </GridItem>
                   
                      <GridItem rowSpan={1} colSpan={4}  bg=''>
                        <Editable onChange={(newValue) => {
                        const newItinerary = itinerary.map((act, i) => i === index ? {...act, 'Website': newValue} : act)
                        setItinerary(newItinerary)
                        console.log(itinerary)
                        }} placeholder="Enter a website URL e.g. https://www.royalparks.org.uk/parks/hyde-park" defaultValue={activity["Website"]}>
                        <EditablePreview />
                        <EditableInput />
                        </Editable>
                      </GridItem>
                   
                        {/* <AccordionIcon/>
                        <AccordionButton/>
                        <AccordionPanel> */}
                   
                      <GridItem rowSpan={1} colSpan={4} bg=''>
                        <Editable onChange={(newValue) => {
                        const newItinerary = itinerary.map((act, i) => i === index ? {...act, 'Category': newValue} : act)
                        setItinerary(newItinerary)
                        console.log(itinerary)
                        }} placeholder="Enter a category e.g. Parks" defaultValue={activity["Category"]}>
                        <EditablePreview />
                        <EditableInput />
                        </Editable> 
                      </GridItem> 

                      <GridItem rowSpan={1} colSpan={2} bg=''>
                        <Editable  _before={{content: '"Longitude: "', display: 'inline-block', mr: '5px' }}  onChange={(newValue) => {
                        const newItinerary = itinerary.map((act, i) => i === index ? {...act, 'Longitude': newValue} : act)
                        setItinerary(newItinerary)
                        console.log(itinerary)
                        }} placeholder="Measured in degrees from North e.g. 51.25" defaultValue={activity["Longitude"]}>
                        <EditablePreview />
                        <EditableInput />
                        </Editable> 
                      </GridItem>

                      <GridItem rowSpan={1} colSpan={2} bg=''>
                        <Editable _before={{content: '"Latitude: "', display: 'inline-block', mr: '5px' }} onChange={(newValue) => {
                        const newItinerary = itinerary.map((act, i) => i === index ? {...act, 'Latitude': newValue} : act)
                        setItinerary(newItinerary)
                        console.log(itinerary)
                        }} placeholder="Measured in degrees from West e.g. -2.15" defaultValue={activity["Latitude"]}>
                        <EditablePreview />
                        <EditableInput />
                        </Editable>
                      </GridItem>

                      <GridItem rowSpan={1} colSpan={4} bg=''>
                        <Button backgroundColor={"#7EB6D7"} id={index} onClick={(event) => {
                        //const newItinerary = itinerary.filter((act, i) => i !== index )
                        const newItinerary = itinerary.filter((act, i) => i !== parseInt(event.currentTarget.id))
                        console.log('index:', index)
                        setItinerary(newItinerary)
                        console.log('itin is: ',itinerary)
                        }}>Delete activity</Button>
                      </GridItem>
                      </Grid>
                        {/* <Link to="/delete-trip/TODO"> Delete Activity</Link> |
                        <Link to="/view-itinerary/TODO"> Add new Activity</Link>   */}
                        {/* </AccordionPanel>
                    </AccordionItem> */}
                    </CardBody>
                    </Card>
                )
              })
        }
        {/* </Accordion> */}
        <Button backgroundColor={"#7EB6D7"} onClick={addNewActivity}>Add new activity</Button>
        <Button m={3} backgroundColor={"#7EB6D7"} onClick={saveChanges}>Save changes...</Button>
        <ItineraryMap center={center} itinerary={itinerary}></ItineraryMap>
      </>
       )
}



const packingList = {
        "Clothing": {
          "Thermal Tops": 6,
          "Long-Sleeve Tops": 6,
          "Sweaters": 4,
          "Thermal Bottoms": 6,
          "Pants/Jeans": 4,
          "Thermal Socks": 10,
          "Regular Socks": 10,
          "Underwear": 14,
          "Pajamas": 2,
          "Swimwear": 2, //(optional for indoor pools/spas),
          "Winter Coat": 1,
          "Hat": 1,
          "Gloves": 1,// pair,
          "Scarf": 1,
          "Boots": 1,// pair,
          "Shoes": 1,// pair
        },
        "Toiletries": {
          "Toothbrush": 1,
          "Toothpaste": 1,
          "Shampoo/Conditioner": 1,// (travel-sized),
          "Soap/Body Wash": 1,// (travel-sized),
          "Deodorant": 1,
          "Razor": 1,
          "Hairbrush/Comb": 1,
          "Hair Products": ["Gel", "Hairspray", "Hair ties/clips"],
          "Skincare Products": ["Moisturizer", "Lip balm"],
          "Makeup": ["Foundation", "Mascara"],
          "Nail Care": ["Nail clippers", "Nail file"]
        },
        "Electronics": {
          "Mobile Phone": 1,
          "Charger": 1,
          "Adapter/Converter": 1,
          "Camera": 1,
          "Extra Batteries": ["AA", "AAA"],
          "Portable Power Bank": 1
        },
        "Documents": {
          "Passport": 1,
          "Visa": 1,// (if required),
          "Travel Insurance": 1,
          "Driver's License": 1,
          "Credit/Debit Cards": ["Mastercard", "Visa"],
          "Cash": {
            "Currency": "Euros",
            "Amount": "Varies depending on personal preference and planned expenses"
          }
        },
        "Miscellaneous": {
          "Travel Guidebook": 1,
          "Maps/Navigation App": 1,
          "Reusable Water Bottle": 1,
          "Snacks": ["Granola bars", "Trail mix"],
          "Umbrella": 1,
          "Laundry Bag": 1,
          "Travel Locks": 2,
          "First Aid Kit": 1,
          "Medications": ["Prescription medications", "Pain relievers", "Cold medicine"],
          "Travel Pillow": 1,
          "Earplugs/Headphones": 1
        }
}
  


export default ViewItinerary 

