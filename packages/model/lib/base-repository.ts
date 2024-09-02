import prisma from "../prisma/prisma-client";
import { ZodType } from "zod";
import { PaginateData, PaginationResult } from "../types/pagination";

type TValidatorByAction = {
  [action: string]: ZodType;
};

export type Entity = {
  id: any;
};

export abstract class BaseRepository<T extends Entity, M> {
  protected validatorByAction: TValidatorByAction = {};

  constructor(
    protected validatorSchema: ZodType,
    protected model: M,
  ) {
    this.init();
  }

  protected addValidator(action: string, validator: ZodType) {
    this.validatorByAction[action] = validator;
  }

  protected init() {}

  get(id: any, query?: any) {
    return this.model.findUnique({ where: { id }, ...query });
  }

  create(data: T) {
    this.validate("create", data);
    return this.doCreate(data);
  }

  remove(id: any) {
    return this.model.delete({ where: { id } });
  }

  update({ id, ...data }: T) {
    this.validate("update", { id, ...data } as T);
    return this.doUpdate(id, data as T);
  }

  protected doUpdate(id: any, data: T) {
    return this.model.update({ where: { id }, data });
  }

  protected doCreate(data: T) {
    return this.model.create({ data });
  }

  protected validate(action: string, data: T) {
    const validator = this.validatorByAction[action] || this.validatorSchema;
    return validator.parse(data);
  }

  async paginate({
    pageIndex = 1,
    pageSize = 2,
    where = {},
    include = {},
  }: PaginateData = {}): Promise<PaginationResult<T>> {
    let skip = pageIndex * pageSize;
    skip = skip < 0 ? 0 : skip;
    const [data, total] = await prisma.$transaction([
      this.model.findMany({ take: pageSize, skip, where, include }),
      this.model.count({ where }),
    ]);
    return {
      data,
      total,
      pageSize,
      pageIndex,
      firstRecordNumber: skip + 1,
      totalPage: Math.floor(total / pageSize) + 1,
      lastRecordNumber: skip + data.length,
    };
  }
}
