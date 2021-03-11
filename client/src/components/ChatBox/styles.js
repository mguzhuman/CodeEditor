export const styles = theme => ({
    chatDrawer: {
        fontFamily: 'sans-serif',
        '&>.MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorRight.MuiPaper-elevation16': {
            width: 340
        },
        '@media screen and (max-width: 600px)': {
            '&>.MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorRight.MuiPaper-elevation16': {
                width: '100%'
            }
        }
    },
    chatHeadWrapper: {
        borderBottom: '1px solid gray',
        boxShadow: '0px 0px 2px 0px grey',
    },
    chatHeader: {
        width: '100%',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&> svg': {
            color: '#56b96d'
        }
    },
    chatDrawerList: {
        margin: 6,
        marginRight: 10,
        marginBottom: 58,
        overflowY: 'auto',
    },
    messageContainer: {
        display: 'flow-root',
        margin: '6px 4px 0 0',
        '&:last-child': {
            marginBottom: 10
        }
    },
    messageWrapperLeft: {
        boxShadow: '0 1px 6px -2px black',
        // border: '1px solid',
        float: 'left',
        minWidth: 85,
        maxWidth: 185,
        borderRadius: 4,
        fontSize: 14,
    },
    messageWrapperRight: {
        boxShadow: '0 1px 6px -2px black',
        // border: '1px solid',
        float: 'right',
        minWidth: 85,
        maxWidth: 185,
        borderRadius: 4,
        fontSize: 14,
    },
    messageTitleWrapper: {
        backgroundColor: '#f3f3f3',
        borderRadius: '4px 4px 0 0',
        padding: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    messageName: {
        margin: 0,
    },
    messageTimestamp: {
        fontSize: 10,
    },
    actualMessage: {
        margin: 4,
        lineBreak: 'anywhere',
    },
    chatDrawerBackIcon: {
        background: '#f3f3f3',
        borderRadius: 24,
        padding: 10,
        marginLeft: 14,
        color: 'white',
        width: 24,
        height: 24,
        marginTop: 8,
        cursor: 'pointer',
        position: 'absolute',
    },
    chatDrawerInputWrapper: {
        padding: 10,
        display: 'flex',
        justifyContent: 'space-between',
        borderTop: '1px solid gray',
        boxShadow: '0px 0px 4px 0px grey',
        backgroundColor: 'white',
        bottom: 0,
        position: 'absolute',
        right: 0,
        left: 0,
    },
    chatDrawerInput: {
        width: '100%'
    }
})
