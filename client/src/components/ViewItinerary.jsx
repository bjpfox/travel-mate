import { useEffect, useState } from "react"
import { Link, useLocation, useParams } from "react-router-dom"

import ItineraryMap from "./ItineraryMap"

import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Text,
  } from '@chakra-ui/react'

  import {
    Editable,
    EditableInput,
    EditableTextarea,
    EditablePreview,
    Card,
    CardBody,
    Heading
  } from '@chakra-ui/react'

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
    const [itinerary, setItinerary] = useState(null)
    const [trip, setTrips] = useState(null)

    const { id } = useParams()

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
            const itineraryData = JSON.parse(data[0]['json_result'] )
            // setTrips(data)
            setItinerary(itineraryData)
            //setItinerary(itineraryMockData)
        }
        fetchItinerary()
    }, [])
    return (
    // <Accordion allowMultiple>
    <>
      <ItineraryMap></ItineraryMap>Test.
      <Heading>{trip && trip.destination}</Heading>
      {/* <ItineraryMap></ItineraryMap> */}
        {
        //trips && console.log('trips:', trips) && trips.map(([trip_id, trip_destination, trip_time_of_departure, 
        // trip_duration, trip_activities, trip_budget, trip_additional_information, trip_created_on, trip_updated_on ]) => {
          //console.log('trips:', trips) && 
        itinerary && itinerary.map((activity) => {
              // const location = useLocation()
              // const{ id } = location.state
                return (
                  <Card>
                    <CardBody>
                    {/* <AccordionItem key={activity["Location"]}> */}
                        <Editable fontSize='xl' defaultValue={activity["Title"]}>
                        <EditablePreview />
                        <EditableInput />
                        </Editable>
                        <Editable defaultValue={activity["Description"]}>
                        <EditablePreview />
                        <EditableInput />
                        </Editable>
                        {/* <AccordionIcon/>
                        <AccordionButton/>
                        <AccordionPanel> */}
                        <Editable defaultValue={activity["Website"]}>
                        <EditablePreview />
                        <EditableInput />
                        </Editable>
                        <Editable defaultValue={activity["Category"]}>
                        <EditablePreview />
                        <EditableInput />
                        </Editable> 
                        
                        <Link to="/delete-trip/TODO"> Delete Activity</Link> |
                        <Link to="/view-itinerary/TODO"> Add new Activity</Link>  
                        {/* </AccordionPanel>
                    </AccordionItem> */}
                    </CardBody>
                    </Card>
                )
              })
        }
      {/* </Accordion> */}
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

