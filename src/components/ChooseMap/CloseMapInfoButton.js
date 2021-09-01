import React from 'react'
import CloseIcon from '@material-ui/icons/Close';
import {Wrapper, CloseMapButton} from './styles'

const CloseMapInfoButton = ({ showMapInformation, onShowMapInformationChange, onSetSelectMapQueryChange, onShowSquareInformationChange, onRenderMapChange, secondMapExists, onCriteriaChange, onValueExtremesChange }) => {

    const handleClickClose = () => {
        onShowSquareInformationChange(false);
        onSetSelectMapQueryChange()
        onCriteriaChange()
        onValueExtremesChange()
        if(secondMapExists){
            onRenderMapChange(false)
        } else {
            onShowMapInformationChange(false);
        }
    }

    return (
        <Wrapper>
            <CloseMapButton variant="contained" onClick={handleClickClose} infotabopened={showMapInformation ? 1 : 0}>
                <CloseIcon />
            </CloseMapButton>
        </Wrapper>
    )
}

export default CloseMapInfoButton