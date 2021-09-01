import styled from 'styled-components';
import QuestionMark from '@material-ui/icons/HelpOutline';

export const StyledMap = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  min-height: 600px;
  width: ${props => (props.size ? '49.5vw' : '100vw')};
  && {
    transition-property: all !important;
  }
`;

export const SecondStyledMap = styled.div`
  position: absolute;
  top: 0;
  left: ${props => (props.size ? '50vw' : '0vw')};
  height: 100%;
  width: ${props => (props.size ? '49.5vw' : '100vw')};
  && {
    transition-property: all !important;
  }
`;
export const Authors = styled.div`
  position: fixed;
  bottom: 15px;
  right: 51px;
  text-align: center;
  z-index: 1000;
  opacity: 0.7;
  background: white;
  font-size: 10px;
  padding: 1px;
`;

export const AuthorsLink = styled.a`
  text-decoration: none;
`;

export const StyledQuestionMark = styled(QuestionMark)`
  position: absolute;
  left: 6px;
  top: 3px;
  z-index: 1000;
`;

export const InfoLink = styled.a`
  color: #3f3f3f;
  &:active {
    color: red;
  }
`;
