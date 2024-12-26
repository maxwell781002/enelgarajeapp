const clearValues = (obj: any[]) =>
  obj.reduce((acc: any, [key, value]) => {
    if (value === "true") [(value = true)];
    if (value === "false") {
      value = false;
    }
    acc[key] = value;
    return acc;
  }, {});

export const getSearchParams = (searchParams: any) =>
  Array.from(searchParams.entries()).reduce(
    (obj: any, [key, val]: any) => ({ ...(obj as any), [key]: val }),
    {},
  );

export const cleanUrlParams = (query: any) =>
  clearValues(Object.entries(query));
