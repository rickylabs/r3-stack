"use client"

import * as React from 'react';
import {type Dispatch, type SetStateAction} from 'react';
import Snackbar, {type SnackbarProps} from '@mui/material/Snackbar';
import MuiAlert, {type AlertProps} from '@mui/material/Alert';

const DynamicAlert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return (
        <MuiAlert elevation={6} ref={ref} variant="standard" {...props}>
            {props.children}
        </MuiAlert>
    )
});

export interface CustomSnackBarProps extends SnackbarProps {
    alertProps: AlertProps
    duration?: SnackbarProps["autoHideDuration"]
    callback?: Dispatch<SetStateAction<boolean>>
}

const Toast = (props: CustomSnackBarProps) => {
    const [open, setOpen] = React.useState<boolean | undefined>(props.open);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    React.useEffect(() => {
        if (typeof props.callback === "function" && open === false) {
            props.callback(open)
        }
    }, [open])

    React.useEffect(() => {
        setOpen(props.open)
    }, [props.open])

    return (
        <Snackbar open={open} autoHideDuration={props.duration ?? 6000} onClose={handleClose} sx={{top: "50px !important"}} anchorOrigin={props.anchorOrigin ? props.anchorOrigin : {horizontal: "right", vertical: "top"}}>
            <DynamicAlert onClose={handleClose} severity="success" sx={{width: '100%'}} {...props.alertProps}>
                {props.children ?? props.alertProps.severity ?? ""}
            </DynamicAlert>
        </Snackbar>
    );
}

export default Toast
