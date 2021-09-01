import React from 'react';
import Fade from '@material-ui/core/Fade';
import { StyledSquareInformation, SquareInfoHeading } from './styles';

const SquareInformation = ({
  showSquareInformation,
  squareInfo,
  selectMapQuery
}) => {
  const renderSquareValue = () => {
    if (selectMapQuery) {
      if (selectMapQuery.variable === 'sowing_window') {
        return <span>Sowing date: {squareInfo && squareInfo.value}</span>;
      } else if (selectMapQuery.variable === 'density_average') {
        return (
          <span>
            Value: {squareInfo && squareInfo.value} plants m<sup>-2</sup>
          </span>
        );
      } else if (selectMapQuery.variable === 'urea_average') {
        return (
          <span>
            Value: {squareInfo && `${squareInfo.value}-${squareInfo.value}`} kg
            ha<sup>-1</sup>
          </span>
        );
      } else {
        return <span>Value: {squareInfo && squareInfo.value}</span>;
      }
    }
  };
  return (
    <Fade in={showSquareInformation}>
      <StyledSquareInformation>
        <SquareInfoHeading>Square Information</SquareInfoHeading>
        ID: {squareInfo && squareInfo.id}
        <br />
        {renderSquareValue()}
      </StyledSquareInformation>
    </Fade>
  );
};

export default SquareInformation;
