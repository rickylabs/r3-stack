'use client';

import {createContext, Dispatch, SetStateAction, useContext, useEffect, useLayoutEffect, useState} from 'react';
import {AppRouterCacheProvider} from "@mui/material-nextjs/v13-appRouter";
import "~/styles/globals.css";
import "~/styles/background.css";
// ----------------------------------------------------------------------

type Props = {
    children: React.ReactNode;
};

export const ThemeWrapperContext = createContext<{setNode: Dispatch<SetStateAction<HTMLElement | null>>, node: HTMLElement | null}>({
    setNode: () => null,
    node: null
});

const useEnhancedEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function ThemeWrapperProvider({ children }: Props) {
    const [node, setNode] = useState<HTMLElement | null>(null);

    useEnhancedEffect(() => {
        setNode(document.getElementById('mode-toggle'));
    }, []);


    const value = {
        setNode: setNode,
        node
    }

    return (
        <AppRouterCacheProvider options={{ enableCssLayer: true, prepend:true }}>
            <ThemeWrapperContext.Provider value={value}>
                {children}
            </ThemeWrapperContext.Provider>
        </AppRouterCacheProvider>
    );
}

export const useThemWrapper = () => {
    const context = useContext(ThemeWrapperContext);

    if (context === undefined) {
        throw new Error("useUser must be used within a ToastContextProvider.");
    }

    return context;
};
