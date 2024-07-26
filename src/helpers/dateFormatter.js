export const dateFormatter = (value) => {
  const date = new Date(value);
  return date.toISOString().split("T")[0];
};
