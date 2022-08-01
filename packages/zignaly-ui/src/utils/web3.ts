export function shortenHex(hex: string, length = 6) {
  return `${hex.substring(0, length + 2)}…${hex.substring(hex.length - length)}`;
}
