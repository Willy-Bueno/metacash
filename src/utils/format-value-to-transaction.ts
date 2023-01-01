export function formatValueToTransaction (value: string) {
  let valueFormatted;

  if (value.charAt(0) === '0') {
    valueFormatted = value.split('.')[1]

    for (let i = 0; i < valueFormatted.length; i++) {
      switch (valueFormatted.charAt(i)) {
        case '0':
          valueFormatted.replace('0', '')
          break
        default:
          break
      }
    }
  } else {
    valueFormatted = value.split('.').join('')
  }

  return Number(valueFormatted).toString(16)
}
