import { useEffect, useState } from "react"
import { Link, useLocation, useParams } from "react-router-dom"
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Text,
  } from '@chakra-ui/react'

  const itineraryMockData = {
    "Day 1": [
      {
        "Location": "British Museum",
        "Latitude": 51.5194,
        "Longitude": -0.1269,
        "Website": "https://www.britishmuseum.org/",
        "Category": "Museum"
      },
      {
        "Location": "Covent Garden",
        "Latitude": 51.5129,
        "Longitude": -0.1227,
        "Website": "https://www.coventgarden.london/",
        "Category": "Shopping & Entertainment"
      },
      {
        "Location": "Tower of London",
        "Latitude": 51.5081,
        "Longitude": -0.0759,
        "Website": "https://www.hrp.org.uk/tower-of-london/",
        "Category": "Historic Site"
      },
      {
        "Location": "Tower Bridge",
        "Latitude": 51.5055,
        "Longitude": -0.0754,
        "Website": "https://www.towerbridge.org.uk/",
        "Category": "Landmark"
      }
    ],
    "Day 2": [
      {
        "Location": "Buckingham Palace",
        "Latitude": 51.5014,
        "Longitude": -0.1419,
        "Website": "https://www.royal.uk/buckingham-palace",
        "Category": "Historic Site"
      },
      {
        "Location": "Westminster Abbey",
        "Latitude": 51.4993,
        "Longitude": -0.1273,
        "Website": "https://www.westminster-abbey.org/",
        "Category": "Church"
      },
      {
        "Location": "Big Ben",
        "Latitude": 51.5007,
        "Longitude": -0.1246,
        "Website": "https://www.parliament.uk/bigben",
        "Category": "Landmark"
      },
      {
        "Location": "The London Eye",
        "Latitude": 51.5033,
        "Longitude": -0.1195,
        "Website": "https://www.londoneye.com/",
        "Category": "Observation Wheel"
      }
    ],
    "Day 3": [
      {
        "Location": "Natural History Museum",
        "Latitude": 51.4966,
        "Longitude": -0.1764,
        "Website": "https://www.nhm.ac.uk/",
        "Category": "Museum"
      },
      {
        "Location": "Kensington Palace",
        "Latitude": 51.5051,
        "Longitude": -0.1877,
        "Website": "https://www.hrp.org.uk/kensington-palace/",
        "Category": "Historic Site"
      },
      {
        "Location": "Hyde Park",
        "Latitude": 51.5074,
        "Longitude": -0.1657,
        "Website": "https://www.royalparks.org.uk/parks/hyde-park",
        "Category": "Park"
      },
      {
        "Location": "Piccadilly Circus",
        "Latitude": 51.5101,
        "Longitude": -0.1340,
        "Website": "https://www.london.gov.uk/about-us/our-building-and-squares/piccadilly-circus",
        "Category": "Landmark"
      }
    ]
}

// Displays a list of trips (title, departure) so user can then, view, edit, or delete a specific trip
function ViewItinerary () {
    const [itinerary, setItinerary] = useState(null)

    const { id } = useParams()

    useEffect(() => {
        const fetchItinerary = async() => {
            // TODO - connect up to db and fetch based on trip id
            // const res = await fetch(`./api/itineraries`)
            // const data = await res.json()
            // console.log(data)
            // setTrips(data)
            setItinerary(itineraryMockData)
        }
        fetchItinerary()
    }, [])
    return (<Accordion allowMultiple>My Saved Trips
        {
        //trips && console.log('trips:', trips) && trips.map(([trip_id, trip_destination, trip_time_of_departure, 
        // trip_duration, trip_activities, trip_budget, trip_additional_information, trip_created_on, trip_updated_on ]) => {
          //console.log('trips:', trips) && 
        itinerary && itinerary["Day 1"].map((activity) => {
              // const location = useLocation()
              // const{ id } = location.state
                return (
                    <AccordionItem key={activity["Location"]}>
                        {activity["Location"]}
                        <AccordionIcon/>
                        <AccordionButton/>
                        <AccordionPanel>
                        Website: <Text as="i">{activity["Website"]}</Text>
                        <br />Category: <Text as="i">{activity["Category"]}</Text>
                        <br /> <Link to={`/edit-trip/TODO}`}> Edit Activity</Link>  | 
                        <Link to="/delete-trip/TODO"> Delete Activity</Link> |
                        <Link to="/view-itinerary/TODO"> Add more activities</Link>  
                        </AccordionPanel>
                    </AccordionItem>
                )
              })
        }
       </Accordion>)
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

