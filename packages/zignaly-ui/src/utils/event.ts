export const changeEvent = (value: any) => {
  return {
    target: {
      value,
      name,
    },
    type: "change",
  };
};
