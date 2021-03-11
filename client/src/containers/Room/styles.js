export const styles = theme => ({
    fullPage: {
        height: "100%",
        width: "49.8%"
    },
    mainContainer: {
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
        marginRight: 50,
        minWidth: 200,
    },
    headerContainer: {
        height:"8vh",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    copyBlock: {
        display: "flex",
        alignItems: "center",
    },
    headerTextBlock: {
        width: "65%",
        display: "flex",
        justifyContent: "space-around",
    },
    headerFuncBlock: {
        width: "34%",
        display: "flex",
        alignItems: "center",
    },
    roomContainer: {
        backgroundColor: 'black',
        display: 'grid',
        height: '18vh',
        gridGap: '6px 6px',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, auto))',
        gridTemplateRows: 'repeat(auto-fit, minmax(100px, auto))',
        '&>*': {
            width: '100%',
            height: '18vh',
        },
        '&>div>video': {
            '-webkit-transform': 'scaleX(-1)',
            transform: 'scaleX(-1)',
            width: '100%',
            height: '18vh',
        },
        '& > .display-media': {
            '-webkit-transform': 'scaleX(1)',
            transform: 'scaleX(1)',
        }
    },
    footbarTitle: {
        left: 26,
        position: 'relative',
        fontFamily: 'sans-serif',
        color: '#56b96d',
        fontSize: 22,
        fontWeight: 600,
        textShadow: '1px 1px #bcbcbc',
    },
    footbarWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        top: 'unset',
        bottom: 0,
        position: 'relative',
        backgroundColor: 'white',
        minWidth: 200,
        maxWidth: '100%',
    },
    statusActionBtn: {
        display: 'flex',
        cursor: 'pointer',
        padding: 16,
        boxShadow: '0 0 4px 0px black',
        borderRadius: 6,
        '&:hover': {
            opacity: 0.8,
            boxShadow: '0 0 4px 1px black',
        }
    },
    micOrCamBtn: {
        color: 'black',
    },
    endCallBtn: {
        backgroundColor: 'red',
        margin: 'auto',
    },
    chatBtn: {
    color:  '#56b96d',
    width: 40,
    cursor: 'pointer'
}

});
