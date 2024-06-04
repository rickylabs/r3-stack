"use client";

import React, {createContext, type ReactNode, useContext, useEffect} from "react";
import Toast, {type CustomSnackBarProps} from "~/components/mui/toast";

export const ToastContext = createContext<{toast: (props: CustomSnackBarProps) => void}>({
    toast: () => {},
});

const defaultToastProps: CustomSnackBarProps = {
    open: false,
    onClose: () => {},
    children: undefined,
    title: "Default title",
    message: "Default message",
    alertProps: {severity: "info"},
};


export const ToastProvider = ({children}: {children: ReactNode}) => {
    const [toastProps, trigger] = React.useState<CustomSnackBarProps>(defaultToastProps);

    useEffect(() => {
        if(toastProps.open){
            setTimeout(() => {
                trigger({...defaultToastProps})
            }, toastProps.duration ?? 6000)
        }
    },[toastProps.open])

    const value = {
        toast: trigger,
    }

    return (
        <ToastContext.Provider value={value}>
            {children}
            <Toast
                {...toastProps}
            >
                {toastProps.children}
            </Toast>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);

    if (context === undefined) {
        throw new Error("useUser must be used within a ToastContextProvider.");
    }

    return context;
};
