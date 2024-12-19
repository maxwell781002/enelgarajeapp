import { PaginateData, PaginationResult } from "../types/pagination";
import { revalidatePath } from "next/cache";
import { BaseRepository, Entity } from "./base-repository";
import repositories from "../repositories";
import { formDataToObject } from "./utils";
import { cleanUrlParams } from "./url";

const PAGE_SIZE = 10;

export type Options = {
  paginateMethod?: string;
};

export function crud<T extends Entity, U>(
  path: string,
  repositoryName: string,
  searchParams: any = {},
  options: Options = {},
) {
  options = {
    paginateMethod: "paginate",
    ...options,
  };
  const getRepository = async () => {
    "use server";
    const repository = (await repositories[repositoryName]) as BaseRepository<
      T,
      U
    >;
    return repository;
  };

  const buildMethod =
    (key: keyof Omit<BaseRepository<T, U>, "update">) => async (props: any) => {
      "use server";
      const repository = await getRepository();
      await repository[key](props);
      revalidatePath(path);
    };

  const search = async (query: any = {}) => {
    "use server";
    return `${path}?${new URLSearchParams({ ...searchParams, pageSize: PAGE_SIZE, ...query, pageIndex: 1 })}`;
  };

  const list = async (query: any = {}) => {
    "use server";
    query = cleanUrlParams({ ...searchParams, ...query });
    const pageIndex = query.pageIndex ? Number(query.pageIndex) : 1;
    const pageSize = query.pageSize ? Number(query.pageSize) : PAGE_SIZE;
    const repository = await getRepository();
    const paginateMethod = repository[
      options.paginateMethod as keyof BaseRepository<T, U>
    ] as (data: PaginateData) => Promise<PaginationResult<T>>;
    const { totalPage, ...data } = await paginateMethod.bind(repository)({
      ...query,
      pageIndex,
      pageSize,
    });
    const paginate = ({ pageIndex, pageSize }: PaginateData) => {
      return `${path}?${new URLSearchParams({ ...searchParams, pageSize: pageSize || PAGE_SIZE, pageIndex })}`;
    };
    return {
      ...data,
      totalPage,
      previousLink:
        pageIndex > 1 && paginate({ pageIndex: pageIndex - 1, pageSize }),
      nextLink:
        pageIndex < totalPage &&
        paginate({ pageIndex: pageIndex + 1, pageSize }),
    };
  };

  const update = async (id: string, props: any) => {
    "use server";
    const repository = await getRepository();
    await repository.update(id, formDataToObject(props));
    revalidatePath(path);
  };

  const create = async (props: any) => {
    "use server";
    const repository = await getRepository();
    await repository.create(formDataToObject(props));
    revalidatePath(path);
  };

  return {
    list,
    update,
    search,
    create,
    remove: buildMethod("remove"),
  };
}
