/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  plugins: ['prettier-plugin-organize-imports', 'prettier-plugin-tailwindcss'],
  printWidth: 120,
  endOfLine: 'auto',
  tailwindFunctions: ['clsx', 'cn', 'twMerge', 'cva'],
};

export default config;
