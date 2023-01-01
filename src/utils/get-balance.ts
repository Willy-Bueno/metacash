export function getBalance(isAuthenticated: boolean, address: string | null, setBalance: (balance: number) => void) {
  if (isAuthenticated && address) {
    window.ethereum.request({
      method: 'eth_getBalance',
      params: [address, 'latest']
    })
    .then(result => {
      setBalance(parseInt(result as string))
    })
  } else {
    console.log('Not authenticated')
  }
}