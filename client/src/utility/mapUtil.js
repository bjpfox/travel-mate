export function getMapCenter(itinerary) {
    let minLat = itinerary[0]["Latitude"]
    let maxLat = itinerary[0]["Latitude"]
    let minLng = itinerary[0]["Longitude"]
    let maxLng = itinerary[0]["Longitude"]
    itinerary.forEach((location) => {
      minLat = location["Latitude"] < minLat ? location["Latitude"] : minLat 
      maxLat = location["Latitude"] > minLat ? location["Latitude"] : maxLat 
      minLng = location["Longitude"] < minLng ? location["Longitude"] : minLng 
      maxLng = location["Longitude"] > maxLng ? location["Longitude"] : maxLng 
    })
    const height = Math.abs(minLat-maxLat)
    const centerLat = minLat + (height/2)
    const width = Math.abs(minLng-maxLng)
    const centerLng = minLng + (width/2)
    const center = {
      "lat": centerLat,
      "lng": centerLng
    }
    console.log('minlat',minLat)
    console.log('maxlat',maxLat)
    console.log('minlng',minLng)
    console.log('maxlng',maxLng)
    console.log('center',center)
    return center
  }

