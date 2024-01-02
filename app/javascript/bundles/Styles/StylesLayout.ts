import {makeStyles} from "@mui/styles";
import Colors from "../Styles/Colors";
import {Theme} from "../State/ThemeContext";

interface Props {
  theme: Theme
}

const useStyles = makeStyles({
    mainContainer: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: (props: Props) => {
          if(props.theme === Theme.Light) {
            return Colors.backgroundGrey
          }
          return Colors.backgroundGreyDark
        },
      },
})

export default useStyles