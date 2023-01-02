import React from 'react';
import Link from 'next/link';
import * as Dropdown from '@radix-ui/react-dropdown-menu';
import { styled, keyframes } from '@stitches/react';
import { violet, mauve, blackA } from '@radix-ui/colors';
import {
  HamburgerMenuIcon,
} from '@radix-ui/react-icons';
import { useAuth } from '@/hooks';
import { useRouter } from 'next/router';

export const DropdownMenu = () => {
  const { isAuthenticated, address, signin, logout } = useAuth()
  const { asPath } = useRouter()

  function truncateAddress(address: string, length: number) {
    return address.slice(0, length) + '...' + address.slice(-length)
  }

  function copyToClipboard(e: any) {
    e.preventDefault()
    navigator.clipboard.writeText(address as string)
  }

  function login(e: any) {
    e.preventDefault()
    signin()
  }

  function logOut(e: any) {
    e.preventDefault()
    logout()
  }

  return (
    <Dropdown.Root>
      <Dropdown.Trigger asChild>
        <IconButton aria-label="Customise options">
          <HamburgerMenuIcon />
        </IconButton>
      </Dropdown.Trigger>

      <Dropdown.Portal>
        <DropdownContent sideOffset={5}>
          {
            isAuthenticated ? (
              <>
                <DropdownLabel>Endereço</DropdownLabel>
                <DropdownItem onClick={copyToClipboard}>
                  {
                    truncateAddress(address as string, 4)
                  }
                </DropdownItem>
                <DropdownLabel>Navegação</DropdownLabel>
                {
                  asPath === '/' ? (
                    <>
                      <DropdownItem asChild>
                        <Link href="/pools">
                          Pools
                        </Link>
                      </DropdownItem>
                      <DropdownItem asChild>
                        <Link href="/dashboard">
                          Dashboard
                        </Link>
                      </DropdownItem>
                      <DropdownItem asChild>
                        <Link href="/pools/create">
                          Criar Pool
                        </Link>
                      </DropdownItem>
                    </>
                  ) : asPath === '/pools' ? (
                    <>
                      <DropdownItem asChild>
                        <Link href="/">
                          Home
                        </Link>
                      </DropdownItem>
                      <DropdownItem asChild>
                        <Link href="/dashboard">
                          Dashboard
                        </Link>
                      </DropdownItem>
                      <DropdownItem asChild>
                        <Link href="/pools/create">
                          Criar Pool
                        </Link>
                      </DropdownItem>
                    </>
                  ) : asPath === '/dashboard' ? (
                    <>
                      <DropdownItem>
                        <Link href="/">
                          Home
                        </Link>
                      </DropdownItem>
                      <DropdownItem>
                        <Link href="/pools">
                          Pools
                        </Link>
                      </DropdownItem>
                      <DropdownItem asChild>
                        <Link href="/pools/create">
                          Criar Pool
                        </Link>
                      </DropdownItem>
                    </>
                  ) : asPath === `/pools/${/\*/}` ? (
                    <>
                      <DropdownItem asChild>
                        <Link href="/">
                          Home
                        </Link>
                      </DropdownItem>
                      <DropdownItem asChild>
                        <Link href="/pools">
                          Pools
                        </Link>
                      </DropdownItem>
                      <DropdownItem asChild>
                        <Link href="/pools/create">
                          Criar Pool
                        </Link>
                      </DropdownItem>
                    </>
                  ) : (
                    <>
                      <DropdownItem asChild>
                        <Link href="/">
                          Home
                        </Link>
                      </DropdownItem>
                      <DropdownItem asChild>
                        <Link href="/pools">
                          Pools
                        </Link>
                      </DropdownItem>
                      <DropdownItem asChild>
                        <Link href="/dashboard">
                          Dashboard
                        </Link>
                      </DropdownItem>
                    </>
                  )
                }
                <DropdownLabel>Conta</DropdownLabel>
                <DropdownItem onClick={logOut}>
                  Logout
                </DropdownItem>
              </>
            ): (
              <>
                <DropdownLabel>Conta</DropdownLabel>
                <DropdownItem onClick={login}>
                  Login
                </DropdownItem>
                <DropdownLabel>Navegação</DropdownLabel>
                <DropdownItem>
                  <Link href="/pools">
                    Pools
                  </Link>
                </DropdownItem>
              </>
            )
          }
        </DropdownContent>
      </Dropdown.Portal>
    </Dropdown.Root>
  );
};

const slideUpAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideRightAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(-2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
});

const slideDownAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(-2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideLeftAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
});


const DropdownContent = styled(Dropdown.Content, {
  minWidth: 220,
  backgroundColor: '#080706',
  borderRadius: 6,
  padding: 5,
  marginRight: 16,
  boxShadow:
    '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
  animationDuration: '400ms',
  animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
  willChange: 'transform, opacity',
  '&[data-state="open"]': {
    '&[data-side="top"]': { animationName: slideDownAndFade },
    '&[data-side="right"]': { animationName: slideLeftAndFade },
    '&[data-side="bottom"]': { animationName: slideUpAndFade },
    '&[data-side="left"]': { animationName: slideRightAndFade },
  },
});


const DropdownItem = styled(Dropdown.Item, {
  all: 'unset',
  fontSize: 13,
  lineHeight: 1,
  color: violet.violet11,
  borderRadius: 3,
  display: 'flex',
  alignItems: 'center',
  height: 25,
  padding: '0 5px',
  position: 'relative',
  paddingLeft: 25,
  userSelect: 'none',

  '&[data-disabled]': {
    color: mauve.mauve8,
    pointerEvents: 'none',
  },

  '&[data-highlighted]': {
    backgroundColor: violet.violet9,
    color: violet.violet1,
  },
});

const DropdownLabel = styled(Dropdown.Label, {
  paddingLeft: 25,
  fontSize: 12,
  lineHeight: '25px',
  color: mauve.mauve11,
});

const IconButton = styled('button', {
  all: 'unset',
  fontFamily: 'inherit',
  borderRadius: '5px',
  height: 35,
  width: 50,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '$white',
  backgroundColor: '$gray900',
  boxShadow: `0 2px 10px ${blackA.blackA7}`,
  '&:hover': { 
    filter: 'brightness(1.1)',
   },
  '&:focus': { boxShadow: `0 0 0 2px black` },
});
