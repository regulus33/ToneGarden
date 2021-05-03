import {makeStyles} from "@material-ui/styles";
import {createStyles} from "@material-ui/core";

interface Props {
 dominantColor: string
}

const useStyles = makeStyles((props: Props) =>
    createStyles({
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