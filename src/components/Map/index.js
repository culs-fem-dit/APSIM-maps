import React from 'react';
import RenderMap from './RenderMap';
import { StyledRenderMap, StyledGoogleMap } from './styles';

const Map = ({
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
}) => {
  return (
    <StyledRenderMap>
      <RenderMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyDOcXMQ7_UZ2wYjyM-R5F1Sx3oqv2XUaGg`}
        loadingElement={<StyledRenderMap />}
        containerElement={<StyledGoogleMap />}
        mapElement={<div style={{ height: `100%` }} />}
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
    </StyledRenderMap>
  );
};

export default Map;
