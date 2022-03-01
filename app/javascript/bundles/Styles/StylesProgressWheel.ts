import {makeStyles} from "@mui/styles";
import {createStyles} from "@mui/styles";

interface Props {
    dominantColor: string
}

const useStyles = makeStyles((props: Props) =>
    createStyles({
        wrapper: {
            display: 'flex',
            width: '100vw',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'flex-end',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
        },
        bottom: {
            color: 'grey',
        },
        top: {
            color: props.dominantColor,
            animationDuration: '550ms',
        },
        circle: {
            strokeLinecap: 'round',
        },
        container: {
            display: 'flex',
            height: '100vh',
            '& > div': {
                margin: 'auto'
            }
        }
    }),
);

export default useStyles