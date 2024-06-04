import * as React from "react";
import {type SupportedColorScheme, useColorScheme} from "@mui/material";
import {ModeNight, WbSunny} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { useTheme } from "next-themes";

const useEnhancedEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

const ThemeSwitcher = () => {
    const {mode, setMode, systemMode} = useColorScheme();
    const { theme, setTheme } = useTheme();
    const [isMounted, setIsMounted] = React.useState<boolean>(false)
    const [colorScheme, setColorScheme] = React.useState<SupportedColorScheme | "system" | null>(systemMode ?? null)

    useEnhancedEffect(() => {
        setIsMounted(true)
    }, [])

    React.useEffect(() => {
        if (systemMode) {
            setMode(systemMode)
        }
    }, [systemMode])

    React.useEffect(() => {
        if (isMounted && mode) {
            setColorScheme(mode)
            setTheme(mode)
            document.cookie = `theme=${mode}`
        }
    }, [isMounted, mode])

    return (
        <Box display={"flex"} alignItems={"center"}>
            <IconButton
                aria-label={`switch theme mode`}
                color="primary"
                //variant="contained"
                sx={{position: "absolute", zIndex:2, top:15, left: 15}}
                onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
            >
                {colorScheme === 'dark' ?
                    <ModeNight
                        sx={{
                            opacity: colorScheme ? 1 : 0,
                            transition: "opacity ease .3s"
                        }}/> :
                    <WbSunny
                        sx={{
                            opacity: colorScheme ? 1 : 0,
                            transition: "opacity ease .3s",
                        }}
                    />
                }
            </IconButton>
        </Box>

    );
}

export default ThemeSwitcher