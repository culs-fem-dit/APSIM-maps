import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {StyledAddMapButton} from './styles'

const useStyles = makeStyles(theme => ({
    addButtonWrapper: {
        opacity: .9,
        position: 'absolute',
        bottom: 20,
        left: 0,
        width: '100%',
        textAlign: 'center'
    }
}));

const AddMapButton = ({ onRenderSecondMapChange }) => {
    const classes = useStyles()

    const handleClick = () => {
        onRenderSecondMapChange(true)
    }

    return (
        <div className={classes.addButtonWrapper}>
            <StyledAddMapButton variant="contained" onClick={handleClick}>
                Add Map
            </StyledAddMapButton>
        </div>
    )
}

export default AddMapButton