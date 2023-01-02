import { styled } from '@/styles/stitches.config'

export const AppContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  minHeight: 'calc(100vh - 140px)',
  padding: '0 1.5rem',
  backgroundColor: '$gray900',
})
