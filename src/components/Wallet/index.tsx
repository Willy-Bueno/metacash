import { styled } from '@/styles/stitches.config'

import { useAuth } from '@/hooks';
import { useEffect, useState } from 'react';
import { getBalance } from '@/utils/get-balance';


import { useRouter } from 'next/router';
import Link from 'next/link';
import { SelectNetwork } from '../SelectNetwork';
import { IoLogOutOutline } from 'react-icons/io5';

export function Wallet() {
  const { asPath } = useRouter()
  const { isAuthenticated, address, signin, logout, chainId } = useAuth()
  const [truncatedAddress, setTruncatedAddress] = useState('')
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    if(address) {
      const truncated = address.slice(0, 4) + '...' + address.slice(-4)
      setTruncatedAddress(truncated)
    }
  }, [address])

  async function handleLogin() {
    try {
      await signin()
    } catch (error) {
      console.log(error)
    }
  }

  function handleLogout() {
    try {
      logout()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if(address) {
      getBalance(isAuthenticated, address, setBalance)
      
    }
  }, [address, isAuthenticated, chainId])

  return (
    <WalletContainer>
      {isAuthenticated ? (
        <>
          {
            asPath === '/pools' && <CreatePoolButton href="/pools/create">Criar Pool</CreatePoolButton>
          }
          <SelectNetwork />
          <WalletInfoContainer>
            <WalletBalance>{
              `
                ${
                  balance > 0 ? (balance / 10**18).toFixed(2) : '0'
                }
                ${
                  chainId === '1' ? 'ETH' : chainId === '38' ? 'BNB': chainId === '61' ? 'tBNB' : 'N/A' 
                }
              `
            }</WalletBalance>
            <WalletAddress>{truncatedAddress}</WalletAddress>
          </WalletInfoContainer>
          <IoLogOutOutline size={24} color='#FFF' onClick={handleLogout} />
        </>
      ) : (
        <WalletButton onClick={handleLogin}>Connect wallet</WalletButton>
      )}
    </WalletContainer>
  )
}

const WalletContainer = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '40px',
  gap: '40px',
})

const WalletInfoContainer = styled('div', {
  fontSize: '12px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '35px',
  backgroundColor: '$gray900',
  borderRadius: '5px',
})

const WalletButton = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '160px',
  height: '100%',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  backgroundColor: '$gray900',
  backgroundSize: '200%',
  backgroundPosition: 'right',
  transition: 'background-position 0.5s ease',
  marginLeft: 'auto',
  color: '$gray100',
  '&:hover': {
    filter: 'brightness(0.8)',
  },

  '@sm': {
    width: '100px',
    fontSize: '12px',
  }
})

const WalletBalance = styled('span', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  color: '$gray100',
  padding: '10px',
})

const WalletAddress = styled('span', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  color: '$gray100',
  fontWeight: '500',
  backgroundColor: '$gray600',
  padding: '10px',
  borderRadius: '5px',
})

const CreatePoolButton = styled(Link, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '160px',
  height: '35px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  backgroundColor: '$gray900',
  color: '$gray100',
  '&:hover': {
    backgroundPosition: 'left',
  },
})
