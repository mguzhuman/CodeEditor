import React, { useState} from "react";
import {Button, Dialog, DialogTitle, Paper, TextField} from "@material-ui/core";
// Style imports
import {withStyles} from "@material-ui/core/styles";
import {styles} from './styles'

const IndexComponent = ({submitHandle,classes})=> {
    const [popupToggle, setPopupToggle] = useState(true);
    const [userDetails, setUserDetails] = useState({
        name: ''
    });

    const handleChange = (event) => {
        const {value} = event.target;
        setUserDetails({...userDetails, name: value});
    }

    const handleSubmit = (event) => {
        if (event.type === 'keyup' && (event).key !== 'Enter') {
            return;
        }
        if (userDetails.name.length > 0) {
            submitHandle(userDetails);
            setPopupToggle(false);
        }
    }

    return (
        <React.Fragment>
            <Dialog disableBackdropClick={true} onClose={() => setPopupToggle(false)}
                    open={popupToggle}>
                <Paper className={classes.userPopupPaper} onKeyUp={handleSubmit}>
                    <DialogTitle className={classes.userPopupTitle}>Enter Your Details</DialogTitle>
                    <div className={classes.userDetailsWrapper}>
                        <TextField
                            required
                            title="Name"
                            id="outlined-required"
                            className="user-popup-input"
                            label="Name"
                            variant="outlined"
                            onChange={handleChange}
                            placeholder="Name"
                        />
                        <Button className={classes.userPopupButton} onClick={handleSubmit}>START</Button>
                    </div>
                </Paper>
            </Dialog>
        </React.Fragment>
    )
}

export default withStyles(styles, {withTheme: true})(IndexComponent);
