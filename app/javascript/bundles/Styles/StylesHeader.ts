import {makeStyles} from "@material-ui/core/styles";
import FunctionName from "../Utils/FunctionName";
// TODO: where is this theme spacing coming from?

interface Props {
    dominantColor: string,
    secondaryColor: string
}

const useStyles = makeStyles((theme) => ({
    root: (props: Props) => {
        console.log(`[${FunctionName()}]: value of props:`)
       return  {
            flexGrow: 1,
        }
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default useStyles