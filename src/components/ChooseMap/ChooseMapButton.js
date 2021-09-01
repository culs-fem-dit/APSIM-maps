import React from 'react';
import { MapButton } from './styles';

const ChooseMapButton = ({
  onOpenChange,
  selectMapQuery,
  showMapInformation
}) => {
  const handleClickOpen = () => {
    onOpenChange(true);
  };

  return (
    <MapButton
      variant="contained"
      onClick={handleClickOpen}
      infotabopened={showMapInformation ? 1 : 0}
    >
      {selectMapQuery
        ? `${selectMapQuery.simulationName}, ${selectMapQuery.soilType.name}, ${selectMapQuery.label}, ${selectMapQuery.scenarioName} `
        : 'Choose Map'}
    </MapButton>
  );
};

export default ChooseMapButton;
