import {makeStyles} from "@mui/styles";
import FunctionName from "../Utils/FunctionName";
import Breakpoints from "./Breakpoints";

// TODO: where is this theme spacing coming from?

interface Props {
  dominantColor: string,
  secondaryColor: string
}

const useStyles = makeStyles((theme) => ({
  root: (props: Props) => {
    return {
      flexGrow: 1,
    }
  },
  menuButton: {
    marginRight: '2rem',
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    [`@media (max-width: ${Breakpoints.mobile})`]: {
      display: 'none'
    }
  }
}));

export default useStyles
