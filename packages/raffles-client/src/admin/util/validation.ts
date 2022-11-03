export const validateDate = (value: Date) =>
  value !== null && isNaN(+value) ? 'errors.date.invalid' : undefined;
