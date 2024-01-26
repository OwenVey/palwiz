import * as radixColors from '@radix-ui/colors';
import type { Config } from 'tailwindcss';
import { createPlugin } from 'windy-radix-palette';

const colors = createPlugin({
  colors: {
    gray: radixColors.gray,
    grayDark: radixColors.grayDark,
    cyan: radixColors.cyan,
    cyanDark: radixColors.cyan,
    red: radixColors.red,
    redDark: radixColors.redDark,
  },
});

const config = {
  darkMode: ['class'],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        primary: colors.alias('cyan'),
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [colors.plugin, require('tailwindcss-animate')],
} satisfies Config;

export default config;
