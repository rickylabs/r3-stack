'use client';

import { useMemo } from 'react';
import {CssVarsProvider, extendTheme, type ThemeOptions} from '@mui/material/styles';
import { palette } from './palette';
import { shadows } from './shadows';
import { typography } from './typography';
import { customShadows } from './custom-shadows';
import { componentsOverrides } from './overrides';
import { createPresets } from './options/presets';
import {type PresetsConfig} from "tailwindcss/types/config";
import "~/styles/globals.css";
import ThemeSwitcher from "~/theme/themeSwitcher";
import {useTheme} from "next-themes";
import {getInitColorSchemeScript} from "@mui/material";

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
  mode: string | undefined;
};

const settings = {
    themeMode: 'system',
    themeDirection: 'ltr',
    themeColorPresets: 'default',
} as PresetsConfig;

const presets = createPresets(settings.themeColorPresets);

const params = (mode: string | undefined) => {
    return {
        palette: {
            ...palette(mode ?? settings.themeMode),
            ...presets.palette,
        },
        customShadows: {
            ...customShadows(mode ?? settings.themeMode),
            ...presets.customShadows,
        },
        shadows: shadows(mode ?? settings.themeMode),
        shape: { borderRadius: 8 },
        typography,
    };
}


export default function ThemeProvider({ children, mode }: Props) {
  const { theme: currentTheme } = useTheme();

  const memoizedValue = useMemo(
    () => {
        return {
            ...params(currentTheme ?? mode),
        }
    },
    [currentTheme]
  )

  console.log(memoizedValue.palette.mode)

  const dynamicTheme = extendTheme(memoizedValue as ThemeOptions);

  dynamicTheme.components = componentsOverrides(dynamicTheme);

  return (
      <CssVarsProvider
          theme={dynamicTheme}
          attribute="theme"
          colorSchemeSelector="#mode-toggle"
          modeStorageKey="theme"
      >
          {getInitColorSchemeScript()}
          <ThemeSwitcher/>
          {children}
      </CssVarsProvider>
  );
}
