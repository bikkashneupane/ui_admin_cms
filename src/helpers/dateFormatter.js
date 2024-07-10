export const dateFormatter = (value) => {
  const date = new Date(value);
  value = date.toISOString().split("T")[0];

  return value;
};
