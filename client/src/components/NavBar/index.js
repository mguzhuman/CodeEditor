import React from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import {withStyles} from "@material-ui/core/styles";
import {styles} from './styles'
import cn from 'classnames'

const IndexComponent = ({classes,children}) => {
    return (
        <React.Fragment>
            <div className={classes.navbarContainer}>
                <div>
                    <AppBar className={cn(classes.appNavbar,'app-navbar')} position="static">
                        <Toolbar>

                        </Toolbar>
                    </AppBar>
                </div>
                <div>
                    {children}
                </div>
            </div>
        </React.Fragment>
    )
}

export default withStyles(styles, {withTheme: true})(IndexComponent);
