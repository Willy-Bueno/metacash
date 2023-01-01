export async function windowSendTransaction(value:  string, from: string, to: string) {
  if(from.toUpperCase() === to.toUpperCase()) throw new Error('Cannot send to self')

  return await window.ethereum.request({
    method: 'eth_sendTransaction',
    params: [{
      from,
      to,
      value
    }]
  })
}
