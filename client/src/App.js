import Main from "./Main";
import socketConnect from 'socket.io-client';
import React, {useEffect, useState, Fragment} from "react";

var socket;

const App = () => {
    const [rooms, setRooms] = useState([]);
    const [isConnect, setIsConnect] = useState(false);
    useEffect(() => {
        socket = socketConnect()
        socket.on('listRooms', (data) => {
            console.log(data)
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
