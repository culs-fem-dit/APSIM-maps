import React, { useState } from 'react';
import Map from '../Map';
import { makeStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import Collapse from '@material-ui/core/Collapse';
import ChooseMap from '../ChooseMap';
import MapInformation from '../MapInformation';
import HideMapButton from '../MapInformation/HideMapButton';
import {
  StyledMap,
  SecondStyledMap,
  Authors,
  AuthorsLink,
  StyledQuestionMark,
  InfoLink
} from './styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 0,
    /*  marginTop: 30,
    marginLeft: 5, */
    minHeight: '100vh',
    paddingTop: '30px',
    paddingLeft: '5px',
    paddingBottom: '5px',
    height: '100%',
    position: 'relative'
  },
  mapButton: {
    minHeight: '14vh',
    textAlign: 'left',
    borderRadius: '4px'
    /* minHeight: '80px' */
  },
  infoTabOverlay: {
    height: '100%',
    width: '100%',
    zIndex: 1,
    transitionTimingFunction: 'ease-in-out !important'
  },
  infoTabContainer: {
    width: '24vw',
    minWidth: '350px',
    borderRadius: '5px'
  },
  infoTabShadow: {
    boxShadow:
      '0 1px 5px 0 rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12)',
    borderRadius: '4px'
  }
}));

const App = () => {
  const classes = useStyles();
  const [selectMapQuery, setSelectMapQuery] = useState();
  const [secondSelectMapQuery, setSecondSelectMapQuery] = useState();
  const [showMapInformation, setShowMapInformation] = useState(false);
  const [valueExtremes, setValueExtremes] = useState();
  const [secondValueExtremes, setSecondValueExtremes] = useState();
  const [criteria, setCriteria] = useState();
  const [secondCriteria, setSecondCriteria] = useState();
  const [showSquareInformation, setShowSquareInformation] = useState(false);
  const [
    showSecondSquareInformation,
    setShowSecondSquareInformation
  ] = useState(false);
  const [squareInfo, setSquareInfo] = useState();
  const [secondSquareInfo, setSecondSquareInfo] = useState();
  const [renderFirstMap, setRenderFirstMap] = useState(true);
  const [renderSecondMap, setRenderSecondMap] = useState(false);
  const [hide, setHide] = useState(false);
  const [firstList, setFirstList] = useState();
  const [secondList, setSecondList] = useState();
  const [firstSowingDates, setFirstSowingDates] = useState();
  const [secondSowingDates, setSecondSowingDates] = useState();

  return (
    <div className={classes.root}>
      <InfoLink target="_blank" title="tutorial icon" href="tutorial.pdf">
        <StyledQuestionMark />
      </InfoLink>
      <Authors>
        Developed by
        <AuthorsLink
          target="_blank"
          title="Author's website link"
          href="https://kit.pef.czu.cz/en/"
        >
          DIT FEM CULS
        </AuthorsLink>
        <br />
        Testing version
      </Authors>
      <Slide direction="right" in={renderFirstMap} mountOnEnter unmountOnExit>
        <StyledMap size={renderSecondMap ? 1 : 0}>
          <Map
            selectMapQuery={selectMapQuery}
            valueExtremes={valueExtremes}
            onValueExtremesChange={setValueExtremes}
            criteria={criteria}
            onCriteriaChange={setCriteria}
            showSquareInformation={showSquareInformation}
            onShowSquareInformationChange={setShowSquareInformation}
            squareInfo={squareInfo}
            onSquareInfoChange={setSquareInfo}
            list={firstList}
            onListChange={setFirstList}
            sowingDates={firstSowingDates}
            onSowingDatesChange={setFirstSowingDates}
            onHideChange={setHide}
          />
        </StyledMap>
      </Slide>
      <Grid container className={classes.infoTabContainer} spacing={0}>
        <Slide direction="down" in={renderFirstMap} mountOnEnter unmountOnExit>
          <Slide direction="right" in={!hide} mountOnEnter unmountOnExit>
            <Grid className={classes.infoTabOverlay} item xs={10}>
              <Grid container className={classes.infoTabShadow} spacing={0}>
                <Grid className={classes.mapButton} item xs={12}>
                  <ChooseMap
                    selectMapQuery={selectMapQuery}
                    onSetSelectMapQueryChange={setSelectMapQuery}
                    onShowMapInformationChange={setShowMapInformation}
                    showMapInformation={showMapInformation}
                    onShowSquareInformationChange={setShowSquareInformation}
                    onRenderMapChange={setRenderFirstMap}
                    secondMapExists={renderSecondMap}
                    onValueExtremesChange={setValueExtremes}
                    onCriteriaChange={setCriteria}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Collapse in={showMapInformation} timeout="auto">
                    <MapInformation
                      showMapInformation={showMapInformation}
                      valueExtremes={valueExtremes}
                      criteria={criteria}
                      showSquareInformation={showSquareInformation}
                      squareInfo={squareInfo}
                      renderSecondMap={renderSecondMap}
                      onRenderSecondMapChange={setRenderSecondMap}
                      selectMapQuery={selectMapQuery}
                      sowingDates={firstSowingDates}
                    />
                  </Collapse>
                </Grid>
              </Grid>
            </Grid>
          </Slide>
        </Slide>
        {renderFirstMap && showMapInformation && (
          <Grid item xs={2}>
            <HideMapButton
              hide={hide}
              onHideChange={setHide}
              onShowMapInformationChange={setShowMapInformation}
            />
          </Grid>
        )}
      </Grid>
      <Slide direction="left" in={renderSecondMap} mountOnEnter unmountOnExit>
        <SecondStyledMap size={renderFirstMap ? 1 : 0}>
          <Map
            selectMapQuery={secondSelectMapQuery}
            valueExtremes={secondValueExtremes}
            onValueExtremesChange={setSecondValueExtremes}
            criteria={secondCriteria}
            onCriteriaChange={setSecondCriteria}
            showSquareInformation={showSecondSquareInformation}
            onShowSquareInformationChange={setShowSecondSquareInformation}
            squareInfo={secondSquareInfo}
            onSquareInfoChange={setSecondSquareInfo}
            list={secondList}
            onListChange={setSecondList}
            sowingDates={secondSowingDates}
            onSowingDatesChange={setSecondSowingDates}
            onHideChange={setHide}
          />
        </SecondStyledMap>
      </Slide>
      <Grid container className={classes.infoTabContainer} spacing={0}>
        <Slide direction="up" in={renderSecondMap} mountOnEnter unmountOnExit>
          <Slide direction="right" in={!hide} mountOnEnter unmountOnExit>
            <Grid className={classes.infoTabOverlay} item xs={10}>
              <Grid container className={classes.infoTabShadow} spacing={0}>
                <Grid className={classes.mapButton} item xs={12}>
                  <ChooseMap
                    selectMapQuery={secondSelectMapQuery}
                    onSetSelectMapQueryChange={setSecondSelectMapQuery}
                    onShowMapInformationChange={setShowMapInformation}
                    showMapInformation={showMapInformation}
                    onShowSquareInformationChange={
                      setShowSecondSquareInformation
                    }
                    onRenderMapChange={setRenderSecondMap}
                    secondMapExists={renderFirstMap}
                    valueExtremes={secondValueExtremes}
                    onValueExtremesChange={setSecondValueExtremes}
                    onCriteriaChange={setSecondCriteria}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Collapse in={showMapInformation} timeout="auto">
                    <MapInformation
                      showMapInformation={showMapInformation}
                      valueExtremes={secondValueExtremes}
                      criteria={secondCriteria}
                      showSquareInformation={showSecondSquareInformation}
                      squareInfo={secondSquareInfo}
                      renderSecondMap={renderFirstMap}
                      onRenderSecondMapChange={setRenderFirstMap}
                      bottomMap={renderSecondMap}
                      selectMapQuery={secondSelectMapQuery}
                      sowingDates={secondSowingDates}
                    />
                  </Collapse>
                </Grid>
              </Grid>
            </Grid>
          </Slide>
        </Slide>
        {renderSecondMap && showMapInformation && !renderFirstMap && (
          <Grid item xs={2}>
            <HideMapButton
              hide={hide}
              onHideChange={setHide}
              onShowMapInformationChange={setShowMapInformation}
            />
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default App;
