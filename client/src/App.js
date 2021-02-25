import Main from "./Main";
import socketConnect from 'socket.io-client';
import React, {useEffect, useState, Fragment} from "react";
const fs = require("fs");
var socket;

const App = () => {
    const [rooms, setRooms] = useState([]);
    const [isConnect, setIsConnect] = useState(false);
    useEffect(() => {
        socket = socketConnect({
            ca: fs.readFileSync("/etc/letsencrypt/live/codetalk.pro/cert.pem")
        })
        socket.on('listRooms', (data) => {
            setIsConnect(true);
            setRooms(data);
        })
    }, [])

    return (
        <Fragment>
            {isConnect ?
                <Main rooms={rooms}/>
                :
                null
            }
        </Fragment>
    );
};
export {App, socket};
