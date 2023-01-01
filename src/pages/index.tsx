import Image from 'next/image'
import { styled } from '@/styles/stitches.config'
import Ttm from '@/assets/rocket.svg'

export default function Home() {
  return (
    <HomeContainer>
      <AboutContainer>
        <h1>Metacash</h1>
        <h4>Community-focused launchpad for the next generation crypto gems</h4>
        <p>KrystalGO brings blockchain startups and community investors together in a cutting edge token sale platform that ensures both quality and ease of access</p>
      </AboutContainer>
      <TtmContainer>
        <Image src={Ttm} alt="To the moon" width={400} height={400} priority />
      </TtmContainer>
    </HomeContainer>
  )
}

const HomeContainer = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  maxWidth: '990px',
  height: '100%',
  width: '100%',
  marginTop: '80px',

  '@sm': {
    flexDirection: 'column',
    marginTop: '40px',
  }
})

const AboutContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',

  '@sm': {
    alignItems: 'center',
    justifyContent: 'center',
  },

  h1: {
    color: '$gray100',
    fontWeight: '400',

    '@sm': {
      fontSize: '2.5rem', // 48px
    },

    '@md': {
      fontSize: '1.5rem', // 24px
    },

    '@lg': {
      fontSize: '2.5rem', // 48px
    },

    '@xl': {
      fontSize: '3.5rem', // 56px
    },
  },

  h4: {
    color: '$gray100',
    fontWeight: '400',
    marginTop: '20px',

    '@sm': {
      fontSize: '1.125rem', // 18px
    },

    '@md': {
      fontSize: '0.875rem', // 14px
    },

    '@lg': {
      fontSize: '1.25rem', // 20px
    },

    '@xl': {
      fontSize:  '1.5rem', // 24px
    }
  },

  p: {
    color: '$gray200',
    fontWeight: '400',
    marginTop: '20px',

    '@sm': {
      fontSize: '0.875rem', // 14px
    },

    '@md': {
      fontSize: '0.75rem', // 12px
    },

    '@lg': {
      fontSize: '1rem', // 16px
    },

    '@xl': {
      fontSize: '1.125rem', // 18px
    }
  }
})

const TtmContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',

  img: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',

    '@sm': {
      width: '300px',
      height: '300px',
      marginTop: '30px',
    },

    '@md': {
      width: '300px',
      height: '300px',
    },

    '@lg': {
      width: '400px',
      height: '400px',
    },

    '@xl': {
      width: '500px',
      height: '500px',
    },
  }
})
