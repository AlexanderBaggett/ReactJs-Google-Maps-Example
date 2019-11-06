import React, { useState, useEffect } from "react";
import {Map, Marker, GoogleApiWrapper} from "google-maps-react";

const MapContainer = props=> {

  const defaultPosition = {
      lat: 39.91723,
      lng: -95.94704
    }
  const [center,setCenter] = useState(defaultPosition);
  const [markerPosition,setMarkerPosition] =useState();

  //set the initial center to be what comes in the props
  useEffect(() => {
    setCenter({
      lat: props.lat,
      lng: props.lng
    });
  },[]);

  //when the props change we only reposition the marker, not recenter
  useEffect(()=>{
    if(props.lng) {    
        setMarkerPosition({
          lat: props.lat,
          lng: props.lng
      });
    }
  },[props.lng,props.lat]);

  //a boolean prop to trigger recentering the map
  useEffect(()=>{
    if(props.lat){
    setCenter({
      lat: props.lat,
      lng: props.lng
    });
  }
  },[props.recenter])

  //move the marker when the map is clicked
  const onMapClick = (p, map, e) => {
      var {lat, lng} = e.latLng;
      props.onCoordUpdate(lat, lng);
      setMarkerPosition({
          lat: lat(),
          lng: lng()
      });
    }
  
  return(
    <div className='google-map' style={{width: 320, height: 300}}>
      <Map
        style={{borderRadius:'.25rem',width: '100%', height: '100%'}}
        google={props.google}
        zoom={14}
        center={center}
        initialCenter={center}
        onReady={() => { 
          if(props.lat==undefined ||props.lng ==undefined){
            //use a default position
            setMarkerPosition(defaultPosition);
          }}
        }
        onClick={(props,map,event) => onMapClick(props,map,event)}
        >
            <Marker
              name={"Current location"}
              position={markerPosition}
            />
      </Map>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: "Your API Key goes here"
})(MapContainer);