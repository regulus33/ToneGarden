import * as React from 'react'
import {FunctionComponent, forwardRef} from "react";
import {Menu} from '@mui/material'
import {IconButton} from "@mui/material";
import {MoreVert} from "@mui/icons-material";

interface Option {
    keyPass: number|string,
    Component: any,
    onClick: (event: any) => void,
    disabled: boolean
}

interface Props {
    options: Array<Option>
}

const ITEM_HEIGHT = 48

const DropDown: FunctionComponent<Props> = forwardRef((props: Props, ref) => {


    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    return (
        <div>
            <div>
                <IconButton aria-label="settings" onClick={handleClick} size="large">
                    <MoreVert/>
                </IconButton>
            </div>
            <Menu
                ref={ref}
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >
                {props.options.map( (option, index )   => {
                       const { keyPass, Component, onClick, disabled } = option
                       return(<Component disabled={disabled} keyPass={keyPass} key={index} onClick={(e) => {
                           onClick(e)
                           handleClose()
                       }
                       }/>)
                    }
                )}
            </Menu>
        </div>
    );
})

export default DropDown
