import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Tooltip from '@material-ui/core/Tooltip';
import {CopyToClipboard} from 'react-copy-to-clipboard';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import {socket} from './App';
import {LANGUAGE_ARRAY} from './constant';
import {CreateAccordion} from "./CreateAccordion";
import {Room} from "./Room";

const useStyles = makeStyles({
    table: {
        minWidth: 800,
    },
    paper: {
        width: 870
    },
    fullPage: {
        minWidth: 800,
        marginTop: 50,
        paddingTop: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: 'flex-start',
        height: "100%",
        width: "100%"
    }
});

export default props => {
    const rows = props.rooms;
    const classes = useStyles();

    useEffect(()=>{
        if (window.location.pathname === '/'){
            socket.emit('create', {date: new Date().toJSON(), name:'', language:'javascript'});
            socket.on('createSuccess',(id)=>{
                window.location.href=`/room/${id}`
            })
        }
    },[])

    const saveNewRoom = () => {

        return null
    }

    const handleDeleteItem = (id) => {
        socket.emit('removeRoom', id);
    }

    return (
        <Router>
            <Switch>
                <Route path="/room/:id" children={<Room/>}/>
                <Route path="/">
                    {
                        null
                    }



                    {/*<div className={classes.fullPage}>*/}
                    {/*    <TableContainer component={Paper} className={classes.paper}>*/}
                    {/*        <Table className={classes.table} aria-label="simple table">*/}
                    {/*            <TableHead>*/}
                    {/*                <TableRow>*/}
                    {/*                    <TableCell>Name</TableCell>*/}
                    {/*                    <TableCell align="right">Created</TableCell>*/}
                    {/*                    <TableCell align="right">Language</TableCell>*/}
                    {/*                    <TableCell> </TableCell>*/}
                    {/*                </TableRow>*/}
                    {/*            </TableHead>*/}
                    {/*            <TableBody>*/}
                    {/*                {rows.map((row) => (*/}
                    {/*                    <TableRow key={row.date}>*/}
                    {/*                        <TableCell component="th" scope="row">*/}
                    {/*                            {row.name}*/}
                    {/*                        </TableCell>*/}
                    {/*                        <TableCell*/}
                    {/*                            align="right">{new Date(row.date).toLocaleDateString()}</TableCell>*/}
                    {/*                        <TableCell*/}
                    {/*                            align="right">{(LANGUAGE_ARRAY.find(item => item.value === row.language).label)}</TableCell>*/}
                    {/*                        <TableCell align="right">*/}
                    {/*                            <Button*/}
                    {/*                                variant="contained"*/}
                    {/*                                color='secondary'*/}
                    {/*                                component={Link}*/}
                    {/*                                to={`/room/${row.id}`}*/}
                    {/*                                target={"_blank"}*/}
                    {/*                            >*/}
                    {/*                                Connect*/}
                    {/*                            </Button>*/}
                    {/*                            <Tooltip title="Delete">*/}
                    {/*                                <IconButton aria-label="delete" onClick={() => {*/}
                    {/*                                    handleDeleteItem(row.id);*/}
                    {/*                                }}>*/}
                    {/*                                    <DeleteIcon/>*/}
                    {/*                                </IconButton>*/}
                    {/*                            </Tooltip>*/}
                    {/*                            <CopyToClipboard text={`${window.location.origin}/room/${row.id}`}>*/}
                    {/*                                <Tooltip title="Copy URL">*/}
                    {/*                                    <IconButton aria-label="copy-url">*/}
                    {/*                                        <FileCopyIcon/>*/}
                    {/*                                    </IconButton>*/}
                    {/*                                </Tooltip>*/}
                    {/*                            </CopyToClipboard>*/}
                    {/*                        </TableCell>*/}

                    {/*                    </TableRow>*/}
                    {/*                ))}*/}
                    {/*            </TableBody>*/}
                    {/*        </Table>*/}
                    {/*        <CreateAccordion saveNewRoom={saveNewRoom}/>*/}
                    {/*    </TableContainer>*/}
                    {/*</div>*/}
                </Route>
            </Switch>
        </Router>
    )
};
