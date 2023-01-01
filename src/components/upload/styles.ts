import {  styled } from '@/styles/stitches.config'

export const DropContainer = styled('div', {
  border: '1px dashed $gray100',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'height 0.2s ease',
  fontSize: '1rem',
  color: '$gray100',
  
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  padding: '2rem',
  backgroundColor: 'inherit',

  variants: {
    isDragActive: {
      true: {
        borderColor: '#78e5d5',
        color: '#78e5d5'
      },
    },
    isDragReject: {
      true: {
        borderColor: '#e57878',
        color: '#e57878'
      }
    }
  }
})
