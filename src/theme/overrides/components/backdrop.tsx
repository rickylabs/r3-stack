import { alpha, Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export function backdrop(theme: Theme) {
  return {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(theme.palette.background.default, 0.6),
          backdropFilter: `blur(${4}px)`
        },
        invisible: {
          background: 'transparent',
        },
      },
    },
  };
}
