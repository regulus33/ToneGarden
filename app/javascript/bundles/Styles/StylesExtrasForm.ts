import {makeStyles, createStyles} from "@material-ui/styles";
import Colors from "./Colors";
interface Props {
    dominantColor: string,
}

const useStyles = makeStyles((props: Props) =>
    createStyles({
        root: {
            marginTop: '1.7rem',
            width: '100%',
            borderTop: `.07rem solid ${Colors.borderGrey}`,
        },
        accordian: {
          boxShadow: 'none'
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
            marginTop: '1rem',
            padding: '.57rem'
        },
    }),
);

export default useStyles