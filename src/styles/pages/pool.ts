import { styled } from '../stitches.config'

export const PoolContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',

  maxWidth: '990px',
  width: '100%',
  padding: '2.5rem 0', // 40px

  'img': {
    maxWidth: '1180px',
    width: '100%',
    maxHeight: '20.625rem', // 330px
    height: '100%',
    borderRadius: '16px',

    objectFit: 'cover',
    objectPosition: 'center',

    '@sm': {
      maxHeight: '25rem', // 400px
    }
  },

  'header': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',

    marginTop: '2.5rem', // 40px
    width: '100%',

    gap: '1.25rem',  // 20px
    
    'h1': {
      fontSize: '1.875rem', // 30px
      fontWeight: '400',
      color: '$white',
      textTransform: 'capitalize'
    },

    'div': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: '1.25rem', // 20px
    }
  },
})

export const PoolContent = styled('div', {
  marginTop: '2.5rem', // 40px
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  justifyContent: 'space-between',

  '@sm': {
    flexWrap: 'wrap',
  },

  '@md': {
    flexWrap: 'wrap',
  },

  '@lg': {
    flexWrap: 'wrap',
  }
})


export const Status = styled('div', {
  width: '100%',

  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',

  padding: '0.4rem .825rem', // 6px 13px
  borderRadius: '16px',

  fontSize: '0.675rem', // 11px
  fontWeight: '400',
  color: '$white',
  textTransform: 'uppercase',

  backgroundColor: '$gray600',
})

export const PoolInfoWrapper = styled('div', {
  maxWidth: '300px',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',

  '@sm': {
    flexDirection: 'row',
    maxWidth: '100%',
    gap: '1.25rem', // 20px
    flexWrap: 'wrap',
  },

  '@md': {
    maxWidth: '100%',
    flexDirection: 'row',
    gap: '1.25rem', // 20px
    flexWrap: 'wrap',
  },

  '@lg': {
    flexDirection: 'row',
    maxWidth: '100%',
    gap: '1.25rem', // 20px
  }
})


export const PoolInfo = styled('div', {
  width: '100%',
  backgroundColor: '$gray800',
  borderRadius: '16px',
  padding: '1.875rem', // 30px

  display: 'flex',
  flexDirection: 'column',

  gap: '2.5rem', // 40px

  '@md': {
    flexWrap: 'wrap',
  },
  
  'div': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1.5rem', // 24px
  
    'h4': {
      fontSize: '1rem', // 16px
      fontWeight: '500',
      color: '$gray100',
      textTransform: 'capitalize'
    },

    'p': {
      fontSize: '0.875rem', // 14px
      fontWeight: '400',
      color: '$white',
      textTransform: 'capitalize'
    }
  }
})

export const PoolContribute = styled('div', {
  color: '$white',
  width: '100%',
  backgroundColor: '$gray800',
  borderRadius: '16px',
  padding: '1.875rem', // 30px
  marginTop: '2.5rem', // 40px

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  '@lg': {
    height: '100%',
    margin: 0
  },

  'form': {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    gap: '1rem', // 16px
    'input': {
      width: '50%',
      height: '2.25rem', //  36px
      borderRadius: '24px',
      padding: '0 1.5rem', // 24px
  
      fontSize: '1rem', // 16px
      fontWeight: '400',
      color: '$white',
      backgroundColor: '$gray900',
      border: 'none',
      outline: 'none',
      caretColor: '$white',
  
      '&::placeholder': {
        color: '$gray400'
      },
  
      '&:focus': {
        backgroundColor: '$gray600'
      }
    },
  
    'input[type="number"]': {
      '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',
        '-moz-appearance': 'textfield',
        margin: 0,
      },
    },
  }
})

export const PoolContributeButton = styled('button', {
  width: '100%',
  height: '2.25rem', //  36px
  borderRadius: '4px',
  padding: '0 1.5rem', // 24px
  marginTop: '1.25rem', // 20px

  fontSize: '1rem', // 16px
  fontWeight: '500',
  color: '$white',
  backgroundColor: '$gray900',
  border: 'none',
  outline: 'none',
  transition: 'All 0.2s',
  cursor: 'pointer',

  textTransform: 'uppercase',

  '&:hover': {
    filter: 'brightness(0.8)'
  }
})

export const PoolDescriptionContainer = styled('div', {
  width: '100%',

  backgroundColor: '$gray800',
  borderRadius: '16px',
  padding: '1.875rem', // 30px
  marginLeft: '2.5rem', // 40px

  '@sm': {
    marginLeft: 0,
    marginTop: '2.5rem', // 40px
  },

  '@md': {
    marginLeft: 0,
    marginTop: '2.5rem', // 40px
  },

  '@lg': {
    marginLeft: 0,
    marginTop: '2.5rem', // 40px
  },

  'nav': {
    height: '45px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '1.5rem', // 24px

    'h2': {
      fontSize: '1.125rem', // 18px
      fontWeight: '400',
      color: '$white',
      textTransform: 'capitalize'
    },
  }
})

export const PoolDescriptionContent = styled('div', {
  marginTop: '1.875rem', // 30px
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',

  'iframe': {
    position: 'relative',
    width: '100%',
    border: 'none',
  },
})

export const PoolDescriptionText = styled('div', {
  marginTop: '1.875rem', // 30px
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  gap: '1.25rem', // 20px

  'p': {
    fontSize: '0.825rem', //  13px
    fontWeight: '400',
    color: '$gray100',
    textTransform: 'capitalize'
  }
})

export const TableContainer = styled('div', {
  marginTop: '1.875rem', // 30px
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-ce',
  justifyContent: 'flex-start',
  gap: '1.25rem', // 20px
  overflowX: 'scroll',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  width: '100%',

  'table': {
    width: '990px',
    borderCollapse: 'collapse',
    borderSpacing: 0,

    'th': {
      fontSize: '0.825rem', //  13px
      fontWeight: '400',
      color: '$gray100',
      textTransform: 'capitalize',
      padding: '0.625rem 0', // 10px 0
      borderBottom: '1px solid $gray600',
    },

    'td': {
      fontSize: '0.825rem', //  13px
      fontWeight: '400',
      color: '$gray100',
      textTransform: 'capitalize',
      padding: '0.625rem 0', // 10px 0
      borderBottom: '1px solid $gray600',
      textAlign: 'center',
    },
  },
})

export const RequestWithdrawButton = styled('button', {
  width: '100%',
  height: '2.25rem', //  36px
  borderRadius: '4px',
  padding: '0 1.5rem', // 24px
  marginTop: '1.25rem', // 20px

  fontSize: '1rem', // 16px
  fontWeight: '500',
  color: '$white',
  backgroundColor: '$green500',
  border: 'none',
  outline: 'none',
  transition: 'All 0.2s',

  textTransform: 'uppercase',

  cursor: 'pointer',

  '&:hover': {
    filter: 'brightness(0.8)'
  }
})