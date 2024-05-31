'use client';

import { Roboto } from 'next/font/google';
import { extendTheme } from '@mui/material/styles';
import "~/styles/globals.css";

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
});

const theme = extendTheme({
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    main: "#4CAF50",
                    dark: "#388E3C",
                    light: "#81C784"
                },
            }
        }
    },
    typography: {
        fontFamily: roboto.style.fontFamily,
    },
});

export default theme;
