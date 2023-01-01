import { styled } from '../stitches.config'

export const PoolsContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',

  padding: '2.5rem 0', // 40px

  'section': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',

    'h1': {
      fontSize: '1.875', // 30px
      fontWeight: 'bold',
      color: '$gray100'
    }
  }
})

export const PoolsGrid = styled('div', {
  display: 'flex',
  gap: '3rem', // 48px
  marginTop: '2rem', // 32px
  flexWrap: 'wrap',
  width: '100%',
  justifyContent: 'center',
})
