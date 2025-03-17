export const formatDateZn = (date: Date, hourDifference: number = 0) => {
  const time = new Date(date.getTime()).setHours(
    date.getHours() - hourDifference,
  );
  const newDate = new Date(time);
  return `${newDate.toLocaleDateString("es-ES")}  ${newDate.toLocaleTimeString()}`;
};

export const formatDate = (date: Date) => {
  const hourDifference: number = Number(process.env.HOUR_TZ ?? 5);
  return formatDateZn(date, hourDifference);
};
