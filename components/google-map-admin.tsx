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

const mark = [{ lat: 37.7749, lng: -122.4194 },
{ lat: 37.3382, lng: -121.8863 },
]

const onLoad = (marker: any) => {
  // console.log('marker: ', marker)
}

function LocationAdmin({ location }: any) {
  // const [currentLocation, setCurrentLocation] = React.useState<any>(null)
  const payload = location.map((item: any) => item.payload)
  const currentLocation = location[0]?.payload
  console.log('[payload]', currentLocation)

  React.useEffect(() => {
    // Customize label color using Google Maps JavaScript API
    const setMarkerLabelColor = () => {
      const labels:any = document.getElementsByClassName('marker-label');

      for (let i = 0; i < labels.length; i++) {
        labels[i].style.color = 'red'; // Change label color here
      }
    };

    setMarkerLabelColor();
  }, []);

  const sortedMarkers = [...payload,currentLocation].filter(Boolean);

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyBJuXxmGpIbBHS8JFeuD4DRVm1I4EaOqzI"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}

      >
        { /* Child components, such as markers, info windows, etc. */}
        <>
        { location.map((item:{name:string,payload:{lat:number,lng:number}}, index:number) => (
          <Marker
            key={index}
            onLoad={onLoad}
            position={item?.payload}
            label={(index + 1).toString()}
          />
        ))}
          {currentLocation > 0 && (
          <Marker
            position={currentLocation}
            icon={{
              url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
            }}
            label={'Current Location'}
          />
        )}
         <Polyline
              path={sortedMarkers}
              options={{
                strokeColor: '#FF0000',
                strokeOpacity: 1,
                strokeWeight: 4,
              }}
            />
        </>
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(LocationAdmin)

