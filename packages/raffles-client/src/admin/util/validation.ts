export const validateDate = (value: Date | string) => {
  console.log('validate', value);
  return value && isNaN(+value) ? 'errors.date.invalid' : undefined;
};
