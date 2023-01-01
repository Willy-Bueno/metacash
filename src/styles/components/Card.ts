import { styled } from '../stitches.config'
import Link from 'next/link'

export const CardContainer = styled(Link, {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  width: '100%',
  maxHeight: '360px',
  height: '100%',

  backgroundColor: '$gray800',
  borderRadius: '16px',

  '@md': {
    maxWidth: '480px',
  },

  '@lg': {
    maxWidth: '300px',
  },

  '@xl': {
    maxWidth: '300px',
  },

  'img': {
    width: '100%',
    height: '120px',
    objectFit: 'cover',
    objectPosition: 'center',
    border: 0,
    borderRadius: '16px'
  },

  '&:hover': {
    cursor: 'pointer',
    transform: 'scale(1.02)',
    transition: 'all 0.2s ease-in-out',
    filter: 'brightness(1.1)'
  }
})


export const CardContent = styled('div', {
  height: '100%',
  width: '100%',
  padding: '1.5rem', // 24px
  backgroundColor: 'inherit',
  borderBottomLeftRadius: '16px',
  borderBottomRightRadius: '16px',

  'header': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    width: '100%',

    'h2': {
      fontSize: '1.25rem', // 20px
      fontWeight: 'bold',
      color: '$white',
      textTransform: 'capitalize'
    },

    'img': {
      width: '24px',
      height: '24px',
      objectFit: 'cover',
      objectPosition: 'center'
    }
  }
})

export const CardItems = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',

  width: '100%',
  
  '&:not(:first-child)': {
    marginTop: '1rem' // 24px
  },

  'p': {
    fontSize: '1rem', // 16px
    color: '$white'
  }
})

export const StatusPool = styled('span', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',

  width: '70px',
  height: '24px',
  borderRadius: '16px',

  margin: '1rem 0 0 0',

  fontSize: '0.75rem', // 12px
  fontWeight: 'bold',
  textTransform: 'uppercase',
  letterSpacing: '0.07em',

  variants: {
    status: {
      'active': {
        backgroundColor: '$green400',
        color: '$white'
      },

      'finished': {
        backgroundColor: '$red500',
        color: '$white'
      }
    }
  }
})
