'use client'
import React from 'react'
import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 35.2347445,
  lng: 33.322884
};

function MyComponent({ location }: any) {
  const payload = location[0]?.payload
  const position = {
    lat: +payload?.lat,
    lng: +payload?.lng,
  };
  const onLoad = (marker: any) => {
  }
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyBJuXxmGpIbBHS8JFeuD4DRVm1I4EaOqzI"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}

      >
          <Marker
            position={position}
            onLoad={onLoad}
            icon={{
              url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
            }}
            // label={}
          />
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(MyComponent)