import { createTheme, responsiveFontSizes } from '@mui/material/styles';

export let theme = createTheme({
  palette: {
    basic: {
      main: '#F3B848',
    },
    substitute: {
      main: '#1C4931',
    },
    colorful: {
      main: '#D85841',
    },
    neutral: {
      main: '#e1e4e5',
    },
    blond: {
      main: '#f8f8f8',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      mobile: 0,
      tablet: 768,
      laptop: 1024,
      desktop: 1440,
    },
  },
  typography: {
    allVariants: {
      fontFamily: ['"Noto Sans"', 'Roboto', 'Arial', 'sans-serif'].join(','),
      textTransform: 'none',
    },
  },
});

theme = responsiveFontSizes(theme);

declare module '@mui/material/styles' {
  interface Palette {
    basic: Palette['primary'];
    substitute: Palette['primary'];
    colorful: Palette['primary'];
    neutral: Palette['primary'];
    blond: Palette['primary'];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    basic?: PaletteOptions['primary'];
    substitute?: PaletteOptions['primary'];
    colorful?: PaletteOptions['primary'];
    neutral?: PaletteOptions['primary'];
    blond?: PaletteOptions['primary'];
  }
}

// Update the Button's color prop options
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    basic: true;
    substitute: true;
    colorful: true;
    neutral: true;
    blond: true;
  }
}

declare module '@mui/material/IconButton' {
  interface IconButtonPropsColorOverrides {
    basic: true;
    substitute: true;
    colorful: true;
    neutral: true;
    blond: true;
  }
}

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    mobile: true; // adds the `mobile` breakpoint
    tablet: true;
    laptop: true;
    desktop: true;
  }
}
