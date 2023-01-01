import { styled } from '../stitches.config'

export const FormContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  maxWidth: '990px',
  width: '100%',

  padding: '1rem',

  backgroundColor: '$gray800',
  borderRadius: '8px',

  margin: '2rem 0',

  'h1': {
    fontSize: '1.5rem',
    color: '$gray100',
    marginBottom: '1rem'
  },
})

export const Form = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  width: '100%',

  'div': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',

    width: '100%',

    marginBottom: '1rem',

    'label': {
      fontSize: '0.875rem',
      color: '$gray100',
      marginBottom: '0.2rem'
    },

    'input': {
      width: '100%',
      height: '2.5rem',
      padding: '0.5rem',
      borderRadius: '8px',
      border: 'none',
      backgroundColor: '$gray900',

      color: '$gray100',
      fontSize: '0.875rem'
    }
  }
})

export const FormButtonSubmit = styled('button', {
  width: '180px',
  height: '2.5rem',
  padding: '0.5rem',
  borderRadius: '8px',
  border: 'none',
  backgroundColor: '$green400',
  color: '$gray900',
  fontSize: '0.875rem',
  fontWeight: 'bold',
  marginTop: '1rem',
  transition: 'all 0.2s',

  '&:hover': {
    filter: 'brightness(0.8)'
  }
})
