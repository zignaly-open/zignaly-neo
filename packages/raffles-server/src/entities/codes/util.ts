import { CODE_LENGTH } from './constants';

export function generateCode() {
  return Math.random()
    .toString(36)
    .substring(2, CODE_LENGTH + 2)
    .toUpperCase();
}
