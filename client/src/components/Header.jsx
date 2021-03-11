import React from "react";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import {LANGUAGE_ARRAY} from "../constant";
import {MenuItem} from "@material-ui/core";
import {CopyToClipboard} from "react-copy-to-clipboard";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import VideoCallIcon from '@material-ui/icons/VideoCall';

export const Header = ({classes,disabledRunBtn,handleRun,language,handleChangeLanguage, startVideoCall}) => {
    return (
        <div className={classes.headerContainer}>
            <div className={classes.headerFuncBlock}>
                <Button disabled={disabledRunBtn} style={{height: 50}} onClick={handleRun}>
                    Run
                </Button>
                <FormControl variant="outlined" className={classes.selectInput}>
                    <InputLabel id="language-simple-select-outlined-label">Language</InputLabel>
                    <Select
                        labelId="language-simple-select-outlined-label"
                        id="language-simple-select-outlined"
                        label="Language"
                        fullWidth
                        value={language}
                        onChange={handleChangeLanguage}
                    >

                        {LANGUAGE_ARRAY.map(item =>
                            <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                        )}
                    </Select>
                </FormControl>
                <Button style={{height:50,marginLeft: 20}} onClick={startVideoCall}>
                    Video Translation
                    <VideoCallIcon/>
                </Button>
            </div>
            <div className={classes.headerTextBlock}>
                <div className={classes.copyBlock}>
                    <CopyToClipboard text={`${window.location.href}`}>
                        <Tooltip title="Copy URL">
                            <IconButton aria-label="copy-url">
                                <FileCopyIcon/>
                            </IconButton>
                        </Tooltip>
                    </CopyToClipboard>
                    <p>
                        This room is unique. To invite other persons to <br/> the same room please copy
                        url using copy url button.
                    </p>
                </div>
                <p>
                    On this page you can share code and talk using webcam and microphone.
                </p>
            </div>
        </div>
    )
}
