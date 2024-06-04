"use client";

import * as React from 'react';
import Dialog, {type DialogProps} from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import {Stack, useTheme} from "@mui/material";
import {Close} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import {useRouter} from "next/navigation";

type DialogScreenProps = DialogProps & {
    title?: React.ReactNode | string
    intro?: React.ReactNode | string
    actions?: React.ReactNode
    callBackUrl?: __next_route_internal_types__.RouteImpl<string>;
    refreshOnClose?: boolean;
}

export const DialogScreen = (props: DialogScreenProps) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const router = useRouter()

    function closeModal() {
        if(typeof props.onClose === "function"){
            props.onClose(() => {}, 'backdropClick')
        }

        if (props.callBackUrl) {
            router.push(props.callBackUrl)
            props.refreshOnClose && router.refresh()
        }
    }

    return (
        <>
            <Dialog
                fullScreen={fullScreen}
                {...props}
                aria-labelledby="responsive-dialog-title"
                scroll="paper"
            >
                <IconButton
                    onClick={closeModal}
                    sx={{position: "absolute", right: 10, top: 10, zIndex: 1}}
                >
                    <Close/>
                </IconButton>
                <DialogTitle id="responsive-dialog-title" sx={{position: "relative"}}>
                    {props.title ?? "Add your title here"}
                </DialogTitle>
                <DialogContent sx={{maxWidth: "100%", overflow: "hidden", overflowY: "auto"}}>
                    <Stack spacing={4} height={"100%"}>
                        {props.intro && props.intro}
                        {props.children}
                    </Stack>
                </DialogContent>
                {props.actions &&
                    <DialogActions>
                        {props.actions}
                    </DialogActions>
                }
            </Dialog>
        </>
    );
}
