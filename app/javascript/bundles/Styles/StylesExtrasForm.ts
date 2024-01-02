import {makeStyles, createStyles} from "@mui/styles";
import Colors from "./Colors";
import Breakpoints from "./Breakpoints";

interface Props {
    dominantColor: string,
}

const useStyles = makeStyles((props: Props) =>
    createStyles({
        root: {
            marginTop: '1.7rem',
            borderTop: `.07rem solid ${Colors.borderGrey}`,
        },
        secondaryHeading: {
            fontSize: '.8rem',
            color: Colors.deepGrey,
        },
        icon: {
            verticalAlign: 'bottom',
            height: 20,
            width: 20,
        },
        column: {
            flexBasis: '33.33%',
        },
        largeSlider: {
            '& label' : {
                maxWidth: '1000%',
            },
            marginTop: '1rem',
            padding: '2rem',
            [`@media(max-width: ${Breakpoints.mobile})`]: {
                padding: '.4rem 2rem'
            }
        },
      accordion: {

      }
    }),
);

export default useStyles
