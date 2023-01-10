import Image from 'next/image';
import Link from 'next/link';

import { styled } from '@/styles/stitches.config'
import { Wallet } from '../Wallet';

import logo from '@/assets/logo.svg'
import { useAuth, useWindowSize } from '@/hooks';
import { DropdownMenu } from '../DropdownMenu';
import { SelectNetwork } from '../SelectNetwork';
import { useEffect, useState } from 'react';
import axios from '@/helper/axios';
import { IPool, IUser } from '@/interfaces/db-interfaces';

interface HeaderDataProps {
  user: IUser
  pools: IPool[]
}

export function Header() {
  const { isAuthenticated, address } = useAuth()
  const { width } = useWindowSize()

  const [data, setData] = useState<HeaderDataProps>()

  useEffect(() => {
    if (isAuthenticated) {
      if (address !== undefined && address !== null) {
        axios.post('/pool/get-pool-by-id',
        {
          address: address
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
        )
        .then((response) => {
          setData(response.data)
        })
      }
    }
  }, [address, isAuthenticated])
  
  
  return (
    <HeaderContainer>
        <main>
          <Link href='/'>
            <Image priority src={logo} width={50} height={30} alt="logo metacash" />
          </Link>
          {
            width! >= 1080 ? (
              <>
                <menu>
                  <ul>
                    <li>
                      {
                        isAuthenticated && data?.user?.role === 'admin' || !!data?.pools.length ? (
                          <>
                            <Link href="/">
                              Home
                            </Link>
                            <Link href="/pools">
                              Pools
                            </Link>
                            <Link href="/dashboard">
                              Dashboard
                            </Link>
                          </>
                        ) : (
                          <>
                            <Link href="/">
                              Home
                            </Link>
                            <Link href="/pools">
                              Pools
                            </Link>
                          </>
                        )
                      }
                    </li>
                  </ul>
                </menu>
                <Wallet />
              </>
            ): (
              <MenuMobileWrapper>
                {
                  isAuthenticated && (
                    <SelectNetwork />
                  )
                }
                <DropdownMenu />
              </MenuMobileWrapper>
            )
          }
        </main>
      </HeaderContainer>
  )
}

export const HeaderContainer = styled('header', {
  width: '100%',
  height: '80px',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',

  backgroundColor: '$gray800',

  'main': {
    maxWidth: '1180px',
    width: '100%',

    padding: '0 1rem',

    display: 'flex',
    direction: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    'menu': {
      marginLeft: '2.75rem',

      display: 'flex',
      direction: 'row',
      alignItems: 'center',

      '@sm': {
        marginLeft: '0.5rem',
      },

      'img': {
        marginRight: '16px',

        '@sm': {
          marginRight: '8px',
        }
      },

      'ul': {
        display: 'flex',
        direction: 'row',
        alignItems: 'center',

        'li': {
          listStyle: 'none',

          'a': {
            textDecoration: 'none',
            color: '$gray100',

            padding: '0.5rem 1rem',

            transition: 'all 0.2s',

            '&:hover': {
              filter: 'brightness(0.8)'
            },

            '@sm': {
              padding: '0.5rem 0.5rem',
            }
          },
        },
      }
    }
  }
})

const MenuMobileWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '1rem',
})