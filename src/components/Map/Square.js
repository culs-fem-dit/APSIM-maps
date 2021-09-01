import React, { useState, useEffect } from 'react';
import { Rectangle } from 'react-google-maps';
import { calcHue } from '../../globalFunctions';

const Square = ({
  listItem,
  valueExtremes,
  criteria,
  showSquareInformation,
  onShowSquareInformationChange,
  squareInfo,
  onSquareInfoChange,
  sowingDates,
  onHideChange
}) => {
  const [isLoading, setLoading] = useState(true);
  const [squareHover, setSquareHover] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, []);

  const setColor = () => {
    let color = 'black';
    if (listItem.variable === 'sowing_window') {
      if (sowingDates) {
        return (color =
          'hsl(' + calcHue(sowingDates, listItem.value) + ', 100%, 50%)');
      }
    } else {
      if (valueExtremes) {
        let startHue;
        let endHue;
        if (criteria === 'min') {
          startHue = 120;
          endHue = 0;
        } else if (criteria === 'max') {
          startHue = 0;
          endHue = 120;
        } else {
          startHue = 130;
          endHue = 300;
        }
        const maxValue = valueExtremes.max;
        const minValue = valueExtremes.min;
        const value = listItem.value;
        // const percentage = value / maxValue;
        const percentage =
          ((value - minValue) * 100) / (maxValue - minValue) / 100;
        const hue = percentage * (endHue - startHue) + startHue;
        color = 'hsl(' + hue + ', 100%, 50%)';
        if (squareHover) {
          return 'white';
        } else {
          return color;
        }
      }
    }
    return color;
  };

  const addValueText = (text, value) => {
    return `${text}(${value})`;
  };

  const editVigour = item => {
    if (item.value >= 2.4 && item.value < 2.6) {
      const editedItem = { ...item, value: addValueText('Low ', item.value) };
      return editedItem;
    } else if (item.value >= 2.6 && item.value < 2.8) {
      const editedItem = {
        ...item,
        value: addValueText('Medium ', item.value)
      };
      return editedItem;
    } else if (item.value >= 2.8 && item.value < 3) {
      const editedItem = { ...item, value: addValueText('High ', item.value) };
      return editedItem;
    } else if (item.value >= 3) {
      const editedItem = {
        ...item,
        value: addValueText('Very high ', item.value)
      };
      return editedItem;
    } else {
      const editedItem = {
        ...item,
        value: addValueText('Unassigned', item.value)
      };
      return editedItem;
    }
  };

  const editDurationOfCultivars = item => {
    if (item.value >= 150 && item.value < 200) {
      const editedItem = {
        ...item,
        value: addValueText('Very Early ', item.value)
      };
      return editedItem;
    } else if (item.value >= 200 && item.value < 250) {
      const editedItem = {
        ...item,
        value: addValueText('Early ', item.value)
      };
      return editedItem;
    } else if (item.value >= 250 && item.value < 300) {
      const editedItem = {
        ...item,
        value: addValueText('Medium ', item.value)
      };
      return editedItem;
    } else if (item.value >= 300) {
      const editedItem = {
        ...item,
        value: addValueText('Late ', item.value)
      };
      return editedItem;
    } else {
    }
  };

  const editTranspirationResponsiveness = item => {
    if (item.value === 0.85) {
      const editedItem = {
        ...item,
        value: addValueText('High ', item.value)
      };
      return editedItem;
    } else if (item.value === 0.95) {
      const editedItem = {
        ...item,
        value: addValueText('Low ', item.value)
      };
      return editedItem;
    }
  };

  const renderSquareInfo = () => {
    onHideChange(false);
    if (listItem.variable === 'canopy_average') {
      const item = editVigour(listItem);
      onSquareInfoChange(item);
    } else if (listItem.variable === 'endjuv_average') {
      const item = editDurationOfCultivars(listItem);
      onSquareInfoChange(item);
    } else if (listItem.variable === 'responsiveness') {
      const item = editTranspirationResponsiveness(listItem);
      onSquareInfoChange(item);
    } else {
      onSquareInfoChange(listItem);
    }
    onShowSquareInformationChange(true);
    if (listItem === squareInfo && showSquareInformation) {
      onShowSquareInformationChange(false);
    }
  };

  if (isLoading) {
    return <div>Loading</div>;
  } else {
    return (
      <Rectangle
        options={{
          fillColor: setColor(),
          strokeColor: 'grey',
          strokeWeight: '1',
          fillOpacity: 0.5
        }}
        bounds={{
          north: parseFloat(listItem.north),
          south: parseFloat(listItem.south),
          east: parseFloat(listItem.east),
          west: parseFloat(listItem.west)
        }}
        onMouseOver={() => setSquareHover(true)}
        onMouseOut={() => setSquareHover(false)}
        onClick={renderSquareInfo}
      />
    );
  }
};

export default Square;
