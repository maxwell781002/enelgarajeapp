import { PaginateData } from "../types/pagination";
import { revalidatePath } from "next/cache";
import { BaseRepository, Entity } from "./base-repository";
import repositories from "../repositories";

const PAGE_SIZE = 10;

export function crud<T extends Entity, U>(
  path: string,
  repositoryName: string,
) {
  const getRepository = async () => {
    "use server";
    return repositories[repositoryName] as BaseRepository<T, U>;
  };

  const buildMethod =
    (key: keyof Omit<BaseRepository<T, U>, "update">) => async (props: any) => {
      "use server";
      const repository = await getRepository();
      await repository[key](props);
      revalidatePath(path);
    };

  // TODO: check pagination works now that I have changed to async function.
  const paginate = async ({ pageIndex, pageSize }: PaginateData) => {
    "use server";
    return `${path}?pageIndex=${pageIndex}&pageSize=${pageSize || PAGE_SIZE}`;
  };

  const list = async (query: any) => {
    "use server";
    const pageIndex = query.pageIndex ? Number(query.pageIndex) : 0;
    const pageSize = query.pageSize ? Number(query.pageSize) : PAGE_SIZE;
    return (await getRepository()).paginate({ ...query, pageIndex, pageSize });
  };

  const update = async (id: string, props: any) => {
    "use server";
    const repository = await getRepository();
    await repository.update(id, props);
    revalidatePath(path);
  };

  return {
    list,
    paginate,
    update,
    create: buildMethod("create"),
    remove: buildMethod("remove"),
  };
}
