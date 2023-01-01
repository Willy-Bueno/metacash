import type { AppProps } from 'next/app'

import { globalStyles } from '@/styles/global'
import { AppContainer } from '@/styles/pages/app'

import { AuthProvider } from '@/contexts'

import { Header } from '@/components/Header'


export default function App({ Component, pageProps }: AppProps) {
  globalStyles()
  return (
    <AuthProvider>
      <Header />
      <AppContainer>
        <Component {...pageProps} />
      </AppContainer>
    </AuthProvider>
  )
}
