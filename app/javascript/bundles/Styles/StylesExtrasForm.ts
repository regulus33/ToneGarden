import {makeStyles, createStyles} from "@material-ui/styles";
import Colors from "./Colors";
interface Props {
    dominantColor: string,
}

const useStyles = makeStyles((props: Props) =>
    createStyles({
        root: {
            marginTop: '24px',
            width: '100%',
            borderTop: `1px solid ${Colors.borderGrey}`,
        },
        accordian: {
          boxShadow: 'none'
        },
        secondaryHeading: {
            fontSize: '12px',
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
            marginTop: '14px',
            padding: '8px'
        },
    }),
);

export default useStyles