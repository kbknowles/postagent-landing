module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#11346e;',
        secondary: '#224949',
        accent: '#4FAF95',
        blueAccent: '#5C7AEA',
        background: '#EEF1F3',
        text: '#2B2B2B',
        muted: '#B0B8C1',
        highlight: '#6fa287',
      },
    },
  },
  plugins: [],
};
