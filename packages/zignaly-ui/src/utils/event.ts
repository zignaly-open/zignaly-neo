export const changeEvent = (name: string | undefined, value: any) => {
  return {
    target: {
      value,
      name,
    },
    type: "change",
  };
};
