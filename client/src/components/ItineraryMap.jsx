import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: 3.745,
  lng: 38.523
};

function ItineraryMap() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDBmL34Al53829gza-X9ewSx_rxEhJEyQw"
  })

  const [mapItin, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(mapItin) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    mapItin.fitBounds(bounds);

    setMap(mapItin)
  }, [])

  const onUnmount = React.useCallback(function callback(mapItin) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
  ) : <></>
}

export default ItineraryMap

// export default React.memo(ItineraryMap)

//React.memo(MyComponent)