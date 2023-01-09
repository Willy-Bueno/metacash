import { createContext, useEffect, useState } from 'react';
import axios from '@/helper/axios'
import { useRouter } from 'next/router';

export interface AuthContextData {
  signin: () => Promise<void>
  logout: () => void
  isAuthenticated: boolean
  address: string | null
  chainId: string | null
}

export const AuthContext = createContext({} as AuthContextData);

export interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [address, setAddress] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [chainId, setChainId] = useState('')
  
  const { asPath, replace } = useRouter()

  useEffect(() => {
    if(!isAuthenticated) {
      asPath === '/pool/create' && replace('/')
    }
  })

  async function signin() {
    try {
      if (!isAuthenticated) {
        if (window.ethereum) {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' }) as string[]
          const chainId = await window.ethereum.request({ method: 'eth_chainId' }) as number

          setChainId(Number(chainId).toString(16))

          if (accounts.length > 0) {

            await axios.post('/auth', {  
              'wallet': accounts[0].toString()
            },
            {
              headers: {
                'Content-Type': 'application/json'
              },
            })

            setAddress(accounts[0])

            setIsAuthenticated(true)

          } else {
            throw new Error('No account selected')
          }
        } 
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      if (window.ethereum) {
        window.ethereum.on('chainChanged', (chainId: any) => {
          setChainId(Number(chainId).toString(16))
        })

        window.ethereum.on('accountsChanged', async(accounts: any) => {
          if (accounts.length > 0) {
            await axios.post('/auth', {  
              'wallet': accounts[0].toString()
            },
            {
              headers: {
                'Content-Type': 'application/json'
              },
            })

            setAddress(accounts[0])

            setIsAuthenticated(true)
          } else {
            throw new Error('No account selected')
          }
        })
      }
    }
  }, [isAuthenticated])

  function logout() {
    setAddress('')
    setIsAuthenticated(false)
  }
  
  return (
    <AuthContext.Provider value={{ signin, logout, isAuthenticated, address, chainId }}>
      { children }
    </AuthContext.Provider>
  )
}
