import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import SquareInformation from './SquareInformation';
import AddMapButton from './AddMapButton';
import {
  StyledMapInformation,
  MapInformationText,
  InfoHeading,
  MapGradient,
  MapGradientOpacity,
  StyledSowingItem,
  StyledSowingGrid
} from './styles';
import { calcHue } from '../../globalFunctions';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  left: {
    textAlign: 'left',
    paddingLeft: 5
  },
  right: {
    textAlign: 'right',
    paddingRight: 5
  }
}));

const MapInformation = ({
  valueExtremes,
  criteria,
  showSquareInformation,
  squareInfo,
  renderSecondMap,
  onRenderSecondMapChange,
  bottomMap,
  selectMapQuery,
  sowingDates
}) => {
  const classes = useStyles();

  const renderSowingStyle = item => {
    return {
      background: 'hsl(' + calcHue(sowingDates, item) + ', 100%, 50%)',
      opacity: 0.7
    };
  };
  const renderMapInfo = () => {
    if (selectMapQuery.variable === 'sowing_window') {
      if (sowingDates) {
        return (
          <StyledSowingGrid container spacing={0} shrink={renderSecondMap}>
            {sowingDates.map((item, index) => (
              <Fragment key={index}>
                <StyledSowingItem
                  item
                  xs={4}
                  style={renderSowingStyle(item)}
                ></StyledSowingItem>
                <StyledSowingItem item xs={8}>
                  {item}
                </StyledSowingItem>
              </Fragment>
            ))}
          </StyledSowingGrid>
        );
      }
    } else {
      if (valueExtremes) {
        return (
          <Fragment>
            <InfoHeading>Color Scale</InfoHeading>
            <MapGradientOpacity>
              <MapGradient container spacing={0} criteriacolors={criteria}>
                <Grid item xs={6} className={classes.left}>
                  {valueExtremes &&
                    `min: ${Math.round(valueExtremes.min * 100) / 100}`}
                </Grid>
                <Grid item xs={6} className={classes.right}>
                  {valueExtremes &&
                    `max:${Math.round(valueExtremes.max * 100) / 100}`}
                </Grid>
              </MapGradient>
            </MapGradientOpacity>
          </Fragment>
        );
      }
    }
  };
  return (
    <StyledMapInformation shrink={renderSecondMap} bottomMap={bottomMap}>
      <MapInformationText>
        {selectMapQuery && renderMapInfo()}
        {squareInfo && (
          <SquareInformation
            showSquareInformation={showSquareInformation}
            squareInfo={squareInfo}
            selectMapQuery={selectMapQuery}
          />
        )}
        {!renderSecondMap && (
          <AddMapButton onRenderSecondMapChange={onRenderSecondMapChange} />
        )}
      </MapInformationText>
    </StyledMapInformation>
  );
};

export default MapInformation;
