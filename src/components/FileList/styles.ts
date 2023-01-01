import { styled } from '@/styles/stitches.config'
import Image from 'next/image'

export const FileContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  height: '100%',
  padding: '1rem',
  borderRadius: '8px',
})

export const FileInfo = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
  width: '100%',
  height: '100%',
  
  'div': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',

    'span': {
      fontSize: '0.875rem',
      color: '$gray100',
      marginTop: '0.5rem',

      'button': {
        border: 0,
        backgroundColor: 'transparent',
        color: '#e57878',
        marginLeft: '0.5rem',
        cursor: 'pointer',
      }
    }
  },

  'div.status': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'right',
    flexDirection: 'row',
  }
})

export const Preview = styled(Image, {
  width: '150px',
  height: '50px',
  borderRadius: '8px',
  backgroundImage: `url('${({ src }: any) => src})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  marginRight: '1rem',
})
