/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  // theme will overwrite all the existing
  theme: {
    fontFamily: {
      sans: 'Roboto Mono, monospace', // this will give roboto for sans
      // pizzaFont: 'Roboto Mono, monospace',
    },
    // extend is something which keeps the existing tailwind class + our customize things
    extend: {
      // colors: {
      //   pizzaColor: '#0f0',
      // },
      height: { screen: '100dvh' },
    },
  },
  plugins: [],
};
