import { PaginateData } from "../types/pagination";
import { revalidatePath } from "next/cache";
import { BaseRepository, Entity } from "./base-repository";
import repositories from "../repositories";

export function crud<T extends Entity, U>(
  path: string,
  repositoryName: string,
) {
  const getRepository = async () => {
    "use server";
    return repositories[repositoryName] as BaseRepository<T, U>;
  };

  const buildMethod =
    (key: keyof BaseRepository<T, U>) => async (props: any) => {
      "use server";
      const repository = await getRepository();
      await repository[key](props);
      revalidatePath(path);
    };

  // TODO: check pagination works now that I have changed to async function.
  const paginate = async ({ pageIndex, pageSize }: PaginateData) => {
    "use server";
    return `${path}?pageIndex=${pageIndex}&pageSize=${pageSize}`;
  };

  const list = async (query: any) => {
    "use server";
    const pageIndex = parseInt(query.pageIndex || "0");
    const pageSize = parseInt(query.pageSize || "10");
    return (await getRepository()).paginate({ pageIndex, pageSize, ...query });
  };

  return {
    list,
    paginate,
    create: buildMethod("create"),
    remove: buildMethod("remove"),
    update: buildMethod("update"),
  };
}
