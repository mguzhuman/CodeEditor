import openSocket from 'socket.io-client';
import Peer from 'peerjs';
import {toast} from 'react-toastify';

let peers = {};

class SocketConnection {
    videoContainer = {};
    message = [];
    settings;
    streaming = false;
    myPeer;
    socket;
    isSocketConnected = false;
    isPeersConnected = false;
    myId = '';

    constructor(settings) {
        this.settings = settings;
        this.socket = initializeSocketConnection();
        if (this.socket) this.isSocketConnected = true;
        this.initializeSocketEvents();
    }

    initPeerConnection = () => {
        console.log(this, ' this')
        this.myPeer = initializePeerConnection();
        if (this.myPeer) this.isPeersConnected = true;
        this.initializePeersEvents();
    }

    setUserDetails = (userDetails) => {
        this.settings.userDetails = userDetails
    }

    initializeSocketEvents = () => {
        this.socket.on('connect', () => {
        });
        this.socket.on('user-disconnected', (userId) => {
            peers[userId] && peers[userId].close();
            delete peers[userId]
            this.removeVideo(userId);
        });
        this.socket.on('disconnect', () => {
        });
        this.socket.on('error', (err) => {
        });
        this.socket.on('new-broadcast-message', (data) => {
            this.message.push(data);
            this.settings.updateInstance('message', this.message);
            toast.info(`${data.message.message} By ${data.userData.name}`)
        });
        this.socket.on('display-media', (data) => {
            if (data.value) checkAndAddClass(this.getMyVideo(data.userId), 'displayMedia');
            else checkAndAddClass(this.getMyVideo(data.userId), 'userMedia');
        });
        const roomId = window.location.pathname.split('/')[2];
        const userData = {
            roomId,
        }
        this.socket.emit('joinRoom', userData);
        // this.socket.on('user-video-off', (data:UserVideoToggle) => {
        //     changeMediaView(data.id, data.status);
        // });
    }

    initializePeersEvents =  () => {
        this.myPeer.on('open',async (id) => {
            const {userDetails} = this.settings;
            this.myId = id;
            const roomId = window.location.pathname.split('/')[2];
            const userData = {
                userId: id, roomId, ...userDetails
            }
            await this.setNavigatorToStream();
            this.socket.emit('startVideo', userData);
            this.socket.emit('ready-connect', userData);
        });
        this.myPeer.on('error', (err) => {
            this.myPeer.reconnect();
        })
    }

    setNavigatorToStream = async () => {
       return new Promise(((resolve, reject) => {
           this.getVideoAudioStream().then(async (stream) => {
               if (stream) {
                   this.streaming = true;
                   this.settings.updateInstance('streaming', true);
                   await this.createVideo({id: this.myId, stream});
                   await this.setPeersListeners(stream);
                   await this.newUserConnection(stream);
               }
               resolve(true)
           })
       }))
    }

    getVideoAudioStream = (video = true, audio = true) => {
        let quality = this.settings.params.quality;
        if (quality) quality = parseInt(quality);
        const myNavigator = navigator.mediaDevices.getUserMedia || navigator.mediaDevices.webkitGetUserMedia || navigator.mediaDevices.mozGetUserMedia || navigator.mediaDevices.msGetUserMedia;
        return myNavigator({
            video: video ? {
                frameRate: quality ? quality : 20,
                noiseSuppression: true,
                width: {min: 640, ideal: 1280, max: 1920},
                height: {min: 480, ideal: 720, max: 1080}
            } : false,
            audio: audio,
        });
    }

    setPeersListeners = (stream) => {
        console.warn('func start setPeersListeners')
        this.myPeer.on('call', (call) => {
            console.warn('peer.on(call)')
            call.answer(stream);
            call.on('stream', (userVideoStream) => {
                console.warn('call.on(stream)')
                this.createVideo({id: call.metadata.id, stream: userVideoStream});
            });
            call.on('close', () => {
                console.warn('call.on(close)')
                this.removeVideo(call.metadata.id);
            });
            call.on('error', () => {
                console.warn('call.on(error)')
                this.removeVideo(call.metadata.id);
            });
            peers[call.metadata.id] = call;
            console.warn('setPeersListeners => peers', peers)
        });
    }

    newUserConnection = (stream) => {
        console.warn('added socket new user')
        this.socket.on('new-user-connect', (userData) => {
            console.warn('New User Connected', userData);
            this.connectToNewUser(userData, stream);
        });
    }

    connectToNewUser(userData, stream) {
        const {userId} = userData;
        const call = this.myPeer.call(userId, stream, {metadata: {id: this.myId}});
        console.warn('func connection to new user',{userId, stream,obj: {metadata: {id: this.myId}}})
        call.on('stream', (userVideoStream) => {
            console.warn('call.on(stream) == new user')
            this.createVideo({id: userId, stream: userVideoStream, userData});
        });
        call.on('close', () => {
            console.warn('call.on(stream) == new user')
            this.removeVideo(userId);
        });
        call.on('error', () => {
            console.warn('call.on(error) == new user')
            this.removeVideo(userId);
        })
        peers[userId] = call;
        console.warn('connectToNewUser => peers', peers)
    }

    boradcastMessage = (message) => {
        this.message.push(message);
        this.settings.updateInstance('message', this.message);
        this.socket.emit('broadcast-message', message);
    }

    createVideo = (createObj) => {
        console.log('createVideo', {createObj, videoContainer: this.videoContainer},)
        if (!this.videoContainer[createObj.id]) {
            this.videoContainer[createObj.id] = {
                ...createObj,
            };
            const roomContainer = document.getElementById('room-container');
            const videoContainer = document.createElement('div');
            const video = document.createElement('video');
            video.srcObject = this.videoContainer[createObj.id].stream;
            video.id = createObj.id;
            video.autoplay = true;
            if (this.myId === createObj.id) video.muted = true;
            videoContainer.appendChild(video)
            roomContainer.append(videoContainer);
        } else {
            document.getElementById(createObj.id).srcObject = createObj.stream;
        }
    }

    reInitializeStream = (video, audio, type = 'userMedia') => {
        console.log('reInitializeStream => ', {video, audio, type})
        const media = type === 'userMedia' ? this.getVideoAudioStream(video, audio) : navigator.mediaDevices.getDisplayMedia();
        return new Promise((resolve) => {
            media.then((stream) => {
                const myVideo = this.getMyVideo();
                if (type === 'displayMedia') {
                    this.toggleVideoTrack({audio, video});
                    this.listenToEndStream(stream, {video, audio});
                    this.socket.emit('display-media', true);
                }
                checkAndAddClass(myVideo, type);
                this.createVideo({id: this.myId, stream});
                replaceStream(stream);
                resolve(true);
            });
        });
    }

    removeVideo = (id) => {
        delete this.videoContainer[id];
        const video = document.getElementById(id);
        if (video) video.remove();
    }

    destoryConnection = () => {
        const myMediaTracks = this.videoContainer[this.myId].stream.getTracks();
        myMediaTracks.forEach((track) => {
            track.stop();
        })
        //socketInstance.socket.disconnect();
        this.myPeer.destroy();
    }

    getMyVideo = (id = this.myId) => {
        return document.getElementById(id);
    }

    listenToEndStream = (stream, status) => {
        const videoTrack = stream.getVideoTracks();
        if (videoTrack[0]) {
            videoTrack[0].onended = () => {
                this.socket.emit('display-media', false);
                this.reInitializeStream(status.video, status.audio, 'userMedia');
                this.settings.updateInstance('displayStream', false);
                this.toggleVideoTrack(status);
            }
        }
    };

    toggleVideoTrack = (status) => {
        const myVideo = this.getMyVideo();
        if (myVideo && !status.video) myVideo.srcObject.getVideoTracks().forEach((track) => {
            if (track.kind === 'video') {
                // track.enabled = status.video;
                // this.socket.emit('user-video-off', {id: this.myID, status: true});
                // changeMediaView(this.myID, true);
                !status.video && track.stop();
            }
        });
        else if (myVideo) {
            // this.socket.emit('user-video-off', {id: this.myID, status: false});
            // changeMediaView(this.myID, false);
            this.reInitializeStream(status.video, status.audio);
        }
    }

    toggleAudioTrack = (status) => {
        const myVideo = this.getMyVideo();
        if (myVideo) myVideo.srcObject.getAudioTracks().forEach((track) => {
            if (track.kind === 'audio')
                track.enabled = status.audio;
            status.audio ? this.reInitializeStream(status.video, status.audio) : track.stop();
        });
    }

}

const initializePeerConnection = () => {
    return new Peer('', {
        host: '/',
        port: '9000',
        secure: true,
        config: {
            iceServers: [
                { urls: 'stun:stun.codetalk.pro:5349' },
                { urls: 'turn:turn.codetalk.pro:5349', username:"codetalkuser", credential: 'codepas2talk9' }
            ]
        },
        debug: 3
    });
}

const initializeSocketConnection = () => {
    return openSocket.connect({
        secure: true,
        reconnection: true,
        rejectUnauthorized: false,
        reconnectionAttempts: 10
    });
}

const replaceStream = (mediaStream) => {
    console.log('replaceStream => peers =>', peers)
    Object.values(peers).map((peer) => {
        // console.log('replaceStream => peers => peer',peer)
        peer.peerConnection.getSenders().map((sender) => {
            // console.log('replaceStream => peers => peer => sender',sender)
            if (sender.track.kind == "audio") {
                if (mediaStream.getAudioTracks().length > 0) {
                    sender.replaceTrack(mediaStream.getAudioTracks()[0]);
                }
            }
            if (sender.track.kind == "video") {
                if (mediaStream.getVideoTracks().length > 0) {
                    sender.replaceTrack(mediaStream.getVideoTracks()[0]);
                }
            }
        });
    })
}

const checkAndAddClass = (video, type = 'userMedia') => {
    if (video.classList.length === 0 && type === 'displayMedia')
        video.classList.add('display-media');
    else
        video.classList.remove('display-media');
}

const changeMediaView = (userId, status) => {
    const userVideoDOM = document.getElementById(userId);
    if (status) {
        const clientPosition = userVideoDOM.getBoundingClientRect();
        const createdCanvas = document.createElement("SPAN");
        createdCanvas.className = userId;
        createdCanvas.style.position = 'absolute';
        createdCanvas.style.left = `${clientPosition.left}px`;
        createdCanvas.style.top = `${clientPosition.top}px`;
        // createdCanvas.style.width = `${userVideoDOM.videoWidth}px`;
        // createdCanvas.style.height = `${clientPosition.height}px`;
        createdCanvas.style.width = '100%';
        createdCanvas.style.height = '18vh';
        createdCanvas.style.backgroundColor = 'green';
        userVideoDOM.parentElement.appendChild(createdCanvas);
    } else {
        const canvasElement = document.getElementsByClassName(userId);
        if (canvasElement[0]) canvasElement[0].remove();
    }
}

export function createSocketConnectionInstance(settings = {}) {
    return new SocketConnection(settings);
}
