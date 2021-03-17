import React, {useState} from 'react';
import {Button, Drawer, Input} from '@material-ui/core';
import {getMessageDateOrTime} from '../../utils/helper';
import {withStyles} from "@material-ui/core/styles";
import {styles} from './styles';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChatIcon from '@material-ui/icons/Chat';

const IndexComponent = ({myDetails,socketInstance,chatToggle,closeDrawer,messages,classes}) => {
    const [chatText, setChatText] = useState('');

    const handleChatText = (event) => {
        const {value} = event.target;
        setChatText(value);
    }

    const handleSendText = (event) => {
        if (!(chatText.length > 0)) return;
        if (event.type === 'keyup' && (event).key !== 'Enter') {
            return;
        }
        const messageDetails = {
            message: {
                message: chatText,
                timestamp: new Date()
            },
            userData: {...myDetails}
        }
        socketInstance.boradcastMessage(messageDetails);
        setChatText('');
    }

    return (
        <React.Fragment>
            <Drawer className={classes.chatDrawer} anchor={'right'} open={chatToggle} onClose={closeDrawer}>
                <div className={classes.chatHeadWrapper}>
                    <div className={classes.chatDrawerBackIcon} onClick={closeDrawer}>
                        <ChevronRightIcon/>
                    </div>
                    <div className={classes.chatHeader}>
                        <ChatIcon/>
                        <h3 className="char-header-text">Chat</h3>
                    </div>
                </div>
                <div className={classes.chatDrawerList}>
                    {
                        messages?.map((chatDetails) => {
                            const {userData, message} = chatDetails;
                            return (
                                <div className={classes.messageContainer}>
                                    <div
                                        className={!userData.userId ? classes.messageWrapperRight : classes.messageWrapperLeft}>
                                        <div className={classes.messageTitleWrapper}>
                                            <h5 className={classes.messageName}>{userData.name}</h5>
                                            <span
                                                className={classes.messageTimestamp}>{getMessageDateOrTime(message.timestamp)}</span>
                                        </div>
                                        <p className={classes.actualMessage}>{message.message}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className={classes.chatDrawerInputWrapper} onKeyUp={handleSendText}>
                    <Input
                        className={classes.chatDrawerInput}
                        onChange={handleChatText}
                        value={chatText}
                        placeholder="Type Here"
                    />
                    <Button onClick={handleSendText}>Send</Button>
                </div>
            </Drawer>
        </React.Fragment>
    )
}

export default withStyles(styles, {withTheme: true})(IndexComponent);
