import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import LeftArrow from '@material-ui/icons/KeyboardArrowLeft';
import Grid from '@material-ui/core/Grid';

export const StyledAddMapButton = styled(Button)`
  && {
    background: #00ee10;
    opacity: 0.9;
    width: 80%;
    color: black;
  }
`;

export const StyledHideMapButton = styled(Button)`
  && {
    background: #c6c6c6;
    height: 14vh;
    min-height: 80px;
    transition-property: all !important;
    border: 0px solid black;
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
      0 3px 1px -2px rgba(0, 0, 0, 0.12);
    z-index: 1;
    opacity: 0.95;
    min-width: 0;
    &:focus {
      outline: none;
      background: #c6c6c6 !important;
    }
    &:active {
      box-shadow: inset 0 0 20px 11, 191, 251;
      transition: none;
      background: #c6c6c6 !important;
    }
    &:hover {
      background: #c6c6c6 !important;
    }
  }
`;

export const StyledArrow = styled(LeftArrow)`
  transition-property: all !important;
  transform: ${props => props.hidechange && 'rotate(180deg)'};
`;

export const StyledMapInformation = styled.div`
  border-radius: 0 0 4px 4px;
  background: #f9f9f9;
  opacity: 0.9;
  text-align: center;
  height: ${props => (props.shrink ? '33vh' : '78vh')};
  /* height: auto; */
  transition-property: ${props => (props.bottomMap ? 'none' : 'all')};
  transition-duration: 0.3s;
  border-top: none;
  position: relative;
  min-height: 260px;
  overflow: auto;
`;

export const MapGradientOpacity = styled.div`
  background: white;
  height: 4vh;
  width: 100%;
  line-height: 4vh;
`;

export const MapGradient = styled(Grid)`
  opacity: 1 !important;
  height: 100%;
  width: 100%;
  background: ${props => {
    if (props.criteriacolors === 'min') {
      return `linear-gradient(to right, rgba(0,255,0,0.8), rgba(255,255,0,0.8),rgba(255,0,0,0.8))`;
    } else if (props.criteriacolors === 'max') {
      return `linear-gradient(to left, rgba(0,255,0,0.8), rgba(255,255,0,0.8),rgba(255,0,0,0.8))`;
    } else if (props.criteriacolors === 'neither') {
      return `linear-gradient(to right, rgba(0,255,42, 0.8), rgba(0,255,255,0.8), rgba(43,0,255,0.8), rgba(255,0,255,0.8))`;
    } else {
      return 'transparent';
    }
  }};
`;

export const MapInformationText = styled.div`
  padding: 10px;
  overflow: auto;
`;

export const InfoHeading = styled.h1`
  font-size: 1rem;
`;

export const SquareInfoHeading = styled.h1`
  font-size: 1rem;
  margin: 0;
  margin-bottom: 5px;
`;
export const StyledSquareInformation = styled.div`
  margin-top: 15px;
  margin-bottom: 15px;
`;

export const StyledSowingItem = styled(Grid)`
  height: 4vh;
  line-height: 4vh;
`;

export const StyledSowingGrid = styled(Grid)``;
