import React from 'react';
import { withGoogleMap, GoogleMap, withScriptjs } from 'react-google-maps';
import MapContent from './MapContent';

const RenderMap = withScriptjs(
  withGoogleMap(
    ({
      selectMapQuery,
      valueExtremes,
      onValueExtremesChange,
      criteria,
      onCriteriaChange,
      showSquareInformation,
      onShowSquareInformationChange,
      squareInfo,
      onSquareInfoChange,
      list,
      onListChange,
      sowingDates,
      onSowingDatesChange,
      onHideChange
    }) => (
      <GoogleMap
        defaultCenter={{ lat: 17.75, lng: 78.25 }}
        defaultZoom={6}
        defaultOptions={{
          mapTypeControl: false,
          fullscreenControl: false,
          disableDoubleClickZoom: true,
          streetViewControl: false
        }}
      >
        {selectMapQuery && (
          <MapContent
            selectMapQuery={selectMapQuery}
            valueExtremes={valueExtremes}
            onValueExtremesChange={onValueExtremesChange}
            criteria={criteria}
            onCriteriaChange={onCriteriaChange}
            showSquareInformation={showSquareInformation}
            onShowSquareInformationChange={onShowSquareInformationChange}
            squareInfo={squareInfo}
            onSquareInfoChange={onSquareInfoChange}
            list={list}
            onListChange={onListChange}
            sowingDates={sowingDates}
            onSowingDatesChange={onSowingDatesChange}
            onHideChange={onHideChange}
          />
        )}
      </GoogleMap>
    )
  )
);
export default RenderMap;
