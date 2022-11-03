export const validateDate = (value: Date | string) =>
  value && isNaN(+value) ? 'errors.date.invalid' : undefined;
