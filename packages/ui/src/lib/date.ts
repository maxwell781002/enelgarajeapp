export const formatDate = (date: Date) => {
  return `${new Date(date).toLocaleDateString()}  ${new Date(date).toLocaleTimeString()}`;
};
