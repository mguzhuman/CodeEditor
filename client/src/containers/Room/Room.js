import React, {Fragment, useEffect, useState, useRef, useLayoutEffect} from "react";
import {withStyles} from "@material-ui/core/styles";
import {useParams} from "react-router-dom";
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import ChatIcon from '@material-ui/icons/Chat';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'


import {createSocketConnectionInstance} from '../../services/socketConnection'
import {LANGUAGE_ARRAY} from '../../constant';
import {Header} from "../../components/Header";
import {CodeComponent} from "../../components/CodeComponent";
import {styles} from './styles'
import FootBar from '../../components/Footbar'
import ChatBox from "../../components/ChatBox";
import UserPopup from "../../components/UserPopup";
import cn from "classnames";
import adapter from 'webrtc-adapter';

let socket

const RoomComponent = ({classes}) => {
    let socketInstance = useRef(null);
    let {id} = useParams();
    const [micStatus, setMicStatus] = useState(true);
    const [camStatus, setCamStatus] = useState(true);
    const [streaming, setStreaming] = useState(false);
    const [chatToggle, setChatToggle] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const [displayStream, setDisplayStream] = useState(false);
    const [messages, setMessages] = useState([]);

    const [isVideoCall, setIsVideoCall] = useState(false)

    const [disabledRunBtn, setDisabledRunBtn] = useState(false);
    const [language, setLanguage] = useState('')
    const [room, setRoom] = useState(null);
    const [value, setValue] = useState('');
    const [response, setResponse] = useState('Click on the Run button to get the result of the code execution.');

    useEffect(() => {
        socketInstance.current = createSocketConnectionInstance({
            updateInstance: updateFromInstance,
            params: {quality: 20},
            userDetails
        });
        socket = socketInstance.current?.socket
        window.gtag('config', 'G-B477HPNG3Z', {
            'page_title': document.title,
            page_path: window.location.pathname + window.location.search
        })
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
                setResponse(response);
            } else {
                setResponse("Click on the Run button to get the result of the code execution.");
            }
            setDisabledRunBtn(false);
        });
        socket.on('returnChangeLanguage', (data) => {
            setValue(data.value);
            setLanguage(data.language);
            setResponse("Click on the Run button to get the result of the code execution.");
        });
        socket.on('disabledRunBtn', () => {
            setDisabledRunBtn(true);
        });
    }, [])

    useEffect(() => {
        if (userDetails) {
            socketInstance.current?.setUserDetails(userDetails)
            socketInstance.current?.initPeerConnection()

        }
    }, [userDetails]);

    useEffect(() => {
        return () => {
            socketInstance.current?.destoryConnection();
        }
    }, []);

    const updateFromInstance = (key, value) => {
        if (key === 'streaming') setStreaming(value);
        if (key === 'message') setMessages([...value]);
        if (key === 'displayStream') setDisplayStream(value);
    }

    useLayoutEffect(() => {
        const appBar = document.getElementsByClassName('app-navbar');
        if (appBar && appBar[0]) appBar[0].style.display = 'none';
        return () => {
            if (appBar && appBar[0]) appBar[0].style.display = 'block';
        }
    });

    const handleRun = () => {
        gtag('event', 'runCode', {
            "event_label": LANGUAGE_ARRAY.find(item => item.value === language).label,
        });
        socket.emit('sendToRunCode', {value, id, language});
        setDisabledRunBtn(true);
        setResponse('Wait for response ...');
    }

    const handleMyMic = () => {
        const {getMyVideo, reInitializeStream} = socketInstance.current;
        const myVideo = getMyVideo();
        if (myVideo) myVideo.srcObject?.getAudioTracks().forEach(track => {
            if (track.kind === 'audio')
                micStatus ? track.stop() : reInitializeStream(camStatus, !micStatus);
        });
        setMicStatus(!micStatus);
    }

    const handleMyCam = () => {
        if (!displayStream) {
            const {toggleVideoTrack} = socketInstance.current;
            toggleVideoTrack({video: !camStatus, audio: micStatus});
            setCamStatus(!camStatus);
        }
    }

    const handleUserDetails = (userDetails) => {
        setUserDetails(userDetails);
    }

    const handleChangeLanguage = (event) => {
        setLanguage(event.target.value);
        socket.emit('changeLanguage', {roomId: id, language: event.target.value});
    };

    const chatHandle = (bool = false) => {
        setChatToggle(bool);
    }

    const startVideoCall = () => {
        setIsVideoCall((prevState) => {
            if (prevState) {
                setMicStatus(true)
                setCamStatus(true)
                socketInstance.current?.destoryConnection();}
            return !prevState
        })
    }

    const options = {
        mode: language ? (LANGUAGE_ARRAY.find(item => item.value === language).ide) : '',
        theme: 'monokai',
        lineNumbers: true
    }
    return (
        <Fragment>
            <ToastContainer
                autoClose={2000}
                closeOnClick
                pauseOnHover
            />
            {
                !room ? null :
                    <Fragment>
                        <Header
                            disabledRunBtn={disabledRunBtn}
                            handleRun={handleRun}
                            classes={classes}
                            language={language}
                            handleChangeLanguage={handleChangeLanguage}
                            startVideoCall={startVideoCall}
                        />
                        <div className={classes.mainContainer} style={{height: isVideoCall ? '69vh' : '92vh'}}>
                            <CodeComponent
                                classes={classes}
                                value={value}
                                options={options}
                                onBeforeChange={(editor, data, value) => {
                                    setValue(value);
                                    socket.emit('changeCodeValue', {roomId: id, value});
                                }}
                            />
                            <CodeComponent
                                classes={classes}
                                value={response}
                            />
                        </div>
                        {isVideoCall ?
                            <Fragment>
                                <UserPopup submitHandle={handleUserDetails}/>
                                <div id="room-container" className={classes.roomContainer}/>
                                <FootBar className="chat-footbar">
                                    <div className={classes.footbarTitle}></div>
                                    <div className={classes.footbarWrapper}>
                                        {streaming &&
                                        <div className={cn(classes.statusActionBtn, classes.micOrCamBtn)}
                                             onClick={handleMyMic}
                                             title={micStatus ? 'Disable Mic' : 'Enable Mic'}>
                                            {micStatus ?
                                                <MicIcon/>
                                                :
                                                <MicOffIcon/>
                                            }
                                        </div>}
                                        {streaming &&
                                        <div className={cn(classes.statusActionBtn, classes.micOrCamBtn)}
                                             onClick={handleMyCam}
                                             title={camStatus ? 'Disable Cam' : 'Enable Cam'}>
                                            {camStatus ?
                                                <VideocamIcon/>
                                                :
                                                <VideocamOffIcon/>
                                            }
                                        </div>}
                                    </div>
                                    <div>
                                        <div onClick={() => chatHandle(!chatToggle)} className={classes.chatBtn}
                                             title="Chat">
                                            <ChatIcon/>
                                        </div>
                                    </div>
                                </FootBar>
                                <ChatBox
                                    chatToggle={chatToggle}
                                    closeDrawer={() => chatHandle(false)}
                                    socketInstance={socketInstance.current}
                                    myDetails={userDetails}
                                    messages={messages}/>
                            </Fragment> : null
                        }
                    </Fragment>
            }
        </Fragment>
    )
}

export const Room = withStyles(styles,
    {
        withTheme: true
    }
)(RoomComponent)
