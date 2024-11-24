export const clearWhere = (where: any = {}) => {
  return Object.entries(where).reduce((acc, [key, value]) => {
    if (value && value !== "null") {
      acc[key] = value;
    }
    return acc;
  }, {} as any);
};
