import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import {LANGUAGE_ARRAY} from "./constant";
import {MenuItem} from "@material-ui/core";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
    },
    heading: {
        fontWeight: 'bold',
    },
    textInput: {
        marginLeft: 20,
    },
    selectInput: {
        marginLeft: 20,
        marginRight: 20,
        minWidth:300,
    },
    button: {
        marginRight: 20,
        minWidth: 130
    }
}));

export const CreateAccordion = ({saveNewRoom}) => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [name, setName] = useState('');
    const [language, setLanguage] = useState('');

    const handleCreate = () => {
        saveNewRoom(name, language);
        handleChange(!expanded);
        setName('');
        setLanguage('');

    };
    const handleChange = (newExpanded) => {
        setExpanded(newExpanded);

    };


    const handleChangeName = (event) => {
        setName(event.target.value);
    };

    const handleChangeLanguage = (event) => {
        setLanguage(event.target.value);
    };
    return (
        <div className={classes.root}>
            <Accordion expanded={expanded} onChange={() => handleChange(!expanded)}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel-content"
                    id="panel-header"
                >
                    <Typography className={classes.heading}>Create new room</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <TextField
                        className={classes.textInput}
                        variant='outlined'
                        id="name"
                        label="Name room"
                        fullWidth
                        value={name}
                        onChange={handleChangeName}
                    />
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

                    <Button
                        className={classes.button}
                        onClick={handleCreate}
                        color="primary"
                        variant='contained'
                    >
                        Create
                    </Button>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};
