export function convertUserInputToNumberFormat(
  input: string,
  oldValue: string,
): string {
  const newValue = (input || '').replace(',', '.').replaceAll(/[^\d.]+/g, '');
  if (Number.isNaN(+newValue)) return oldValue;
  return newValue;
}
