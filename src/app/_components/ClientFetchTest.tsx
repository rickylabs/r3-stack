"use client"


import {api} from "~/trpc/react";
import Button from "@mui/material/Button";
import React from "react";
import {useToast} from "~/providers/ToastProvider/ToastProvider";

export const ClientFetchTest = () => {
    const [hello, _] = api.example.hello.useSuspenseQuery({text: "from tRPC"});
    const {toast} = useToast();

    return (
        <>
            <p className="text-2xl">{hello?.greeting} from client</p>
            <Button
                onClick={() => toast({
                    open: true,
                    title: "Logged out",
                    children: <>You have been logged out</>,
                    alertProps: {severity: "info"},
                })}
            >open Toast</Button>
        </>
    );
};