import { createStitches } from '@stitches/react'

export const { styled, css, globalCss, keyframes, getCssText, theme, createTheme, config } = createStitches({
  theme: {
    colors: {
      white: '#FFF',

      gray900: '#121214',
      gray800: '#202024',
      gray600: '#323238',
      gray200: '#A9A9B2',
      gray100: '#E1E1E6',

      green500: '#00875F',
      green400: '#00B37E',

      red500: '#E83F5B',
      red400: '#FF6680',

      gradient: 'linear-gradient(90.18deg, #4C3F91 -2.73%, #9145B6 34.35%, #B958A5 69.72%, #FF5677 106.79%)',
    }
  },

  media: {
    xl: '(min-width: 1080px)',
    lg: '(min-width: 720px) and (max-width: 1079px)',
    md: '(min-width: 480px) and (max-width: 719px)',
    sm: '(min-width: 330px) and (max-width: 479px)',
  }
})
