import React, { useEffect, useState } from 'react';
import Square from './Square';
import MapMarker from './MapMarker';
import { fetchData, apiEndpoint } from '../../globalFunctions/api';

const MapContent = ({
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetchData(
      `${apiEndpoint}/values/?apiKey=testing&soil=${selectMapQuery.soilType.value}&scenario=${selectMapQuery.scenarioValue}&variable=${selectMapQuery.variable}&simulation=${selectMapQuery.simulationValue}`
    ).then(fetchedList => {
      if (isMounted) {
        if (fetchedList.extremes) {
          if (fetchedList.extremes.global) {
            onValueExtremesChange(fetchedList.extremes.global);
          }
        }
        if (fetchedList.criteria) {
          onCriteriaChange(fetchedList.criteria);
        }
        const listArray = fetchedList.squares.map(res => ({
          id: res.id,
          variable: fetchedList.variable,
          lat: res.lat,
          lng: res.lng,
          value: res.value,
          south: res.south,
          east: res.east,
          west: res.west,
          north: res.north
        }));
        onListChange(listArray);
        if (selectMapQuery.variable !== 'sowing_window') {
          setIsLoading(false);
        }
      }
    });
    if (selectMapQuery.variable === 'sowing_window') {
      fetchData(`${apiEndpoint}/filters/dates?apiKey=testing`).then(
        fetchedList => {
          if (isMounted) {
            onSowingDatesChange(fetchedList);
            setIsLoading(false);
          }
        }
      );
    }
    onSquareInfoChange();
    return () => (isMounted = false);
  }, [
    selectMapQuery,
    onListChange,
    onCriteriaChange,
    onSowingDatesChange,
    onSquareInfoChange,
    onValueExtremesChange
  ]);

  const renderSquare = () => {
    const squares = [];
    if (list) {
      for (let listItem of list) {
        squares.push(
          <Square
            listItem={listItem}
            key={listItem.id}
            valueExtremes={valueExtremes}
            criteria={criteria}
            showSquareInformation={showSquareInformation}
            onShowSquareInformationChange={onShowSquareInformationChange}
            squareInfo={squareInfo}
            onSquareInfoChange={onSquareInfoChange}
            sowingDates={sowingDates}
            onHideChange={onHideChange}
          />
        );
      }
    }
    return squares;
  };

  if (isLoading) {
    return <div>Loading</div>;
  } else {
    return (
      <div>
        {renderSquare()}
        <MapMarker
          squareInfo={squareInfo}
          showSquareInformation={showSquareInformation}
        />
      </div>
    );
  }
};

export default MapContent;
