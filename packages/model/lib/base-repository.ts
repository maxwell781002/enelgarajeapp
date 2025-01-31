import prisma, { Prisma } from "../prisma/prisma-client";
import { ZodType } from "zod";
import { PaginateData, PaginationResult } from "../types/pagination";

type TValidatorByAction = {
  [action: string]: ZodType;
};

export type Entity = {
  id?: any;
};

export abstract class BaseRepository<T extends Entity, M> {
  protected validatorByAction: TValidatorByAction = {};

  constructor(
    protected validatorSchema: ZodType,
    protected _model: keyof typeof Prisma,
  ) {
    this.init();
  }

  get model() {
    return (prisma() as any)[this._model];
  }

  getRepositoryModelName() {
    return this.model.name;
  }

  protected addValidator(action: string, validator: ZodType) {
    this.validatorByAction[action] = validator;
  }

  protected init() {}

  get(id: any, query?: any) {
    return this.model.findUnique({ where: { id }, ...query });
  }

  create(data: any) {
    this.validate("create", data);
    return this.doCreate(data);
  }

  remove(id: any) {
    return this.model.delete({ where: { id } });
  }

  protected getObject(data: any) {
    return data;
  }

  update(id: string, data: any) {
    this.validate("update", data);
    return this.doUpdate(id, data);
  }

  protected doUpdate(id: string, data: any) {
    return this.model.update({ where: { id }, data: this.getObject(data) });
  }

  protected doCreate(data: any) {
    return this.model.create({ data: this.getObject(data) });
  }

  getById(id: any) {
    return this.model.findUnique({ where: { id } });
  }

  protected validate(action: string, data: any) {
    const validator = this.validatorByAction[action] || this.validatorSchema;
    return validator.parse(this.getObject(data));
  }

  async paginate({
    pageIndex = 1,
    pageSize = 10,
    where = {},
    orderBy = {},
    include = {},
    distinct = null,
  }: PaginateData = {}): Promise<PaginationResult<T>> {
    let skip = (pageIndex - 1) * pageSize;
    skip = skip < 0 ? 0 : skip;
    const query: any = {
      take: pageSize,
      skip,
      where,
      include,
      orderBy,
    };
    if (distinct) {
      query.distinct = distinct;
    }
    const [data, total] = await prisma().$transaction([
      this.model.findMany(query),
      this.model.count({ where }),
    ]);
    return {
      data,
      total,
      pageSize,
      pageIndex,
      firstRecordNumber: skip + 1,
      totalPage: Math.ceil(total / pageSize),
      lastRecordNumber: skip + data.length,
      hasMore: total > skip + data.length,
    };
  }

  findFirst(where: any) {
    return this.model.findFirst({ where });
  }
}
