import {makeStyles} from "@mui/styles";

const useStyles = makeStyles({
    container: {
        marginTop: 56,
        backgroundColor: '#301D54',
        position: 'relative',
        // display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center',
        // flexDirection: 'column',
        // width: '100%',
        // position: 'absolute',
        // top: '50%',
        // left: '50%',
        // transform: 'translate(-50%, -50%)',
    },
    hero: {
        width: '100%'
    },
    cta: {
        position: "absolute",
        right: 0,
        top: '50%',
        right: '5%'

    }
})

export default useStyles