import { globalCss } from './stitches.config';
import 'react-circular-progressbar/dist/styles.css'

export const globalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },

  body: {
    '--webkit-font-smoothing': 'antialiased',
    '--moz-osx-font-smoothing': 'grayscale',
  },

  'body, input, button': {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 400
  },

  'a': {
    textDecoration: 'none',
  }
})