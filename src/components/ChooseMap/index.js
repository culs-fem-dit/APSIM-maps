import React, { useState } from 'react'
import ChooseMapButton from './ChooseMapButton'
import ChooseMapModal from './ChooseMapModal'
import CloseMapInfoButton from './CloseMapInfoButton'
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    buttonsContainer: {
        height: '100%',
        width: '100%'
    }
}));



const ChooseMap = ({ selectMapQuery, onSetSelectMapQueryChange, onShowMapInformationChange, showMapInformation, onShowSquareInformationChange, onRenderMapChange, secondMapExists, onValueExtremesChange, onCriteriaChange }) => {
    const classes = useStyles()
  
    const [open, setOpen] = useState(false);

    const Wrapper = styled.div`
        width: 100%;
        height: 100%;
    `
    
    return (
        <Wrapper>
            <Grid container spacing={0} className={classes.buttonsContainer}>
            <Grid item xs={showMapInformation ? 10 : 12}>
                <ChooseMapButton
                    onOpenChange={setOpen}
                    selectMapQuery={selectMapQuery}
                    showMapInformation={showMapInformation}
                />
            </Grid>
            {showMapInformation &&
                <Grid item xs={2}>
                    <CloseMapInfoButton
                        selectMapQuery={selectMapQuery}
                        onSetSelectMapQueryChange={onSetSelectMapQueryChange}
                        showMapInformation={showMapInformation}
                        onShowMapInformationChange={onShowMapInformationChange}
                        onShowSquareInformationChange={onShowSquareInformationChange}
                        onRenderMapChange={onRenderMapChange}
                        secondMapExists={secondMapExists}
                        onValueExtremesChange={onValueExtremesChange}
                        onCriteriaChange={onCriteriaChange}
                    />
                </Grid>
            }
            </Grid>
            <ChooseMapModal
                open={open}
                onOpenChange={setOpen}
                selectMapQuery={selectMapQuery}
                onSetSelectMapQueryChange={onSetSelectMapQueryChange}
                onShowMapInformationChange={onShowMapInformationChange}
            />
        </Wrapper>
    )
}

export default ChooseMap