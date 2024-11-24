export const getSearchParams = (searchParams: any) =>
  Array.from(searchParams.entries()).reduce(
    (obj: any, [key, val]: any) => ({ ...(obj as any), [key]: val }),
    {},
  );
