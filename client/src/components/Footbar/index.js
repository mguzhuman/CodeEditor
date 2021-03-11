import React from 'react';
import {AppBar, Toolbar} from '@material-ui/core';
import {withStyles} from "@material-ui/core/styles";
import {styles} from './styles'

const IndexComponent = ({classes,children}) => {
    return (
        <React.Fragment>
            <AppBar className={classes.footBarWrapper} color="primary">
                <Toolbar className={classes.footBarTool}>
                    {children}
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}

export default withStyles(styles, {withTheme: true})(IndexComponent);
