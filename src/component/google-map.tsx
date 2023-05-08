'use client'


import React from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 35.2347445,
  lng: 33.322884
};



const onLoad = (marker: any) => {
  // console.log('marker: ', marker)
}

function MyComponent({ location }: any) {
  const payload = location[0]?.payload
  console.log(payload)
  const position = {
    lat: payload?.lat,
    lng: payload?.lng,
  }
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyB7cOlsmOT_ZFQq8t0OsR4OWHexPDbfhG8"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}

      >
        { /* Child components, such as markers, info windows, etc. */}
        <>
          <Marker
            onLoad={onLoad}
            position={position}
          />
        </>
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(MyComponent)


//


// user service
