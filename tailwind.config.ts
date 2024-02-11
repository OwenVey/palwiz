import containerQueriesPlugin from '@tailwindcss/container-queries';
import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import { createPlugin } from 'windy-radix-palette';

const glassPlugin = plugin(({ matchUtilities, theme }) => {
  matchUtilities(
    {
      glass: (value, { modifier }) => {
        const extendedBy = typeof modifier === 'string' ? modifier : '6rem';
        const cutoff = `calc(100% - ${extendedBy})`;

        return {
          '&::after': {
            'pointer-events': 'none',
            content: "''",
            position: 'absolute',
            inset: '0',
            // Extend backdrop surface to the bottom
            bottom: `calc(-1 * ${extendedBy})`,
            // Mask out the part falling outside the nav
            '-webkit-mask-image': `linear-gradient(to bottom, black 0, black ${cutoff}, transparent ${cutoff})`,
            'backdrop-filter': `blur(${value?.toString() ?? '1rem'})`,
          },
        };
      },
    },
    {
      values: {
        ...theme('spacing'),
        DEFAULT: theme('spacing.4'),
      },
      modifiers: theme('spacing'),
    },
  );
});

const colors = createPlugin();

const config = {
  future: {
    hoverOnlyWhenSupported: true,
  },
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
        primary: colors.alias('purple'),
        gray: colors.alias('mauve'),
      },
      fontFamily: {
        title: ['var(--font-vinque)'],
        sans: ['var(--font-inter)'],
        mono: ['var(--font-geist-mono)'],
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
  plugins: [colors.plugin, require('tailwindcss-animate'), glassPlugin, containerQueriesPlugin],
} satisfies Config;

export default config;
