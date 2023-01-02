import { styled } from '@/styles/stitches.config'

export function Footer() {
  return (
    <FooterContainer>
      <p>
        Made with ❤️ by Metacash
      </p>
    </FooterContainer>
  )
}

export const FooterContainer = styled('footer', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '60px',
  backgroundColor: '$gray800',
  color: '$gray200',
  fontSize: '12px',
  p: {
    margin: '0',
  },
})
