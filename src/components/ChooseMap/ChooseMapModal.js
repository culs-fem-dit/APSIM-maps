import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { fetchData, apiEndpoint } from '../../globalFunctions/api';

const useStyles = makeStyles(theme => ({
  dialog: {
    minWidth: '350px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: '95%'
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120
  },
  formControlLabel: {
    fontSize: 30
  },
  dialogTitle: {
    textAlign: 'center'
  }
}));

const ChooseMapModal = ({
  open,
  onOpenChange,
  selectMapQuery,
  onSetSelectMapQueryChange,
  onShowMapInformationChange
}) => {
  const classes = useStyles();

  const [soilType, setSoilType] = useState();
  const [variable, setVariable] = useState();
  const [scenario, setScenario] = useState();
  const [simulation, setSimulation] = useState();
  const [variableError, setVariableError] = useState(false);
  const [soilError, setSoilError] = useState(false);
  const [scenarioError, setScenarioError] = useState(false);
  const [simulationError, setSimulationError] = useState(false);
  const [soilList, setSoilList] = useState();
  const [scenarioList, setScenarioList] = useState();
  const [variableList, setVariableList] = useState();
  const [simulationList, setSimulationList] = useState();

  useEffect(() => {
    let isMounted = true;
    if (selectMapQuery) {
      setSoilType(selectMapQuery.soilType);
      setVariable({
        value: selectMapQuery.variable,
        name: selectMapQuery.label
      });
      setScenario({
        value: selectMapQuery.scenarioValue,
        name: selectMapQuery.scenarioName
      });
      setSimulation({
        value: selectMapQuery.simulationValue,
        name: selectMapQuery.simulationName
      });
    } else {
      setSoilType('');
      setVariable('');
      setScenario('');
      setSimulation('');
    }
    fetchData(`${apiEndpoint}/filters/soils?apiKey=testing`).then(
      fetchedData => {
        if (isMounted) {
          setSoilList(fetchedData);
        }
      }
    );
    fetchData(`${apiEndpoint}/filters/variables?apiKey=testing`).then(
      fetchedData => {
        if (isMounted) {
          setVariableList(fetchedData);
        }
      }
    );
    fetchData(`${apiEndpoint}/filters/scenarios?apiKey=testing`).then(
      fetchedData => {
        if (isMounted) {
          setScenarioList(fetchedData);
        }
      }
    );
    fetchData(`${apiEndpoint}/filters/simulations?apiKey=testing`).then(
      fetchedData => {
        if (isMounted) {
          setSimulationList(fetchedData);
        }
      }
    );
    return () => (isMounted = false);
  }, [selectMapQuery]);

  const handleClose = () => {
    onOpenChange(false);
  };

  const handleSubmit = () => {
    if (soilType && variable && scenario && simulation) {
      onSetSelectMapQueryChange({
        soilType: soilType,
        variable: variable.value,
        label: variable.name,
        scenarioName: scenario.name,
        scenarioValue: scenario.value,
        simulationName: simulation.name,
        simulationValue: simulation.value
      });
      onShowMapInformationChange(true);
      onOpenChange(false);
    } else {
      if (!soilType) {
        setSoilError(true);
      }
      if (!variable) {
        setVariableError(true);
      }
      if (!scenario) {
        setScenarioError(true);
      }
      if (!simulation) {
        setSimulationError(true);
      }
    }
  };

  const handleSoilChange = e => {
    setSoilType(e.target.value);
    setSoilError(false);
  };

  const handleVariableChange = e => {
    setVariable(e.target.value);
    setVariableError(false);
  };

  const handleScenarioChange = e => {
    setScenario(e.target.value);
    setScenarioError(false);
  };

  const handleSimulationChange = e => {
    setSimulation(e.target.value);
    setSimulationError(false);
  };

  const renderSimulations = () => {
    return simulationList.map((item, index) => (
      <MenuItem key={index} value={{ value: item.value, name: item.name }}>
        {item.name}
      </MenuItem>
    ));
  };

  const renderSoilTypes = () => {
    return soilList.map((item, index) => (
      <MenuItem key={index} value={{ value: item.value, name: item.name }}>
        {item.name}
      </MenuItem>
    ));
  };

  const renderVariables = () => {
    return variableList.map((item, index) => (
      <MenuItem key={index} value={{ value: item.value, name: item.name }}>
        {item.name}
      </MenuItem>
    ));
  };

  const renderScenarios = () => {
    return scenarioList.map((item, index) => (
      <MenuItem key={index} value={{ value: item.value, name: item.name }}>
        {item.name}
      </MenuItem>
    ));
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      classes={{ paperWidthXs: classes.dialog }}
      fullWidth={true}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
        Choose Map
      </DialogTitle>
      <DialogContent>
        <form className={classes.form} noValidate>
          <FormControl className={classes.formControl} error={simulationError}>
            <InputLabel htmlFor="simulation">Cultivar</InputLabel>
            <Select
              value={simulation}
              renderValue={() => simulation.name}
              onChange={handleSimulationChange}
              inputProps={{
                name: 'simulation',
                id: 'simulation'
              }}
            >
              {simulationList && renderSimulations()}
            </Select>
          </FormControl>
        </form>
        <form className={classes.form} noValidate>
          <FormControl className={classes.formControl} error={variableError}>
            <InputLabel htmlFor="variable">Variable</InputLabel>
            <Select
              value={variable}
              renderValue={() => variable.name}
              onChange={handleVariableChange}
              inputProps={{
                name: 'variable',
                id: 'variable'
              }}
            >
              {variableList && renderVariables()}
            </Select>
          </FormControl>
        </form>
        <form className={classes.form} noValidate>
          <FormControl className={classes.formControl} error={soilError}>
            <InputLabel htmlFor="soil-type">
              Soil Type (Depth; Water holding cap.)
            </InputLabel>
            <Select
              value={soilType}
              renderValue={() => soilType.name}
              onChange={handleSoilChange}
              inputProps={{
                name: 'soil-type',
                id: 'soil-type'
              }}
            >
              {soilList && renderSoilTypes()}
            </Select>
          </FormControl>
        </form>
        <form className={classes.form} noValidate>
          <FormControl className={classes.formControl} error={scenarioError}>
            <InputLabel htmlFor="scenario">Scenario</InputLabel>
            <Select
              value={scenario}
              renderValue={() => scenario.name}
              onChange={handleScenarioChange}
              inputProps={{
                name: 'scenario',
                id: 'scenario'
              }}
            >
              {scenarioList && renderScenarios()}
            </Select>
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChooseMapModal;
