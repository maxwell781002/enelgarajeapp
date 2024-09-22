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
    protected model: M & any, // TODO: I add any type because I don't know what is the prisma base model.
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

  create(data: FormData) {
    this.validate("create", data);
    return this.doCreate(data);
  }

  remove(id: any) {
    return this.model.delete({ where: { id } });
  }

  protected getObject(data: FormData) {
    return Object.entries(Object.fromEntries(data.entries())).reduce(
      (acc, [key, value]) => ({ ...acc, [key]: value }),
      {},
    );
  }

  update(data: FormData) {
    this.validate("update", data);
    return this.doUpdate(data);
  }

  protected doUpdate(data: FormData) {
    const id = data.get("id");
    data.delete("id");
    return this.model.update({ where: { id }, data: this.getObject(data) });
  }

  protected doCreate(data: FormData) {
    return this.model.create({ data: this.getObject(data) });
  }

  getById(id: any) {
    return this.model.findUnique({ where: { id } });
  }

  protected validate(action: string, data: FormData) {
    const validator = this.validatorByAction[action] || this.validatorSchema;
    return validator.parse(this.getObject(data));
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
