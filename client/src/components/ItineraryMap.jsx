import React from 'react'
import { GoogleMap, MarkerF, InfoWindow, LoadScript } from '@react-google-maps/api';




const containerStyle = {
  width: '400px',
  height: '400px'
};

// const center = {
//   lat: 51.5194,
//   lng: -0.1269
// };

const position = {
  lat: 51.5194,
  lng: -0.1269
}

const position2 = {
  lat: 51.52,
  lng: -0.13
}


// const center = {
//   lat: -3.745,
//   lng: -38.523
// };

// const position = {
//   lat: -3.745,
//   lng: -38.523
// };

function ItineraryMap(props) {
  const { itinerary, center } = props

  // if (itinerary) {
  //   console.log('itin isnow',itinerary)
  //   const center = getMapCenter(itinerary)
  //   console.log('center is', center)
  // }

  const labelStyles = {
    color: 'blue',
    fontSize: '16px',
    fontWeight: 'bold',
    // backgroundColor: 'yellow'
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyDBmL34Al53829gza-X9ewSx_rxEhJEyQw" >
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10} >
        { /* Child components, such as markers, info windows, etc. */ }
        {itinerary && itinerary.map((activity) => {
          const coordinates = {
            lat: (activity["Latitude"]),
            lng: (activity["Longitude"])
          }
          console.log('coor',coordinates)
          return (<MarkerF label={{
            text: activity["Title"],
            ...labelStyles,
          }} position={coordinates} />)
          //return (<MarkerF label={activity["Title"]} position={coordinates} />)
        })}
            
     
        {/* <Marker position={position} label="test" /> */}
        {/* <InfoWindow position={position2} >
          <div>
          <h1>InfoWindow</h1>
          blah
          <br>blahblah</br>
          </div>
        </InfoWindow> */}
        <></>
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(ItineraryMap)

//export default ItineraryMap
