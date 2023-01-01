export async function getReceiptTransactionLooping (txHash: string, callback: any) {
  await window.ethereum.request({
    method: 'eth_getTransactionReceipt',
    params: [txHash]
  }).then((receipt: any) => {
    if (receipt) {
      callback(receipt)
    } else {
      setTimeout(() => {
        getReceiptTransactionLooping(txHash, callback)
      }, 1000)
    }
  })
}