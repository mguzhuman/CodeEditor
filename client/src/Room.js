import React, {Fragment, useEffect, useState} from "react";
import {Controlled as CodeMirror} from 'react-codemirror2';
import Button from "@material-ui/core/Button";
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import {makeStyles} from "@material-ui/core/styles";
import {useParams} from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {socket} from './App';
import {LANGUAGE_ARRAY} from './constant';
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import {MenuItem} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import ReactGA from "react-ga";

require('codemirror/mode/javascript/javascript');
require('codemirror/mode/python/python');
require('codemirror/mode/clike/clike');
require('codemirror/mode/cobol/cobol');
require('codemirror/mode/coffeescript/coffeescript');
require('codemirror/mode/crystal/crystal');
require('codemirror/mode/d/d');
require('codemirror-mode-elixir');
require('codemirror/mode/elm/elm');
require('codemirror/mode/erlang/erlang');
require('codemirror/mode/mllike/mllike');
require('codemirror/mode/go/go');
require('codemirror/mode/groovy/groovy');
require('codemirror/mode/haskell/haskell');
require('codemirror/mode/julia/julia');
require('codemirror/mode/lua/lua');
require('codemirror/mode/perl/perl');
require('codemirror/mode/php/php');
require('codemirror/mode/ruby/ruby');
require('codemirror/mode/rust/rust');
require('codemirror/mode/swift/swift');

const useStyles = makeStyles({
    fullPage: {
        height: "100%",
        width: "49.8%"
    },
    mainContainer: {
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: 'space-between'
    },
    label: {
        display: 'inline-flex',
        paddingLeft: 50,
        alignItems: 'center'
    },
    selectInput: {
        margin: 20,
        marginLeft: 50,
        minWidth: 200,
    },
    headerContainer: {
        display: "flex",
    }
});

export const Room = () => {
    const classes = useStyles();
    let {id} = useParams();

    const [disabledRunBtn, setDisabledRunBtn] = useState(false);
    const [language, setLanguage] = useState('')
    const [room, setRoom] = useState(null);
    const [value, setValue] = useState('');
    const [response, setResponse] = useState('Click on the Run button to get the result of the code execution.');
    useEffect(() => {
        console.log(process.env.GA_KEY)
        ReactGA.initialize(process.env.GA_KEY || '');
        socket.emit('joinRoom', id);
        socket.on('joinRoomAccept', (data) => {
            if (data) {
                setValue(data.value);
                setRoom(data);
                setLanguage(data.language);
                if (data.response !== "") {
                    setResponse(data.response)
                } else {
                    setResponse("Click on the Run button to get the result of the code execution.")
                }
            } else {
                window.location.href = '/404'
            }
        });
        socket.on('changeCodeClientValue', (value) => {
            setValue(value);
        });
        socket.on('returnResponseRunCode', (response) => {
            if (response !== "") {
                setResponse(response)
            } else {
                setResponse("Click on the Run button to get the result of the code execution.")
            }
            setDisabledRunBtn(false);
        });
        socket.on('returnChangeLanguage', (data) => {
            setValue(data.value);
            setLanguage(data.language);
            setResponse("Click on the Run button to get the result of the code execution.")

        });
        socket.on('disabledRunBtn', () => {
            setDisabledRunBtn(true);
        });

    }, []);

    const handleRun = () => {
        ReactGA.event({
            category: 'User',
            action: 'Run code',
            label: LANGUAGE_ARRAY.find(item => item.value === language).label
        });
        socket.emit('sendToRunCode', {value, id, language});
        setDisabledRunBtn(true);
        setResponse('Wait for response ...');
    }

    const handleChangeLanguage = (event) => {
        setLanguage(event.target.value);
        socket.emit('changeLanguage', {roomId: id, language: event.target.value});
    };

    const handleClear = () => {
        socket.emit('clearResponse', id)
    }

    const options = {
        mode: language ? (LANGUAGE_ARRAY.find(item => item.value === language).ide) : '',
        theme: 'monokai',
        lineNumbers: true
    }
    return (
        <Fragment>
            {
                !room ? null :
                    <Fragment>
                        <div className={classes.headerContainer}>
                            <Button onClick={handleClear}>
                                Clear
                            </Button>
                            <Button disabled={disabledRunBtn} onClick={handleRun}>
                                Run
                            </Button>
                            <CopyToClipboard text={`${window.location.href}`}>
                                <Tooltip title="Copy URL">
                                    <IconButton aria-label="copy-url">
                                        <FileCopyIcon/>
                                    </IconButton>
                                </Tooltip>
                            </CopyToClipboard>
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
                        </div>

                        <div className={classes.mainContainer}>
                            <CodeMirror
                                className={classes.fullPage}
                                value={value}
                                options={options}
                                onBeforeChange={(editor, data, value) => {
                                    setValue(value);
                                    socket.emit('changeCodeValue', {roomId: id, value});
                                }}
                                onChange={(editor, data, value) => {
                                }}
                            />
                            <CodeMirror
                                className={classes.fullPage}
                                value={response}
                                options={{theme: 'monokai'}}
                                onBeforeChange={(editor, data, value) => {
                                }}
                            />
                        </div>

                    </Fragment>
            }
        </Fragment>
    )
}
