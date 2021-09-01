import styled from 'styled-components';
import Button from '@material-ui/core/Button';

export const MapButton = styled(Button)`
  && {
    height: 100%;
    width: 100%;
    font-family: Arial;
    background: ${props => (props.infotabopened ? '#E7E7E7' : 'white')};
    border-radius: ${props => (props.infotabopened ? '4px 0 0 0' : '4px')};
    display: inline-block;
    font-weight: bold;
    opacity: 0.95;
    box-shadow: none;
    padding: 5px;
    line-height: fill;
    color: black;
    font-size: 0.77rem;
    @media (max-width: 1250px) {
      font-size: 0.75rem;
    }
    @media (max-width: 768px) {
      font-size: 0.6rem;
    }
    &:focus {
      outline: none;
      background: #f7f7f7 !important;
    }
    &:active {
      box-shadow: inset 0 0 20px 11, 191, 251;
      transition: none;
      background: #f7f7f7 !important;
    }
    &:hover {
      background: #d4d4d4 !important;
    }
  }
`;

export const CloseMapButton = styled(Button)`
  && {
    height: 100%;
    width: 100%;
    min-width: 0;
    font-family: Arial;
    background: #e7e7e7;
    font-weight: bold;
    opacity: 0.95;
    box-shadow: none;
    border-radius: 0 4px 0 0;
    padding: 0;
    &:focus {
      outline: none;
      background: #f7f7f7 !important;
    }
    &:active {
      box-shadow: inset 0 0 20px 11, 191, 251;
      transition: none;
      background: #f7f7f7 !important;
    }
    &:hover {
      background: #ff5d5d !important;
      opacity: 0.95;
    }
    &:before {
      content: '';
      position: absolute;
      left: 0;
      z-index: 100;
      top: 10%;
      width: 1px;
      height: 75%;
      background: #8b8989;
      opacity: 0.95;
    }
  }
`;

export const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;
