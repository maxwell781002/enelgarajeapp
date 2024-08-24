import { PaginateData } from "../types/pagination";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { BaseRepository, Entity } from "./base-repository";
import repositories from "../repositories";

export function crud<T extends Entity>(path: string, repositoryName: string) {
  const getRepository = async () => {
    "use server";
    return repositories[repositoryName] as BaseRepository<T>;
  };

  const buildMethod = (key: keyof BaseRepository<T>) => async (props: any) => {
    "use server";
    const repository = await getRepository();
    await repository[key](props);
    revalidatePath(path);
  };

  const paginate = async ({ pageIndex, pageSize }: PaginateData) => {
    "use server";
    redirect(`${path}?pageIndex=${pageIndex}&pageSize=${pageSize}`);
  };

  const list = async (query: any) => {
    const pageIndex = parseInt(query.pageIndex || "0");
    const pageSize = parseInt(query.pageSize || "10");
    return (await getRepository()).paginate({ pageIndex, pageSize });
  };

  return {
    list,
    paginate,
    create: buildMethod("create"),
    remove: buildMethod("remove"),
    update: buildMethod("update"),
  };
}
