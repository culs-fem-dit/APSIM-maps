import React from 'react';
import { Marker } from 'react-google-maps';

const MapMarker = ({ squareInfo, showSquareInformation }) => {
  if (squareInfo && showSquareInformation) {
    return <Marker position={{ lat: squareInfo.lat, lng: squareInfo.lng }} />;
  } else {
    return <div></div>;
  }
};

export default MapMarker;
