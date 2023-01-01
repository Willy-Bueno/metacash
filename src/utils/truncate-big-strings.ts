/// 0x05654...0x0565a

export function truncateBigString (str: string, length = 9) {
  if (str.length <= length) {
    return str
  }

  return `${str.slice(0, length)}...${str.slice(-length)}`
}