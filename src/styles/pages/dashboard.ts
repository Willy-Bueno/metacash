import { styled } from '../stitches.config'

export const DashboardContainer = styled('div', {
  maxWidth: '1180px',
  height: '100%',
  width: '100%',


  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
})


export const DashboardSectionHeader = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',

  marginTop: '5rem',  //40px

  'h1': {
    fontSize: '1.875rem', //30px
    fontWeight: '400',
    color: '$white',
    textTransform: 'capitalize',
    whiteSpace: 'nowrap'
  }
})






