import React from 'react'
import {StyledHideMapButton, StyledArrow} from './styles'

const HideMapButton = ({ hide, onHideChange }) => {

    const handleClick = () => {
        onHideChange(!hide)
    }

    return (
        <StyledHideMapButton onClick={handleClick}>
            <StyledArrow hidechange={hide ? 1 : 0} />
        </StyledHideMapButton>
    )
}

export default HideMapButton