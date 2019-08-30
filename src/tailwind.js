module.exports = {
  theme: {
    colors: {
      black: '#000000', // print text color
      blue: {
        light: '#2380bf',
        default: '#1a7bbc' // primary/outline buttons
      },
      gold: '#ffbe22', // help line
      gray: {
        lightest: '#f5f5f8', // homepage search background
        lighter: '#f0f0f0', // official banner
        light: '#a9aeb1',
        default: '#71767a',
        dark: '#4e4e4e', // alternative header text
        darker: '#2c3747',
        darkest: '#171717' // body text
      },
      green: '#49830C',
      teal: {
        lighter: '#F1F5F6',
        light: '#759aac',
        default: '#44bae6' // homepage accent background
      },
      transparent: 'transparent',
      white: '#ffffff'
    },
    container: {
      center: true,
      padding: '1rem'
    },
    fontFamily: {
      heading: ['Roboto Condensed', 'sans-serif'],
      sans: ['Public Sans', 'sans-serif']
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px'
    },
    extend: {
      screens: {
        print: { raw: 'print' }
      }
    }
  },
  plugins: []
};
