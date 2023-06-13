import React from 'react'
import { GoogleMap, MarkerF, InfoWindow, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px'
};

function ItineraryMap(props) {
  const { itinerary, center } = props

  const labelStyles = {
    color: 'blue',
    fontSize: '16px',
    fontWeight: 'bold',
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyDBmL34Al53829gza-X9ewSx_rxEhJEyQw" >
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={3} >
        { /* Child components, such as markers, info windows, etc. go here */ }
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
        })}
            
     
        {/* InfoWindow not working correctly - appears to be an issue with the library}
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

