/**
 * Client
 **/

import * as runtime from "./runtime/library.js";
import $Types = runtime.Types; // general types
import $Public = runtime.Types.Public;
import $Utils = runtime.Types.Utils;
import $Extensions = runtime.Types.Extensions;
import $Result = runtime.Types.Result;

export type PrismaPromise<T> = $Public.PrismaPromise<T>;

/**
 * Model Business
 *
 */
export type Business = $Result.DefaultSelection<Prisma.$BusinessPayload>;
/**
 * Model Category
 *
 */
export type Category = $Result.DefaultSelection<Prisma.$CategoryPayload>;
/**
 * Model Product
 *
 */
export type Product = $Result.DefaultSelection<Prisma.$ProductPayload>;
/**
 * Model User
 *
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>;
/**
 * Model UserBusiness
 *
 */
export type UserBusiness =
  $Result.DefaultSelection<Prisma.$UserBusinessPayload>;
/**
 * Model Order
 *
 */
export type Order = $Result.DefaultSelection<Prisma.$OrderPayload>;
/**
 * Model OrderProduct
 *
 */
export type OrderProduct =
  $Result.DefaultSelection<Prisma.$OrderProductPayload>;
/**
 * Model Account
 *
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>;
/**
 * Model Session
 *
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>;
/**
 * Model VerificationToken
 *
 */
export type VerificationToken =
  $Result.DefaultSelection<Prisma.$VerificationTokenPayload>;
/**
 * Model Authenticator
 *
 */
export type Authenticator =
  $Result.DefaultSelection<Prisma.$AuthenticatorPayload>;

/**
 * Enums
 */
export namespace $Enums {
  export const UserRoles: {
    USER: "USER";
    ADMIN: "ADMIN";
  };

  export type UserRoles = (typeof UserRoles)[keyof typeof UserRoles];

  export const OrderStatus: {
    CREATED: "CREATED";
    SEND: "SEND";
    PAYED: "PAYED";
    REJECTED: "REJECTED";
  };

  export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];
}

export type UserRoles = $Enums.UserRoles;

export const UserRoles: typeof $Enums.UserRoles;

export type OrderStatus = $Enums.OrderStatus;

export const OrderStatus: typeof $Enums.OrderStatus;

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Businesses
 * const businesses = await prisma.business.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = "log" extends keyof ClientOptions
    ? ClientOptions["log"] extends Array<Prisma.LogLevel | Prisma.LogDefinition>
      ? Prisma.GetEvents<ClientOptions["log"]>
      : never
    : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>["other"] };

  /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Businesses
   * const businesses = await prisma.business.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(
    optionsArg?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>,
  );
  $on<V extends U>(
    eventType: V,
    callback: (
      event: V extends "query" ? Prisma.QueryEvent : Prisma.LogEvent,
    ) => void,
  ): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void;

  /**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(
    query: string,
    ...values: any[]
  ): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(
    query: string,
    ...values: any[]
  ): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(
    arg: [...P],
    options?: { isolationLevel?: Prisma.TransactionIsolationLevel },
  ): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;

  $transaction<R>(
    fn: (
      prisma: Omit<PrismaClient, runtime.ITXClientDenyList>,
    ) => $Utils.JsPromise<R>,
    options?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    },
  ): $Utils.JsPromise<R>;

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>;

  /**
   * `prisma.business`: Exposes CRUD operations for the **Business** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Businesses
   * const businesses = await prisma.business.findMany()
   * ```
   */
  get business(): Prisma.BusinessDelegate<ExtArgs>;

  /**
   * `prisma.category`: Exposes CRUD operations for the **Category** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Categories
   * const categories = await prisma.category.findMany()
   * ```
   */
  get category(): Prisma.CategoryDelegate<ExtArgs>;

  /**
   * `prisma.product`: Exposes CRUD operations for the **Product** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Products
   * const products = await prisma.product.findMany()
   * ```
   */
  get product(): Prisma.ProductDelegate<ExtArgs>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.userBusiness`: Exposes CRUD operations for the **UserBusiness** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more UserBusinesses
   * const userBusinesses = await prisma.userBusiness.findMany()
   * ```
   */
  get userBusiness(): Prisma.UserBusinessDelegate<ExtArgs>;

  /**
   * `prisma.order`: Exposes CRUD operations for the **Order** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Orders
   * const orders = await prisma.order.findMany()
   * ```
   */
  get order(): Prisma.OrderDelegate<ExtArgs>;

  /**
   * `prisma.orderProduct`: Exposes CRUD operations for the **OrderProduct** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more OrderProducts
   * const orderProducts = await prisma.orderProduct.findMany()
   * ```
   */
  get orderProduct(): Prisma.OrderProductDelegate<ExtArgs>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Accounts
   * const accounts = await prisma.account.findMany()
   * ```
   */
  get account(): Prisma.AccountDelegate<ExtArgs>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Sessions
   * const sessions = await prisma.session.findMany()
   * ```
   */
  get session(): Prisma.SessionDelegate<ExtArgs>;

  /**
   * `prisma.verificationToken`: Exposes CRUD operations for the **VerificationToken** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more VerificationTokens
   * const verificationTokens = await prisma.verificationToken.findMany()
   * ```
   */
  get verificationToken(): Prisma.VerificationTokenDelegate<ExtArgs>;

  /**
   * `prisma.authenticator`: Exposes CRUD operations for the **Authenticator** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Authenticators
   * const authenticators = await prisma.authenticator.findMany()
   * ```
   */
  get authenticator(): Prisma.AuthenticatorDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF;

  export type PrismaPromise<T> = $Public.PrismaPromise<T>;

  /**
   * Validator
   */
  export import validator = runtime.Public.validator;

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError;
  export import PrismaClientValidationError = runtime.PrismaClientValidationError;
  export import NotFoundError = runtime.NotFoundError;

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag;
  export import empty = runtime.empty;
  export import join = runtime.join;
  export import raw = runtime.raw;
  export import Sql = runtime.Sql;

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal;

  export type DecimalJsLike = runtime.DecimalJsLike;

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics;
  export type Metric<T> = runtime.Metric<T>;
  export type MetricHistogram = runtime.MetricHistogram;
  export type MetricHistogramBucket = runtime.MetricHistogramBucket;

  /**
   * Extensions
   */
  export import Extension = $Extensions.UserArgs;
  export import getExtensionContext = runtime.Extensions.getExtensionContext;
  export import Args = $Public.Args;
  export import Payload = $Public.Payload;
  export import Result = $Public.Result;
  export import Exact = $Public.Exact;

  /**
   * Prisma Client JS version: 5.19.1
   * Query Engine version: 69d742ee20b815d88e17e54db4a2a7a3b30324e3
   */
  export type PrismaVersion = {
    client: string;
  };

  export const prismaVersion: PrismaVersion;

  /**
   * Utility Types
   */

  export import JsonObject = runtime.JsonObject;
  export import JsonArray = runtime.JsonArray;
  export import JsonValue = runtime.JsonValue;
  export import InputJsonObject = runtime.InputJsonObject;
  export import InputJsonArray = runtime.InputJsonArray;
  export import InputJsonValue = runtime.InputJsonValue;

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
     * Type of `Prisma.DbNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class DbNull {
      private DbNull: never;
      private constructor();
    }

    /**
     * Type of `Prisma.JsonNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class JsonNull {
      private JsonNull: never;
      private constructor();
    }

    /**
     * Type of `Prisma.AnyNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class AnyNull {
      private AnyNull: never;
      private constructor();
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull;

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull;

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull;

  type SelectAndInclude = {
    select: any;
    include: any;
  };

  type SelectAndOmit = {
    select: any;
    omit: any;
  };

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> =
    T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<
    T extends (...args: any) => $Utils.JsPromise<any>,
  > = PromiseType<ReturnType<T>>;

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
  };

  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K;
  }[keyof T];

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K;
  };

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>;

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & (T extends SelectAndInclude
    ? "Please either choose `select` or `include`."
    : T extends SelectAndOmit
      ? "Please either choose `select` or `omit`."
      : {});

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & K;

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> = T extends object
    ? U extends object
      ? (Without<T, U> & U) | (Without<U, T> & T)
      : U
    : T;

  /**
   * Is T a Record?
   */
  type IsObject<T extends any> =
    T extends Array<any>
      ? False
      : T extends Date
        ? False
        : T extends Uint8Array
          ? False
          : T extends BigInt
            ? False
            : T extends object
              ? True
              : False;

  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O>; // With K possibilities
    }[K];

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<
    __Either<O, K>
  >;

  type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
  }[strict];

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1,
  > = O extends unknown ? _Either<O, K, strict> : never;

  export type Union = any;

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
  } & {};

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never;

  export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<
    Overwrite<
      U,
      {
        [K in keyof U]-?: At<U, K>;
      }
    >
  >;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O
    ? O[K]
    : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown
    ? AtStrict<O, K>
    : never;
  export type At<
    O extends object,
    K extends Key,
    strict extends Boolean = 1,
  > = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function
    ? A
    : {
        [K in keyof A]: A[K];
      } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
      ?
          | (K extends keyof O ? { [P in K]: O[P] } & O : O)
          | ({ [P in keyof O as P extends K ? K : never]-?: O[P] } & O)
      : never
  >;

  type _Strict<U, _U = U> = U extends unknown
    ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>>
    : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False;

  // /**
  // 1
  // */
  export type True = 1;

  /**
  0
  */
  export type False = 0;

  export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
  }[B];

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
      ? 1
      : 0;

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >;

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0;
      1: 1;
    };
    1: {
      0: 1;
      1: 1;
    };
  }[B1][B2];

  export type Keys<U extends Union> = U extends unknown ? keyof U : never;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object
    ? {
        [P in keyof T]: P extends keyof O ? O[P] : never;
      }
    : never;

  type FieldPaths<
    T,
    U = Omit<T, "_avg" | "_sum" | "_count" | "_min" | "_max">,
  > = IsObject<T> extends True ? U : T;

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<"OR", K>, Extends<"AND", K>>,
      Extends<"NOT", K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<
            UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never
          >
        : never
      : {} extends FieldPaths<T[K]>
        ? never
        : K;
  }[keyof T];

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<
    T,
    K extends Enumerable<keyof T> | keyof T,
  > = Prisma__Pick<T, MaybeTupleToUnion<K>>;

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}`
    ? never
    : T;

  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;

  type FieldRefInputType<Model, FieldType> = Model extends never
    ? never
    : FieldRef<Model, FieldType>;

  export const ModelName: {
    Business: "Business";
    Category: "Category";
    Product: "Product";
    User: "User";
    UserBusiness: "UserBusiness";
    Order: "Order";
    OrderProduct: "OrderProduct";
    Account: "Account";
    Session: "Session";
    VerificationToken: "VerificationToken";
    Authenticator: "Authenticator";
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName];

  export type Datasources = {
    db?: Datasource;
  };

  interface TypeMapCb
    extends $Utils.Fn<
      { extArgs: $Extensions.InternalArgs; clientOptions: PrismaClientOptions },
      $Utils.Record<string, any>
    > {
    returns: Prisma.TypeMap<
      this["params"]["extArgs"],
      this["params"]["clientOptions"]
    >;
  }

  export type TypeMap<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    ClientOptions = {},
  > = {
    meta: {
      modelProps:
        | "business"
        | "category"
        | "product"
        | "user"
        | "userBusiness"
        | "order"
        | "orderProduct"
        | "account"
        | "session"
        | "verificationToken"
        | "authenticator";
      txIsolationLevel: Prisma.TransactionIsolationLevel;
    };
    model: {
      Business: {
        payload: Prisma.$BusinessPayload<ExtArgs>;
        fields: Prisma.BusinessFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.BusinessFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$BusinessPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.BusinessFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$BusinessPayload>;
          };
          findFirst: {
            args: Prisma.BusinessFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$BusinessPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.BusinessFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$BusinessPayload>;
          };
          findMany: {
            args: Prisma.BusinessFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$BusinessPayload>[];
          };
          create: {
            args: Prisma.BusinessCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$BusinessPayload>;
          };
          createMany: {
            args: Prisma.BusinessCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.BusinessCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$BusinessPayload>[];
          };
          delete: {
            args: Prisma.BusinessDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$BusinessPayload>;
          };
          update: {
            args: Prisma.BusinessUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$BusinessPayload>;
          };
          deleteMany: {
            args: Prisma.BusinessDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.BusinessUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.BusinessUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$BusinessPayload>;
          };
          aggregate: {
            args: Prisma.BusinessAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateBusiness>;
          };
          groupBy: {
            args: Prisma.BusinessGroupByArgs<ExtArgs>;
            result: $Utils.Optional<BusinessGroupByOutputType>[];
          };
          count: {
            args: Prisma.BusinessCountArgs<ExtArgs>;
            result: $Utils.Optional<BusinessCountAggregateOutputType> | number;
          };
        };
      };
      Category: {
        payload: Prisma.$CategoryPayload<ExtArgs>;
        fields: Prisma.CategoryFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.CategoryFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.CategoryFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>;
          };
          findFirst: {
            args: Prisma.CategoryFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.CategoryFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>;
          };
          findMany: {
            args: Prisma.CategoryFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[];
          };
          create: {
            args: Prisma.CategoryCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>;
          };
          createMany: {
            args: Prisma.CategoryCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.CategoryCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[];
          };
          delete: {
            args: Prisma.CategoryDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>;
          };
          update: {
            args: Prisma.CategoryUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>;
          };
          deleteMany: {
            args: Prisma.CategoryDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.CategoryUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.CategoryUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>;
          };
          aggregate: {
            args: Prisma.CategoryAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateCategory>;
          };
          groupBy: {
            args: Prisma.CategoryGroupByArgs<ExtArgs>;
            result: $Utils.Optional<CategoryGroupByOutputType>[];
          };
          count: {
            args: Prisma.CategoryCountArgs<ExtArgs>;
            result: $Utils.Optional<CategoryCountAggregateOutputType> | number;
          };
        };
      };
      Product: {
        payload: Prisma.$ProductPayload<ExtArgs>;
        fields: Prisma.ProductFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.ProductFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>;
          };
          findFirst: {
            args: Prisma.ProductFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.ProductFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>;
          };
          findMany: {
            args: Prisma.ProductFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[];
          };
          create: {
            args: Prisma.ProductCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>;
          };
          createMany: {
            args: Prisma.ProductCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.ProductCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[];
          };
          delete: {
            args: Prisma.ProductDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>;
          };
          update: {
            args: Prisma.ProductUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>;
          };
          deleteMany: {
            args: Prisma.ProductDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.ProductUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.ProductUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>;
          };
          aggregate: {
            args: Prisma.ProductAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateProduct>;
          };
          groupBy: {
            args: Prisma.ProductGroupByArgs<ExtArgs>;
            result: $Utils.Optional<ProductGroupByOutputType>[];
          };
          count: {
            args: Prisma.ProductCountArgs<ExtArgs>;
            result: $Utils.Optional<ProductCountAggregateOutputType> | number;
          };
        };
      };
      User: {
        payload: Prisma.$UserPayload<ExtArgs>;
        fields: Prisma.UserFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[];
          };
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[];
          };
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateUser>;
          };
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>;
            result: $Utils.Optional<UserGroupByOutputType>[];
          };
          count: {
            args: Prisma.UserCountArgs<ExtArgs>;
            result: $Utils.Optional<UserCountAggregateOutputType> | number;
          };
        };
      };
      UserBusiness: {
        payload: Prisma.$UserBusinessPayload<ExtArgs>;
        fields: Prisma.UserBusinessFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.UserBusinessFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserBusinessPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.UserBusinessFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserBusinessPayload>;
          };
          findFirst: {
            args: Prisma.UserBusinessFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserBusinessPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.UserBusinessFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserBusinessPayload>;
          };
          findMany: {
            args: Prisma.UserBusinessFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserBusinessPayload>[];
          };
          create: {
            args: Prisma.UserBusinessCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserBusinessPayload>;
          };
          createMany: {
            args: Prisma.UserBusinessCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.UserBusinessCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserBusinessPayload>[];
          };
          delete: {
            args: Prisma.UserBusinessDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserBusinessPayload>;
          };
          update: {
            args: Prisma.UserBusinessUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserBusinessPayload>;
          };
          deleteMany: {
            args: Prisma.UserBusinessDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.UserBusinessUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.UserBusinessUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserBusinessPayload>;
          };
          aggregate: {
            args: Prisma.UserBusinessAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateUserBusiness>;
          };
          groupBy: {
            args: Prisma.UserBusinessGroupByArgs<ExtArgs>;
            result: $Utils.Optional<UserBusinessGroupByOutputType>[];
          };
          count: {
            args: Prisma.UserBusinessCountArgs<ExtArgs>;
            result:
              | $Utils.Optional<UserBusinessCountAggregateOutputType>
              | number;
          };
        };
      };
      Order: {
        payload: Prisma.$OrderPayload<ExtArgs>;
        fields: Prisma.OrderFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.OrderFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.OrderFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>;
          };
          findFirst: {
            args: Prisma.OrderFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.OrderFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>;
          };
          findMany: {
            args: Prisma.OrderFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[];
          };
          create: {
            args: Prisma.OrderCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>;
          };
          createMany: {
            args: Prisma.OrderCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.OrderCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[];
          };
          delete: {
            args: Prisma.OrderDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>;
          };
          update: {
            args: Prisma.OrderUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>;
          };
          deleteMany: {
            args: Prisma.OrderDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.OrderUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.OrderUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>;
          };
          aggregate: {
            args: Prisma.OrderAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateOrder>;
          };
          groupBy: {
            args: Prisma.OrderGroupByArgs<ExtArgs>;
            result: $Utils.Optional<OrderGroupByOutputType>[];
          };
          count: {
            args: Prisma.OrderCountArgs<ExtArgs>;
            result: $Utils.Optional<OrderCountAggregateOutputType> | number;
          };
        };
      };
      OrderProduct: {
        payload: Prisma.$OrderProductPayload<ExtArgs>;
        fields: Prisma.OrderProductFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.OrderProductFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderProductPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.OrderProductFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderProductPayload>;
          };
          findFirst: {
            args: Prisma.OrderProductFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderProductPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.OrderProductFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderProductPayload>;
          };
          findMany: {
            args: Prisma.OrderProductFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderProductPayload>[];
          };
          create: {
            args: Prisma.OrderProductCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderProductPayload>;
          };
          createMany: {
            args: Prisma.OrderProductCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.OrderProductCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderProductPayload>[];
          };
          delete: {
            args: Prisma.OrderProductDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderProductPayload>;
          };
          update: {
            args: Prisma.OrderProductUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderProductPayload>;
          };
          deleteMany: {
            args: Prisma.OrderProductDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.OrderProductUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.OrderProductUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderProductPayload>;
          };
          aggregate: {
            args: Prisma.OrderProductAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateOrderProduct>;
          };
          groupBy: {
            args: Prisma.OrderProductGroupByArgs<ExtArgs>;
            result: $Utils.Optional<OrderProductGroupByOutputType>[];
          };
          count: {
            args: Prisma.OrderProductCountArgs<ExtArgs>;
            result:
              | $Utils.Optional<OrderProductCountAggregateOutputType>
              | number;
          };
        };
      };
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>;
        fields: Prisma.AccountFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>;
          };
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>;
          };
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[];
          };
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>;
          };
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[];
          };
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>;
          };
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>;
          };
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>;
          };
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateAccount>;
          };
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>;
            result: $Utils.Optional<AccountGroupByOutputType>[];
          };
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>;
            result: $Utils.Optional<AccountCountAggregateOutputType> | number;
          };
        };
      };
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>;
        fields: Prisma.SessionFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>;
          };
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>;
          };
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[];
          };
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>;
          };
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[];
          };
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>;
          };
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>;
          };
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>;
          };
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateSession>;
          };
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>;
            result: $Utils.Optional<SessionGroupByOutputType>[];
          };
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>;
            result: $Utils.Optional<SessionCountAggregateOutputType> | number;
          };
        };
      };
      VerificationToken: {
        payload: Prisma.$VerificationTokenPayload<ExtArgs>;
        fields: Prisma.VerificationTokenFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.VerificationTokenFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.VerificationTokenFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>;
          };
          findFirst: {
            args: Prisma.VerificationTokenFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.VerificationTokenFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>;
          };
          findMany: {
            args: Prisma.VerificationTokenFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[];
          };
          create: {
            args: Prisma.VerificationTokenCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>;
          };
          createMany: {
            args: Prisma.VerificationTokenCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.VerificationTokenCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[];
          };
          delete: {
            args: Prisma.VerificationTokenDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>;
          };
          update: {
            args: Prisma.VerificationTokenUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>;
          };
          deleteMany: {
            args: Prisma.VerificationTokenDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.VerificationTokenUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.VerificationTokenUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>;
          };
          aggregate: {
            args: Prisma.VerificationTokenAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateVerificationToken>;
          };
          groupBy: {
            args: Prisma.VerificationTokenGroupByArgs<ExtArgs>;
            result: $Utils.Optional<VerificationTokenGroupByOutputType>[];
          };
          count: {
            args: Prisma.VerificationTokenCountArgs<ExtArgs>;
            result:
              | $Utils.Optional<VerificationTokenCountAggregateOutputType>
              | number;
          };
        };
      };
      Authenticator: {
        payload: Prisma.$AuthenticatorPayload<ExtArgs>;
        fields: Prisma.AuthenticatorFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.AuthenticatorFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AuthenticatorPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.AuthenticatorFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AuthenticatorPayload>;
          };
          findFirst: {
            args: Prisma.AuthenticatorFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AuthenticatorPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.AuthenticatorFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AuthenticatorPayload>;
          };
          findMany: {
            args: Prisma.AuthenticatorFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AuthenticatorPayload>[];
          };
          create: {
            args: Prisma.AuthenticatorCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AuthenticatorPayload>;
          };
          createMany: {
            args: Prisma.AuthenticatorCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.AuthenticatorCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AuthenticatorPayload>[];
          };
          delete: {
            args: Prisma.AuthenticatorDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AuthenticatorPayload>;
          };
          update: {
            args: Prisma.AuthenticatorUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AuthenticatorPayload>;
          };
          deleteMany: {
            args: Prisma.AuthenticatorDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.AuthenticatorUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.AuthenticatorUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AuthenticatorPayload>;
          };
          aggregate: {
            args: Prisma.AuthenticatorAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateAuthenticator>;
          };
          groupBy: {
            args: Prisma.AuthenticatorGroupByArgs<ExtArgs>;
            result: $Utils.Optional<AuthenticatorGroupByOutputType>[];
          };
          count: {
            args: Prisma.AuthenticatorCountArgs<ExtArgs>;
            result:
              | $Utils.Optional<AuthenticatorCountAggregateOutputType>
              | number;
          };
        };
      };
    };
  } & {
    other: {
      payload: any;
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
          result: any;
        };
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]];
          result: any;
        };
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
          result: any;
        };
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]];
          result: any;
        };
      };
    };
  };
  export const defineExtension: $Extensions.ExtendsHook<
    "define",
    Prisma.TypeMapCb,
    $Extensions.DefaultArgs
  >;
  export type DefaultPrismaClient = PrismaClient;
  export type ErrorFormat = "pretty" | "colorless" | "minimal";
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources;
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string;
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat;
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     *
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[];
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    };
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.DriverAdapter | null;
  }

  /* Types for Logging */
  export type LogLevel = "info" | "query" | "warn" | "error";
  export type LogDefinition = {
    level: LogLevel;
    emit: "stdout" | "event";
  };

  export type GetLogType<T extends LogLevel | LogDefinition> =
    T extends LogDefinition
      ? T["emit"] extends "event"
        ? T["level"]
        : never
      : never;
  export type GetEvents<T extends any> =
    T extends Array<LogLevel | LogDefinition>
      ?
          | GetLogType<T[0]>
          | GetLogType<T[1]>
          | GetLogType<T[2]>
          | GetLogType<T[3]>
      : never;

  export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
  };

  export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
  };
  /* End Types for Logging */

  export type PrismaAction =
    | "findUnique"
    | "findUniqueOrThrow"
    | "findMany"
    | "findFirst"
    | "findFirstOrThrow"
    | "create"
    | "createMany"
    | "createManyAndReturn"
    | "update"
    | "updateMany"
    | "upsert"
    | "delete"
    | "deleteMany"
    | "executeRaw"
    | "queryRaw"
    | "aggregate"
    | "count"
    | "runCommandRaw"
    | "findRaw"
    | "groupBy";

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName;
    action: PrismaAction;
    args: any;
    dataPath: string[];
    runInTransaction: boolean;
  };

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>;

  // tested in getLogLevel.test.ts
  export function getLogLevel(
    log: Array<LogLevel | LogDefinition>,
  ): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<
    Prisma.DefaultPrismaClient,
    runtime.ITXClientDenyList
  >;

  export type Datasource = {
    url?: string;
  };

  /**
   * Count Types
   */

  /**
   * Count Type BusinessCountOutputType
   */

  export type BusinessCountOutputType = {
    categories: number;
    products: number;
    orders: number;
    users: number;
  };

  export type BusinessCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    categories?: boolean | BusinessCountOutputTypeCountCategoriesArgs;
    products?: boolean | BusinessCountOutputTypeCountProductsArgs;
    orders?: boolean | BusinessCountOutputTypeCountOrdersArgs;
    users?: boolean | BusinessCountOutputTypeCountUsersArgs;
  };

  // Custom InputTypes
  /**
   * BusinessCountOutputType without action
   */
  export type BusinessCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the BusinessCountOutputType
     */
    select?: BusinessCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * BusinessCountOutputType without action
   */
  export type BusinessCountOutputTypeCountCategoriesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: CategoryWhereInput;
  };

  /**
   * BusinessCountOutputType without action
   */
  export type BusinessCountOutputTypeCountProductsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ProductWhereInput;
  };

  /**
   * BusinessCountOutputType without action
   */
  export type BusinessCountOutputTypeCountOrdersArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: OrderWhereInput;
  };

  /**
   * BusinessCountOutputType without action
   */
  export type BusinessCountOutputTypeCountUsersArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: UserBusinessWhereInput;
  };

  /**
   * Count Type CategoryCountOutputType
   */

  export type CategoryCountOutputType = {
    products: number;
  };

  export type CategoryCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    products?: boolean | CategoryCountOutputTypeCountProductsArgs;
  };

  // Custom InputTypes
  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the CategoryCountOutputType
     */
    select?: CategoryCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountProductsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ProductWhereInput;
  };

  /**
   * Count Type ProductCountOutputType
   */

  export type ProductCountOutputType = {
    orderItems: number;
  };

  export type ProductCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    orderItems?: boolean | ProductCountOutputTypeCountOrderItemsArgs;
  };

  // Custom InputTypes
  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductCountOutputType
     */
    select?: ProductCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountOrderItemsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: OrderProductWhereInput;
  };

  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    orders: number;
    accounts: number;
    sessions: number;
    Authenticator: number;
    business: number;
  };

  export type UserCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    orders?: boolean | UserCountOutputTypeCountOrdersArgs;
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs;
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs;
    Authenticator?: boolean | UserCountOutputTypeCountAuthenticatorArgs;
    business?: boolean | UserCountOutputTypeCountBusinessArgs;
  };

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOrdersArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: OrderWhereInput;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccountsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: AccountWhereInput;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: SessionWhereInput;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAuthenticatorArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: AuthenticatorWhereInput;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountBusinessArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: UserBusinessWhereInput;
  };

  /**
   * Count Type OrderCountOutputType
   */

  export type OrderCountOutputType = {
    items: number;
  };

  export type OrderCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    items?: boolean | OrderCountOutputTypeCountItemsArgs;
  };

  // Custom InputTypes
  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderCountOutputType
     */
    select?: OrderCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeCountItemsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: OrderProductWhereInput;
  };

  /**
   * Models
   */

  /**
   * Model Business
   */

  export type AggregateBusiness = {
    _count: BusinessCountAggregateOutputType | null;
    _avg: BusinessAvgAggregateOutputType | null;
    _sum: BusinessSumAggregateOutputType | null;
    _min: BusinessMinAggregateOutputType | null;
    _max: BusinessMaxAggregateOutputType | null;
  };

  export type BusinessAvgAggregateOutputType = {
    coordinates: number | null;
  };

  export type BusinessSumAggregateOutputType = {
    coordinates: number[];
  };

  export type BusinessMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    description: string | null;
    address: string | null;
    phone: string | null;
    howToArrive: string | null;
    slug: string | null;
  };

  export type BusinessMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    description: string | null;
    address: string | null;
    phone: string | null;
    howToArrive: string | null;
    slug: string | null;
  };

  export type BusinessCountAggregateOutputType = {
    id: number;
    name: number;
    description: number;
    address: number;
    phone: number;
    howToArrive: number;
    coordinates: number;
    slug: number;
    _all: number;
  };

  export type BusinessAvgAggregateInputType = {
    coordinates?: true;
  };

  export type BusinessSumAggregateInputType = {
    coordinates?: true;
  };

  export type BusinessMinAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    address?: true;
    phone?: true;
    howToArrive?: true;
    slug?: true;
  };

  export type BusinessMaxAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    address?: true;
    phone?: true;
    howToArrive?: true;
    slug?: true;
  };

  export type BusinessCountAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    address?: true;
    phone?: true;
    howToArrive?: true;
    coordinates?: true;
    slug?: true;
    _all?: true;
  };

  export type BusinessAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Business to aggregate.
     */
    where?: BusinessWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Businesses to fetch.
     */
    orderBy?:
      | BusinessOrderByWithRelationInput
      | BusinessOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: BusinessWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Businesses from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Businesses.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Businesses
     **/
    _count?: true | BusinessCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: BusinessAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: BusinessSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: BusinessMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: BusinessMaxAggregateInputType;
  };

  export type GetBusinessAggregateType<T extends BusinessAggregateArgs> = {
    [P in keyof T & keyof AggregateBusiness]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBusiness[P]>
      : GetScalarType<T[P], AggregateBusiness[P]>;
  };

  export type BusinessGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: BusinessWhereInput;
    orderBy?:
      | BusinessOrderByWithAggregationInput
      | BusinessOrderByWithAggregationInput[];
    by: BusinessScalarFieldEnum[] | BusinessScalarFieldEnum;
    having?: BusinessScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: BusinessCountAggregateInputType | true;
    _avg?: BusinessAvgAggregateInputType;
    _sum?: BusinessSumAggregateInputType;
    _min?: BusinessMinAggregateInputType;
    _max?: BusinessMaxAggregateInputType;
  };

  export type BusinessGroupByOutputType = {
    id: string;
    name: string;
    description: string | null;
    address: string | null;
    phone: string | null;
    howToArrive: string | null;
    coordinates: number[];
    slug: string | null;
    _count: BusinessCountAggregateOutputType | null;
    _avg: BusinessAvgAggregateOutputType | null;
    _sum: BusinessSumAggregateOutputType | null;
    _min: BusinessMinAggregateOutputType | null;
    _max: BusinessMaxAggregateOutputType | null;
  };

  type GetBusinessGroupByPayload<T extends BusinessGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<BusinessGroupByOutputType, T["by"]> & {
          [P in keyof T & keyof BusinessGroupByOutputType]: P extends "_count"
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BusinessGroupByOutputType[P]>
            : GetScalarType<T[P], BusinessGroupByOutputType[P]>;
        }
      >
    >;

  export type BusinessSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      description?: boolean;
      address?: boolean;
      phone?: boolean;
      howToArrive?: boolean;
      coordinates?: boolean;
      slug?: boolean;
      categories?: boolean | Business$categoriesArgs<ExtArgs>;
      products?: boolean | Business$productsArgs<ExtArgs>;
      orders?: boolean | Business$ordersArgs<ExtArgs>;
      users?: boolean | Business$usersArgs<ExtArgs>;
      _count?: boolean | BusinessCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["business"]
  >;

  export type BusinessSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      description?: boolean;
      address?: boolean;
      phone?: boolean;
      howToArrive?: boolean;
      coordinates?: boolean;
      slug?: boolean;
    },
    ExtArgs["result"]["business"]
  >;

  export type BusinessSelectScalar = {
    id?: boolean;
    name?: boolean;
    description?: boolean;
    address?: boolean;
    phone?: boolean;
    howToArrive?: boolean;
    coordinates?: boolean;
    slug?: boolean;
  };

  export type BusinessInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    categories?: boolean | Business$categoriesArgs<ExtArgs>;
    products?: boolean | Business$productsArgs<ExtArgs>;
    orders?: boolean | Business$ordersArgs<ExtArgs>;
    users?: boolean | Business$usersArgs<ExtArgs>;
    _count?: boolean | BusinessCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type BusinessIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};

  export type $BusinessPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "Business";
    objects: {
      categories: Prisma.$CategoryPayload<ExtArgs>[];
      products: Prisma.$ProductPayload<ExtArgs>[];
      orders: Prisma.$OrderPayload<ExtArgs>[];
      users: Prisma.$UserBusinessPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        name: string;
        description: string | null;
        address: string | null;
        phone: string | null;
        howToArrive: string | null;
        coordinates: number[];
        slug: string | null;
      },
      ExtArgs["result"]["business"]
    >;
    composites: {};
  };

  type BusinessGetPayload<
    S extends boolean | null | undefined | BusinessDefaultArgs,
  > = $Result.GetResult<Prisma.$BusinessPayload, S>;

  type BusinessCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<BusinessFindManyArgs, "select" | "include" | "distinct"> & {
    select?: BusinessCountAggregateInputType | true;
  };

  export interface BusinessDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["Business"];
      meta: { name: "Business" };
    };
    /**
     * Find zero or one Business that matches the filter.
     * @param {BusinessFindUniqueArgs} args - Arguments to find a Business
     * @example
     * // Get one Business
     * const business = await prisma.business.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BusinessFindUniqueArgs>(
      args: SelectSubset<T, BusinessFindUniqueArgs<ExtArgs>>,
    ): Prisma__BusinessClient<
      $Result.GetResult<
        Prisma.$BusinessPayload<ExtArgs>,
        T,
        "findUnique"
      > | null,
      null,
      ExtArgs
    >;

    /**
     * Find one Business that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BusinessFindUniqueOrThrowArgs} args - Arguments to find a Business
     * @example
     * // Get one Business
     * const business = await prisma.business.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BusinessFindUniqueOrThrowArgs>(
      args: SelectSubset<T, BusinessFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__BusinessClient<
      $Result.GetResult<
        Prisma.$BusinessPayload<ExtArgs>,
        T,
        "findUniqueOrThrow"
      >,
      never,
      ExtArgs
    >;

    /**
     * Find the first Business that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessFindFirstArgs} args - Arguments to find a Business
     * @example
     * // Get one Business
     * const business = await prisma.business.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BusinessFindFirstArgs>(
      args?: SelectSubset<T, BusinessFindFirstArgs<ExtArgs>>,
    ): Prisma__BusinessClient<
      $Result.GetResult<
        Prisma.$BusinessPayload<ExtArgs>,
        T,
        "findFirst"
      > | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first Business that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessFindFirstOrThrowArgs} args - Arguments to find a Business
     * @example
     * // Get one Business
     * const business = await prisma.business.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BusinessFindFirstOrThrowArgs>(
      args?: SelectSubset<T, BusinessFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__BusinessClient<
      $Result.GetResult<
        Prisma.$BusinessPayload<ExtArgs>,
        T,
        "findFirstOrThrow"
      >,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more Businesses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Businesses
     * const businesses = await prisma.business.findMany()
     *
     * // Get first 10 Businesses
     * const businesses = await prisma.business.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const businessWithIdOnly = await prisma.business.findMany({ select: { id: true } })
     *
     */
    findMany<T extends BusinessFindManyArgs>(
      args?: SelectSubset<T, BusinessFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "findMany">
    >;

    /**
     * Create a Business.
     * @param {BusinessCreateArgs} args - Arguments to create a Business.
     * @example
     * // Create one Business
     * const Business = await prisma.business.create({
     *   data: {
     *     // ... data to create a Business
     *   }
     * })
     *
     */
    create<T extends BusinessCreateArgs>(
      args: SelectSubset<T, BusinessCreateArgs<ExtArgs>>,
    ): Prisma__BusinessClient<
      $Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "create">,
      never,
      ExtArgs
    >;

    /**
     * Create many Businesses.
     * @param {BusinessCreateManyArgs} args - Arguments to create many Businesses.
     * @example
     * // Create many Businesses
     * const business = await prisma.business.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends BusinessCreateManyArgs>(
      args?: SelectSubset<T, BusinessCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Businesses and returns the data saved in the database.
     * @param {BusinessCreateManyAndReturnArgs} args - Arguments to create many Businesses.
     * @example
     * // Create many Businesses
     * const business = await prisma.business.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Businesses and only return the `id`
     * const businessWithIdOnly = await prisma.business.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends BusinessCreateManyAndReturnArgs>(
      args?: SelectSubset<T, BusinessCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$BusinessPayload<ExtArgs>,
        T,
        "createManyAndReturn"
      >
    >;

    /**
     * Delete a Business.
     * @param {BusinessDeleteArgs} args - Arguments to delete one Business.
     * @example
     * // Delete one Business
     * const Business = await prisma.business.delete({
     *   where: {
     *     // ... filter to delete one Business
     *   }
     * })
     *
     */
    delete<T extends BusinessDeleteArgs>(
      args: SelectSubset<T, BusinessDeleteArgs<ExtArgs>>,
    ): Prisma__BusinessClient<
      $Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "delete">,
      never,
      ExtArgs
    >;

    /**
     * Update one Business.
     * @param {BusinessUpdateArgs} args - Arguments to update one Business.
     * @example
     * // Update one Business
     * const business = await prisma.business.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends BusinessUpdateArgs>(
      args: SelectSubset<T, BusinessUpdateArgs<ExtArgs>>,
    ): Prisma__BusinessClient<
      $Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "update">,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more Businesses.
     * @param {BusinessDeleteManyArgs} args - Arguments to filter Businesses to delete.
     * @example
     * // Delete a few Businesses
     * const { count } = await prisma.business.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends BusinessDeleteManyArgs>(
      args?: SelectSubset<T, BusinessDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Businesses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Businesses
     * const business = await prisma.business.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends BusinessUpdateManyArgs>(
      args: SelectSubset<T, BusinessUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one Business.
     * @param {BusinessUpsertArgs} args - Arguments to update or create a Business.
     * @example
     * // Update or create a Business
     * const business = await prisma.business.upsert({
     *   create: {
     *     // ... data to create a Business
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Business we want to update
     *   }
     * })
     */
    upsert<T extends BusinessUpsertArgs>(
      args: SelectSubset<T, BusinessUpsertArgs<ExtArgs>>,
    ): Prisma__BusinessClient<
      $Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "upsert">,
      never,
      ExtArgs
    >;

    /**
     * Count the number of Businesses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessCountArgs} args - Arguments to filter Businesses to count.
     * @example
     * // Count the number of Businesses
     * const count = await prisma.business.count({
     *   where: {
     *     // ... the filter for the Businesses we want to count
     *   }
     * })
     **/
    count<T extends BusinessCountArgs>(
      args?: Subset<T, BusinessCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], BusinessCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Business.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends BusinessAggregateArgs>(
      args: Subset<T, BusinessAggregateArgs>,
    ): Prisma.PrismaPromise<GetBusinessAggregateType<T>>;

    /**
     * Group by Business.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends BusinessGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BusinessGroupByArgs["orderBy"] }
        : { orderBy?: BusinessGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, BusinessGroupByArgs, OrderByArg> &
        InputErrors,
    ): {} extends InputErrors
      ? GetBusinessGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Business model
     */
    readonly fields: BusinessFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Business.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BusinessClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    categories<T extends Business$categoriesArgs<ExtArgs> = {}>(
      args?: Subset<T, Business$categoriesArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany"> | Null
    >;
    products<T extends Business$productsArgs<ExtArgs> = {}>(
      args?: Subset<T, Business$productsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany"> | Null
    >;
    orders<T extends Business$ordersArgs<ExtArgs> = {}>(
      args?: Subset<T, Business$ordersArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany"> | Null
    >;
    users<T extends Business$usersArgs<ExtArgs> = {}>(
      args?: Subset<T, Business$usersArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<Prisma.$UserBusinessPayload<ExtArgs>, T, "findMany">
      | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Business model
   */
  interface BusinessFieldRefs {
    readonly id: FieldRef<"Business", "String">;
    readonly name: FieldRef<"Business", "String">;
    readonly description: FieldRef<"Business", "String">;
    readonly address: FieldRef<"Business", "String">;
    readonly phone: FieldRef<"Business", "String">;
    readonly howToArrive: FieldRef<"Business", "String">;
    readonly coordinates: FieldRef<"Business", "Float[]">;
    readonly slug: FieldRef<"Business", "String">;
  }

  // Custom InputTypes
  /**
   * Business findUnique
   */
  export type BusinessFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Business
     */
    select?: BusinessSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessInclude<ExtArgs> | null;
    /**
     * Filter, which Business to fetch.
     */
    where: BusinessWhereUniqueInput;
  };

  /**
   * Business findUniqueOrThrow
   */
  export type BusinessFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Business
     */
    select?: BusinessSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessInclude<ExtArgs> | null;
    /**
     * Filter, which Business to fetch.
     */
    where: BusinessWhereUniqueInput;
  };

  /**
   * Business findFirst
   */
  export type BusinessFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Business
     */
    select?: BusinessSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessInclude<ExtArgs> | null;
    /**
     * Filter, which Business to fetch.
     */
    where?: BusinessWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Businesses to fetch.
     */
    orderBy?:
      | BusinessOrderByWithRelationInput
      | BusinessOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Businesses.
     */
    cursor?: BusinessWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Businesses from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Businesses.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Businesses.
     */
    distinct?: BusinessScalarFieldEnum | BusinessScalarFieldEnum[];
  };

  /**
   * Business findFirstOrThrow
   */
  export type BusinessFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Business
     */
    select?: BusinessSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessInclude<ExtArgs> | null;
    /**
     * Filter, which Business to fetch.
     */
    where?: BusinessWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Businesses to fetch.
     */
    orderBy?:
      | BusinessOrderByWithRelationInput
      | BusinessOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Businesses.
     */
    cursor?: BusinessWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Businesses from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Businesses.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Businesses.
     */
    distinct?: BusinessScalarFieldEnum | BusinessScalarFieldEnum[];
  };

  /**
   * Business findMany
   */
  export type BusinessFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Business
     */
    select?: BusinessSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessInclude<ExtArgs> | null;
    /**
     * Filter, which Businesses to fetch.
     */
    where?: BusinessWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Businesses to fetch.
     */
    orderBy?:
      | BusinessOrderByWithRelationInput
      | BusinessOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Businesses.
     */
    cursor?: BusinessWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Businesses from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Businesses.
     */
    skip?: number;
    distinct?: BusinessScalarFieldEnum | BusinessScalarFieldEnum[];
  };

  /**
   * Business create
   */
  export type BusinessCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Business
     */
    select?: BusinessSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessInclude<ExtArgs> | null;
    /**
     * The data needed to create a Business.
     */
    data: XOR<BusinessCreateInput, BusinessUncheckedCreateInput>;
  };

  /**
   * Business createMany
   */
  export type BusinessCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Businesses.
     */
    data: BusinessCreateManyInput | BusinessCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Business createManyAndReturn
   */
  export type BusinessCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Business
     */
    select?: BusinessSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many Businesses.
     */
    data: BusinessCreateManyInput | BusinessCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Business update
   */
  export type BusinessUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Business
     */
    select?: BusinessSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessInclude<ExtArgs> | null;
    /**
     * The data needed to update a Business.
     */
    data: XOR<BusinessUpdateInput, BusinessUncheckedUpdateInput>;
    /**
     * Choose, which Business to update.
     */
    where: BusinessWhereUniqueInput;
  };

  /**
   * Business updateMany
   */
  export type BusinessUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Businesses.
     */
    data: XOR<
      BusinessUpdateManyMutationInput,
      BusinessUncheckedUpdateManyInput
    >;
    /**
     * Filter which Businesses to update
     */
    where?: BusinessWhereInput;
  };

  /**
   * Business upsert
   */
  export type BusinessUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Business
     */
    select?: BusinessSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessInclude<ExtArgs> | null;
    /**
     * The filter to search for the Business to update in case it exists.
     */
    where: BusinessWhereUniqueInput;
    /**
     * In case the Business found by the `where` argument doesn't exist, create a new Business with this data.
     */
    create: XOR<BusinessCreateInput, BusinessUncheckedCreateInput>;
    /**
     * In case the Business was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BusinessUpdateInput, BusinessUncheckedUpdateInput>;
  };

  /**
   * Business delete
   */
  export type BusinessDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Business
     */
    select?: BusinessSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessInclude<ExtArgs> | null;
    /**
     * Filter which Business to delete.
     */
    where: BusinessWhereUniqueInput;
  };

  /**
   * Business deleteMany
   */
  export type BusinessDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Businesses to delete
     */
    where?: BusinessWhereInput;
  };

  /**
   * Business.categories
   */
  export type Business$categoriesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null;
    where?: CategoryWhereInput;
    orderBy?:
      | CategoryOrderByWithRelationInput
      | CategoryOrderByWithRelationInput[];
    cursor?: CategoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[];
  };

  /**
   * Business.products
   */
  export type Business$productsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null;
    where?: ProductWhereInput;
    orderBy?:
      | ProductOrderByWithRelationInput
      | ProductOrderByWithRelationInput[];
    cursor?: ProductWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[];
  };

  /**
   * Business.orders
   */
  export type Business$ordersArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null;
    where?: OrderWhereInput;
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[];
    cursor?: OrderWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[];
  };

  /**
   * Business.users
   */
  export type Business$usersArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserBusiness
     */
    select?: UserBusinessSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBusinessInclude<ExtArgs> | null;
    where?: UserBusinessWhereInput;
    orderBy?:
      | UserBusinessOrderByWithRelationInput
      | UserBusinessOrderByWithRelationInput[];
    cursor?: UserBusinessWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: UserBusinessScalarFieldEnum | UserBusinessScalarFieldEnum[];
  };

  /**
   * Business without action
   */
  export type BusinessDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Business
     */
    select?: BusinessSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessInclude<ExtArgs> | null;
  };

  /**
   * Model Category
   */

  export type AggregateCategory = {
    _count: CategoryCountAggregateOutputType | null;
    _min: CategoryMinAggregateOutputType | null;
    _max: CategoryMaxAggregateOutputType | null;
  };

  export type CategoryMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    slug: string | null;
    businessId: string | null;
  };

  export type CategoryMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    slug: string | null;
    businessId: string | null;
  };

  export type CategoryCountAggregateOutputType = {
    id: number;
    name: number;
    slug: number;
    businessId: number;
    _all: number;
  };

  export type CategoryMinAggregateInputType = {
    id?: true;
    name?: true;
    slug?: true;
    businessId?: true;
  };

  export type CategoryMaxAggregateInputType = {
    id?: true;
    name?: true;
    slug?: true;
    businessId?: true;
  };

  export type CategoryCountAggregateInputType = {
    id?: true;
    name?: true;
    slug?: true;
    businessId?: true;
    _all?: true;
  };

  export type CategoryAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Category to aggregate.
     */
    where?: CategoryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Categories to fetch.
     */
    orderBy?:
      | CategoryOrderByWithRelationInput
      | CategoryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: CategoryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Categories.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Categories
     **/
    _count?: true | CategoryCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: CategoryMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: CategoryMaxAggregateInputType;
  };

  export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
    [P in keyof T & keyof AggregateCategory]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategory[P]>
      : GetScalarType<T[P], AggregateCategory[P]>;
  };

  export type CategoryGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: CategoryWhereInput;
    orderBy?:
      | CategoryOrderByWithAggregationInput
      | CategoryOrderByWithAggregationInput[];
    by: CategoryScalarFieldEnum[] | CategoryScalarFieldEnum;
    having?: CategoryScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CategoryCountAggregateInputType | true;
    _min?: CategoryMinAggregateInputType;
    _max?: CategoryMaxAggregateInputType;
  };

  export type CategoryGroupByOutputType = {
    id: string;
    name: string;
    slug: string | null;
    businessId: string;
    _count: CategoryCountAggregateOutputType | null;
    _min: CategoryMinAggregateOutputType | null;
    _max: CategoryMaxAggregateOutputType | null;
  };

  type GetCategoryGroupByPayload<T extends CategoryGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<CategoryGroupByOutputType, T["by"]> & {
          [P in keyof T & keyof CategoryGroupByOutputType]: P extends "_count"
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryGroupByOutputType[P]>;
        }
      >
    >;

  export type CategorySelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      slug?: boolean;
      businessId?: boolean;
      products?: boolean | Category$productsArgs<ExtArgs>;
      business?: boolean | BusinessDefaultArgs<ExtArgs>;
      _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["category"]
  >;

  export type CategorySelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      slug?: boolean;
      businessId?: boolean;
      business?: boolean | BusinessDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["category"]
  >;

  export type CategorySelectScalar = {
    id?: boolean;
    name?: boolean;
    slug?: boolean;
    businessId?: boolean;
  };

  export type CategoryInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    products?: boolean | Category$productsArgs<ExtArgs>;
    business?: boolean | BusinessDefaultArgs<ExtArgs>;
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type CategoryIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    business?: boolean | BusinessDefaultArgs<ExtArgs>;
  };

  export type $CategoryPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "Category";
    objects: {
      products: Prisma.$ProductPayload<ExtArgs>[];
      business: Prisma.$BusinessPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        /**
         * @zod.min(1, { message: "required" })
         */
        name: string;
        slug: string | null;
        businessId: string;
      },
      ExtArgs["result"]["category"]
    >;
    composites: {};
  };

  type CategoryGetPayload<
    S extends boolean | null | undefined | CategoryDefaultArgs,
  > = $Result.GetResult<Prisma.$CategoryPayload, S>;

  type CategoryCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<CategoryFindManyArgs, "select" | "include" | "distinct"> & {
    select?: CategoryCountAggregateInputType | true;
  };

  export interface CategoryDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["Category"];
      meta: { name: "Category" };
    };
    /**
     * Find zero or one Category that matches the filter.
     * @param {CategoryFindUniqueArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoryFindUniqueArgs>(
      args: SelectSubset<T, CategoryFindUniqueArgs<ExtArgs>>,
    ): Prisma__CategoryClient<
      $Result.GetResult<
        Prisma.$CategoryPayload<ExtArgs>,
        T,
        "findUnique"
      > | null,
      null,
      ExtArgs
    >;

    /**
     * Find one Category that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CategoryFindUniqueOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoryFindUniqueOrThrowArgs>(
      args: SelectSubset<T, CategoryFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__CategoryClient<
      $Result.GetResult<
        Prisma.$CategoryPayload<ExtArgs>,
        T,
        "findUniqueOrThrow"
      >,
      never,
      ExtArgs
    >;

    /**
     * Find the first Category that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoryFindFirstArgs>(
      args?: SelectSubset<T, CategoryFindFirstArgs<ExtArgs>>,
    ): Prisma__CategoryClient<
      $Result.GetResult<
        Prisma.$CategoryPayload<ExtArgs>,
        T,
        "findFirst"
      > | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first Category that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoryFindFirstOrThrowArgs>(
      args?: SelectSubset<T, CategoryFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__CategoryClient<
      $Result.GetResult<
        Prisma.$CategoryPayload<ExtArgs>,
        T,
        "findFirstOrThrow"
      >,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.category.findMany()
     *
     * // Get first 10 Categories
     * const categories = await prisma.category.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const categoryWithIdOnly = await prisma.category.findMany({ select: { id: true } })
     *
     */
    findMany<T extends CategoryFindManyArgs>(
      args?: SelectSubset<T, CategoryFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany">
    >;

    /**
     * Create a Category.
     * @param {CategoryCreateArgs} args - Arguments to create a Category.
     * @example
     * // Create one Category
     * const Category = await prisma.category.create({
     *   data: {
     *     // ... data to create a Category
     *   }
     * })
     *
     */
    create<T extends CategoryCreateArgs>(
      args: SelectSubset<T, CategoryCreateArgs<ExtArgs>>,
    ): Prisma__CategoryClient<
      $Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "create">,
      never,
      ExtArgs
    >;

    /**
     * Create many Categories.
     * @param {CategoryCreateManyArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends CategoryCreateManyArgs>(
      args?: SelectSubset<T, CategoryCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Categories and returns the data saved in the database.
     * @param {CategoryCreateManyAndReturnArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends CategoryCreateManyAndReturnArgs>(
      args?: SelectSubset<T, CategoryCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$CategoryPayload<ExtArgs>,
        T,
        "createManyAndReturn"
      >
    >;

    /**
     * Delete a Category.
     * @param {CategoryDeleteArgs} args - Arguments to delete one Category.
     * @example
     * // Delete one Category
     * const Category = await prisma.category.delete({
     *   where: {
     *     // ... filter to delete one Category
     *   }
     * })
     *
     */
    delete<T extends CategoryDeleteArgs>(
      args: SelectSubset<T, CategoryDeleteArgs<ExtArgs>>,
    ): Prisma__CategoryClient<
      $Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "delete">,
      never,
      ExtArgs
    >;

    /**
     * Update one Category.
     * @param {CategoryUpdateArgs} args - Arguments to update one Category.
     * @example
     * // Update one Category
     * const category = await prisma.category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends CategoryUpdateArgs>(
      args: SelectSubset<T, CategoryUpdateArgs<ExtArgs>>,
    ): Prisma__CategoryClient<
      $Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "update">,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more Categories.
     * @param {CategoryDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends CategoryDeleteManyArgs>(
      args?: SelectSubset<T, CategoryDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends CategoryUpdateManyArgs>(
      args: SelectSubset<T, CategoryUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one Category.
     * @param {CategoryUpsertArgs} args - Arguments to update or create a Category.
     * @example
     * // Update or create a Category
     * const category = await prisma.category.upsert({
     *   create: {
     *     // ... data to create a Category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Category we want to update
     *   }
     * })
     */
    upsert<T extends CategoryUpsertArgs>(
      args: SelectSubset<T, CategoryUpsertArgs<ExtArgs>>,
    ): Prisma__CategoryClient<
      $Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "upsert">,
      never,
      ExtArgs
    >;

    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.category.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
     **/
    count<T extends CategoryCountArgs>(
      args?: Subset<T, CategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], CategoryCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends CategoryAggregateArgs>(
      args: Subset<T, CategoryAggregateArgs>,
    ): Prisma.PrismaPromise<GetCategoryAggregateType<T>>;

    /**
     * Group by Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends CategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoryGroupByArgs["orderBy"] }
        : { orderBy?: CategoryGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, CategoryGroupByArgs, OrderByArg> &
        InputErrors,
    ): {} extends InputErrors
      ? GetCategoryGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Category model
     */
    readonly fields: CategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoryClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    products<T extends Category$productsArgs<ExtArgs> = {}>(
      args?: Subset<T, Category$productsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany"> | Null
    >;
    business<T extends BusinessDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, BusinessDefaultArgs<ExtArgs>>,
    ): Prisma__BusinessClient<
      | $Result.GetResult<
          Prisma.$BusinessPayload<ExtArgs>,
          T,
          "findUniqueOrThrow"
        >
      | Null,
      Null,
      ExtArgs
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Category model
   */
  interface CategoryFieldRefs {
    readonly id: FieldRef<"Category", "String">;
    readonly name: FieldRef<"Category", "String">;
    readonly slug: FieldRef<"Category", "String">;
    readonly businessId: FieldRef<"Category", "String">;
  }

  // Custom InputTypes
  /**
   * Category findUnique
   */
  export type CategoryFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null;
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput;
  };

  /**
   * Category findUniqueOrThrow
   */
  export type CategoryFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null;
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput;
  };

  /**
   * Category findFirst
   */
  export type CategoryFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null;
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Categories to fetch.
     */
    orderBy?:
      | CategoryOrderByWithRelationInput
      | CategoryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Categories.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[];
  };

  /**
   * Category findFirstOrThrow
   */
  export type CategoryFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null;
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Categories to fetch.
     */
    orderBy?:
      | CategoryOrderByWithRelationInput
      | CategoryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Categories.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[];
  };

  /**
   * Category findMany
   */
  export type CategoryFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null;
    /**
     * Filter, which Categories to fetch.
     */
    where?: CategoryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Categories to fetch.
     */
    orderBy?:
      | CategoryOrderByWithRelationInput
      | CategoryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Categories.
     */
    cursor?: CategoryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Categories.
     */
    skip?: number;
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[];
  };

  /**
   * Category create
   */
  export type CategoryCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null;
    /**
     * The data needed to create a Category.
     */
    data: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>;
  };

  /**
   * Category createMany
   */
  export type CategoryCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Category createManyAndReturn
   */
  export type CategoryCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Category update
   */
  export type CategoryUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null;
    /**
     * The data needed to update a Category.
     */
    data: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>;
    /**
     * Choose, which Category to update.
     */
    where: CategoryWhereUniqueInput;
  };

  /**
   * Category updateMany
   */
  export type CategoryUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Categories.
     */
    data: XOR<
      CategoryUpdateManyMutationInput,
      CategoryUncheckedUpdateManyInput
    >;
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput;
  };

  /**
   * Category upsert
   */
  export type CategoryUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null;
    /**
     * The filter to search for the Category to update in case it exists.
     */
    where: CategoryWhereUniqueInput;
    /**
     * In case the Category found by the `where` argument doesn't exist, create a new Category with this data.
     */
    create: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>;
    /**
     * In case the Category was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>;
  };

  /**
   * Category delete
   */
  export type CategoryDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null;
    /**
     * Filter which Category to delete.
     */
    where: CategoryWhereUniqueInput;
  };

  /**
   * Category deleteMany
   */
  export type CategoryDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Categories to delete
     */
    where?: CategoryWhereInput;
  };

  /**
   * Category.products
   */
  export type Category$productsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null;
    where?: ProductWhereInput;
    orderBy?:
      | ProductOrderByWithRelationInput
      | ProductOrderByWithRelationInput[];
    cursor?: ProductWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[];
  };

  /**
   * Category without action
   */
  export type CategoryDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null;
  };

  /**
   * Model Product
   */

  export type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null;
    _avg: ProductAvgAggregateOutputType | null;
    _sum: ProductSumAggregateOutputType | null;
    _min: ProductMinAggregateOutputType | null;
    _max: ProductMaxAggregateOutputType | null;
  };

  export type ProductAvgAggregateOutputType = {
    price: number | null;
    offerPrice: number | null;
  };

  export type ProductSumAggregateOutputType = {
    price: number | null;
    offerPrice: number | null;
  };

  export type ProductMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    slug: string | null;
    description: string | null;
    price: number | null;
    offerPrice: number | null;
    active: boolean | null;
    businessId: string | null;
    categoryId: string | null;
  };

  export type ProductMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    slug: string | null;
    description: string | null;
    price: number | null;
    offerPrice: number | null;
    active: boolean | null;
    businessId: string | null;
    categoryId: string | null;
  };

  export type ProductCountAggregateOutputType = {
    id: number;
    name: number;
    slug: number;
    image: number;
    description: number;
    price: number;
    offerPrice: number;
    images: number;
    active: number;
    businessId: number;
    categoryId: number;
    _all: number;
  };

  export type ProductAvgAggregateInputType = {
    price?: true;
    offerPrice?: true;
  };

  export type ProductSumAggregateInputType = {
    price?: true;
    offerPrice?: true;
  };

  export type ProductMinAggregateInputType = {
    id?: true;
    name?: true;
    slug?: true;
    description?: true;
    price?: true;
    offerPrice?: true;
    active?: true;
    businessId?: true;
    categoryId?: true;
  };

  export type ProductMaxAggregateInputType = {
    id?: true;
    name?: true;
    slug?: true;
    description?: true;
    price?: true;
    offerPrice?: true;
    active?: true;
    businessId?: true;
    categoryId?: true;
  };

  export type ProductCountAggregateInputType = {
    id?: true;
    name?: true;
    slug?: true;
    image?: true;
    description?: true;
    price?: true;
    offerPrice?: true;
    images?: true;
    active?: true;
    businessId?: true;
    categoryId?: true;
    _all?: true;
  };

  export type ProductAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Product to aggregate.
     */
    where?: ProductWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Products to fetch.
     */
    orderBy?:
      | ProductOrderByWithRelationInput
      | ProductOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: ProductWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Products from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Products.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Products
     **/
    _count?: true | ProductCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: ProductAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: ProductSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: ProductMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: ProductMaxAggregateInputType;
  };

  export type GetProductAggregateType<T extends ProductAggregateArgs> = {
    [P in keyof T & keyof AggregateProduct]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduct[P]>
      : GetScalarType<T[P], AggregateProduct[P]>;
  };

  export type ProductGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ProductWhereInput;
    orderBy?:
      | ProductOrderByWithAggregationInput
      | ProductOrderByWithAggregationInput[];
    by: ProductScalarFieldEnum[] | ProductScalarFieldEnum;
    having?: ProductScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProductCountAggregateInputType | true;
    _avg?: ProductAvgAggregateInputType;
    _sum?: ProductSumAggregateInputType;
    _min?: ProductMinAggregateInputType;
    _max?: ProductMaxAggregateInputType;
  };

  export type ProductGroupByOutputType = {
    id: string;
    name: string;
    slug: string | null;
    image: JsonValue;
    description: string;
    price: number;
    offerPrice: number | null;
    images: JsonValue[];
    active: boolean;
    businessId: string;
    categoryId: string;
    _count: ProductCountAggregateOutputType | null;
    _avg: ProductAvgAggregateOutputType | null;
    _sum: ProductSumAggregateOutputType | null;
    _min: ProductMinAggregateOutputType | null;
    _max: ProductMaxAggregateOutputType | null;
  };

  type GetProductGroupByPayload<T extends ProductGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<ProductGroupByOutputType, T["by"]> & {
          [P in keyof T & keyof ProductGroupByOutputType]: P extends "_count"
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductGroupByOutputType[P]>
            : GetScalarType<T[P], ProductGroupByOutputType[P]>;
        }
      >
    >;

  export type ProductSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      slug?: boolean;
      image?: boolean;
      description?: boolean;
      price?: boolean;
      offerPrice?: boolean;
      images?: boolean;
      active?: boolean;
      businessId?: boolean;
      categoryId?: boolean;
      business?: boolean | BusinessDefaultArgs<ExtArgs>;
      category?: boolean | CategoryDefaultArgs<ExtArgs>;
      orderItems?: boolean | Product$orderItemsArgs<ExtArgs>;
      _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["product"]
  >;

  export type ProductSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      slug?: boolean;
      image?: boolean;
      description?: boolean;
      price?: boolean;
      offerPrice?: boolean;
      images?: boolean;
      active?: boolean;
      businessId?: boolean;
      categoryId?: boolean;
      business?: boolean | BusinessDefaultArgs<ExtArgs>;
      category?: boolean | CategoryDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["product"]
  >;

  export type ProductSelectScalar = {
    id?: boolean;
    name?: boolean;
    slug?: boolean;
    image?: boolean;
    description?: boolean;
    price?: boolean;
    offerPrice?: boolean;
    images?: boolean;
    active?: boolean;
    businessId?: boolean;
    categoryId?: boolean;
  };

  export type ProductInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    business?: boolean | BusinessDefaultArgs<ExtArgs>;
    category?: boolean | CategoryDefaultArgs<ExtArgs>;
    orderItems?: boolean | Product$orderItemsArgs<ExtArgs>;
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type ProductIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    business?: boolean | BusinessDefaultArgs<ExtArgs>;
    category?: boolean | CategoryDefaultArgs<ExtArgs>;
  };

  export type $ProductPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "Product";
    objects: {
      business: Prisma.$BusinessPayload<ExtArgs>;
      category: Prisma.$CategoryPayload<ExtArgs>;
      orderItems: Prisma.$OrderProductPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        name: string;
        slug: string | null;
        image: Prisma.JsonValue;
        description: string;
        /**
         * @zod.gte(0)
         */
        price: number;
        /**
         * @zod.gte(0)
         */
        offerPrice: number | null;
        images: Prisma.JsonValue[];
        /**
         * @zod.optional()
         */
        active: boolean;
        businessId: string;
        categoryId: string;
      },
      ExtArgs["result"]["product"]
    >;
    composites: {};
  };

  type ProductGetPayload<
    S extends boolean | null | undefined | ProductDefaultArgs,
  > = $Result.GetResult<Prisma.$ProductPayload, S>;

  type ProductCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<ProductFindManyArgs, "select" | "include" | "distinct"> & {
    select?: ProductCountAggregateInputType | true;
  };

  export interface ProductDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["Product"];
      meta: { name: "Product" };
    };
    /**
     * Find zero or one Product that matches the filter.
     * @param {ProductFindUniqueArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductFindUniqueArgs>(
      args: SelectSubset<T, ProductFindUniqueArgs<ExtArgs>>,
    ): Prisma__ProductClient<
      $Result.GetResult<
        Prisma.$ProductPayload<ExtArgs>,
        T,
        "findUnique"
      > | null,
      null,
      ExtArgs
    >;

    /**
     * Find one Product that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductFindUniqueOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductFindUniqueOrThrowArgs>(
      args: SelectSubset<T, ProductFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__ProductClient<
      $Result.GetResult<
        Prisma.$ProductPayload<ExtArgs>,
        T,
        "findUniqueOrThrow"
      >,
      never,
      ExtArgs
    >;

    /**
     * Find the first Product that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductFindFirstArgs>(
      args?: SelectSubset<T, ProductFindFirstArgs<ExtArgs>>,
    ): Prisma__ProductClient<
      $Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirst"> | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first Product that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ProductFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__ProductClient<
      $Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirstOrThrow">,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more Products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Products
     * const products = await prisma.product.findMany()
     *
     * // Get first 10 Products
     * const products = await prisma.product.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const productWithIdOnly = await prisma.product.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ProductFindManyArgs>(
      args?: SelectSubset<T, ProductFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany">
    >;

    /**
     * Create a Product.
     * @param {ProductCreateArgs} args - Arguments to create a Product.
     * @example
     * // Create one Product
     * const Product = await prisma.product.create({
     *   data: {
     *     // ... data to create a Product
     *   }
     * })
     *
     */
    create<T extends ProductCreateArgs>(
      args: SelectSubset<T, ProductCreateArgs<ExtArgs>>,
    ): Prisma__ProductClient<
      $Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "create">,
      never,
      ExtArgs
    >;

    /**
     * Create many Products.
     * @param {ProductCreateManyArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ProductCreateManyArgs>(
      args?: SelectSubset<T, ProductCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Products and returns the data saved in the database.
     * @param {ProductCreateManyAndReturnArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Products and only return the `id`
     * const productWithIdOnly = await prisma.product.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ProductCreateManyAndReturnArgs>(
      args?: SelectSubset<T, ProductCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ProductPayload<ExtArgs>,
        T,
        "createManyAndReturn"
      >
    >;

    /**
     * Delete a Product.
     * @param {ProductDeleteArgs} args - Arguments to delete one Product.
     * @example
     * // Delete one Product
     * const Product = await prisma.product.delete({
     *   where: {
     *     // ... filter to delete one Product
     *   }
     * })
     *
     */
    delete<T extends ProductDeleteArgs>(
      args: SelectSubset<T, ProductDeleteArgs<ExtArgs>>,
    ): Prisma__ProductClient<
      $Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "delete">,
      never,
      ExtArgs
    >;

    /**
     * Update one Product.
     * @param {ProductUpdateArgs} args - Arguments to update one Product.
     * @example
     * // Update one Product
     * const product = await prisma.product.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ProductUpdateArgs>(
      args: SelectSubset<T, ProductUpdateArgs<ExtArgs>>,
    ): Prisma__ProductClient<
      $Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "update">,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more Products.
     * @param {ProductDeleteManyArgs} args - Arguments to filter Products to delete.
     * @example
     * // Delete a few Products
     * const { count } = await prisma.product.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ProductDeleteManyArgs>(
      args?: SelectSubset<T, ProductDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ProductUpdateManyArgs>(
      args: SelectSubset<T, ProductUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one Product.
     * @param {ProductUpsertArgs} args - Arguments to update or create a Product.
     * @example
     * // Update or create a Product
     * const product = await prisma.product.upsert({
     *   create: {
     *     // ... data to create a Product
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Product we want to update
     *   }
     * })
     */
    upsert<T extends ProductUpsertArgs>(
      args: SelectSubset<T, ProductUpsertArgs<ExtArgs>>,
    ): Prisma__ProductClient<
      $Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "upsert">,
      never,
      ExtArgs
    >;

    /**
     * Count the number of Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCountArgs} args - Arguments to filter Products to count.
     * @example
     * // Count the number of Products
     * const count = await prisma.product.count({
     *   where: {
     *     // ... the filter for the Products we want to count
     *   }
     * })
     **/
    count<T extends ProductCountArgs>(
      args?: Subset<T, ProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], ProductCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends ProductAggregateArgs>(
      args: Subset<T, ProductAggregateArgs>,
    ): Prisma.PrismaPromise<GetProductAggregateType<T>>;

    /**
     * Group by Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends ProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductGroupByArgs["orderBy"] }
        : { orderBy?: ProductGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, ProductGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors
      ? GetProductGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Product model
     */
    readonly fields: ProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Product.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    business<T extends BusinessDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, BusinessDefaultArgs<ExtArgs>>,
    ): Prisma__BusinessClient<
      | $Result.GetResult<
          Prisma.$BusinessPayload<ExtArgs>,
          T,
          "findUniqueOrThrow"
        >
      | Null,
      Null,
      ExtArgs
    >;
    category<T extends CategoryDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, CategoryDefaultArgs<ExtArgs>>,
    ): Prisma__CategoryClient<
      | $Result.GetResult<
          Prisma.$CategoryPayload<ExtArgs>,
          T,
          "findUniqueOrThrow"
        >
      | Null,
      Null,
      ExtArgs
    >;
    orderItems<T extends Product$orderItemsArgs<ExtArgs> = {}>(
      args?: Subset<T, Product$orderItemsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<Prisma.$OrderProductPayload<ExtArgs>, T, "findMany">
      | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Product model
   */
  interface ProductFieldRefs {
    readonly id: FieldRef<"Product", "String">;
    readonly name: FieldRef<"Product", "String">;
    readonly slug: FieldRef<"Product", "String">;
    readonly image: FieldRef<"Product", "Json">;
    readonly description: FieldRef<"Product", "String">;
    readonly price: FieldRef<"Product", "Int">;
    readonly offerPrice: FieldRef<"Product", "Int">;
    readonly images: FieldRef<"Product", "Json[]">;
    readonly active: FieldRef<"Product", "Boolean">;
    readonly businessId: FieldRef<"Product", "String">;
    readonly categoryId: FieldRef<"Product", "String">;
  }

  // Custom InputTypes
  /**
   * Product findUnique
   */
  export type ProductFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null;
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput;
  };

  /**
   * Product findUniqueOrThrow
   */
  export type ProductFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null;
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput;
  };

  /**
   * Product findFirst
   */
  export type ProductFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null;
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Products to fetch.
     */
    orderBy?:
      | ProductOrderByWithRelationInput
      | ProductOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Products from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Products.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[];
  };

  /**
   * Product findFirstOrThrow
   */
  export type ProductFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null;
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Products to fetch.
     */
    orderBy?:
      | ProductOrderByWithRelationInput
      | ProductOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Products from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Products.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[];
  };

  /**
   * Product findMany
   */
  export type ProductFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null;
    /**
     * Filter, which Products to fetch.
     */
    where?: ProductWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Products to fetch.
     */
    orderBy?:
      | ProductOrderByWithRelationInput
      | ProductOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Products.
     */
    cursor?: ProductWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Products from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Products.
     */
    skip?: number;
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[];
  };

  /**
   * Product create
   */
  export type ProductCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null;
    /**
     * The data needed to create a Product.
     */
    data: XOR<ProductCreateInput, ProductUncheckedCreateInput>;
  };

  /**
   * Product createMany
   */
  export type ProductCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Product createManyAndReturn
   */
  export type ProductCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Product update
   */
  export type ProductUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null;
    /**
     * The data needed to update a Product.
     */
    data: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>;
    /**
     * Choose, which Product to update.
     */
    where: ProductWhereUniqueInput;
  };

  /**
   * Product updateMany
   */
  export type ProductUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>;
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput;
  };

  /**
   * Product upsert
   */
  export type ProductUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null;
    /**
     * The filter to search for the Product to update in case it exists.
     */
    where: ProductWhereUniqueInput;
    /**
     * In case the Product found by the `where` argument doesn't exist, create a new Product with this data.
     */
    create: XOR<ProductCreateInput, ProductUncheckedCreateInput>;
    /**
     * In case the Product was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>;
  };

  /**
   * Product delete
   */
  export type ProductDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null;
    /**
     * Filter which Product to delete.
     */
    where: ProductWhereUniqueInput;
  };

  /**
   * Product deleteMany
   */
  export type ProductDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Products to delete
     */
    where?: ProductWhereInput;
  };

  /**
   * Product.orderItems
   */
  export type Product$orderItemsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderProduct
     */
    select?: OrderProductSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderProductInclude<ExtArgs> | null;
    where?: OrderProductWhereInput;
    orderBy?:
      | OrderProductOrderByWithRelationInput
      | OrderProductOrderByWithRelationInput[];
    cursor?: OrderProductWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: OrderProductScalarFieldEnum | OrderProductScalarFieldEnum[];
  };

  /**
   * Product without action
   */
  export type ProductDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null;
  };

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
  };

  export type UserMinAggregateOutputType = {
    id: string | null;
    role: $Enums.UserRoles | null;
    name: string | null;
    phone: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type UserMaxAggregateOutputType = {
    id: string | null;
    role: $Enums.UserRoles | null;
    name: string | null;
    phone: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type UserCountAggregateOutputType = {
    id: number;
    role: number;
    name: number;
    phone: number;
    email: number;
    emailVerified: number;
    image: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type UserMinAggregateInputType = {
    id?: true;
    role?: true;
    name?: true;
    phone?: true;
    email?: true;
    emailVerified?: true;
    image?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type UserMaxAggregateInputType = {
    id?: true;
    role?: true;
    name?: true;
    phone?: true;
    email?: true;
    emailVerified?: true;
    image?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type UserCountAggregateInputType = {
    id?: true;
    role?: true;
    name?: true;
    phone?: true;
    email?: true;
    emailVerified?: true;
    image?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type UserAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Users
     **/
    _count?: true | UserCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: UserMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: UserMaxAggregateInputType;
  };

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
    [P in keyof T & keyof AggregateUser]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>;
  };

  export type UserGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: UserWhereInput;
    orderBy?:
      | UserOrderByWithAggregationInput
      | UserOrderByWithAggregationInput[];
    by: UserScalarFieldEnum[] | UserScalarFieldEnum;
    having?: UserScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserCountAggregateInputType | true;
    _min?: UserMinAggregateInputType;
    _max?: UserMaxAggregateInputType;
  };

  export type UserGroupByOutputType = {
    id: string;
    role: $Enums.UserRoles;
    name: string | null;
    phone: string | null;
    email: string;
    emailVerified: Date | null;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
  };

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T["by"]> & {
        [P in keyof T & keyof UserGroupByOutputType]: P extends "_count"
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], UserGroupByOutputType[P]>
          : GetScalarType<T[P], UserGroupByOutputType[P]>;
      }
    >
  >;

  export type UserSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      role?: boolean;
      name?: boolean;
      phone?: boolean;
      email?: boolean;
      emailVerified?: boolean;
      image?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      orders?: boolean | User$ordersArgs<ExtArgs>;
      accounts?: boolean | User$accountsArgs<ExtArgs>;
      sessions?: boolean | User$sessionsArgs<ExtArgs>;
      Authenticator?: boolean | User$AuthenticatorArgs<ExtArgs>;
      business?: boolean | User$businessArgs<ExtArgs>;
      _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["user"]
  >;

  export type UserSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      role?: boolean;
      name?: boolean;
      phone?: boolean;
      email?: boolean;
      emailVerified?: boolean;
      image?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs["result"]["user"]
  >;

  export type UserSelectScalar = {
    id?: boolean;
    role?: boolean;
    name?: boolean;
    phone?: boolean;
    email?: boolean;
    emailVerified?: boolean;
    image?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type UserInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    orders?: boolean | User$ordersArgs<ExtArgs>;
    accounts?: boolean | User$accountsArgs<ExtArgs>;
    sessions?: boolean | User$sessionsArgs<ExtArgs>;
    Authenticator?: boolean | User$AuthenticatorArgs<ExtArgs>;
    business?: boolean | User$businessArgs<ExtArgs>;
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type UserIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};

  export type $UserPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "User";
    objects: {
      orders: Prisma.$OrderPayload<ExtArgs>[];
      accounts: Prisma.$AccountPayload<ExtArgs>[];
      sessions: Prisma.$SessionPayload<ExtArgs>[];
      Authenticator: Prisma.$AuthenticatorPayload<ExtArgs>[];
      business: Prisma.$UserBusinessPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        role: $Enums.UserRoles;
        name: string | null;
        phone: string | null;
        email: string;
        emailVerified: Date | null;
        image: string | null;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs["result"]["user"]
    >;
    composites: {};
  };

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> =
    $Result.GetResult<Prisma.$UserPayload, S>;

  type UserCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<UserFindManyArgs, "select" | "include" | "distinct"> & {
    select?: UserCountAggregateInputType | true;
  };

  export interface UserDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["User"];
      meta: { name: "User" };
    };
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(
      args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null,
      null,
      ExtArgs
    >;

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(
      args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">,
      never,
      ExtArgs
    >;

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(
      args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     *
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     *
     */
    findMany<T extends UserFindManyArgs>(
      args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">
    >;

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     *
     */
    create<T extends UserCreateArgs>(
      args: SelectSubset<T, UserCreateArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">,
      never,
      ExtArgs
    >;

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends UserCreateManyArgs>(
      args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(
      args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">
    >;

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     *
     */
    delete<T extends UserDeleteArgs>(
      args: SelectSubset<T, UserDeleteArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">,
      never,
      ExtArgs
    >;

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends UserUpdateArgs>(
      args: SelectSubset<T, UserUpdateArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends UserDeleteManyArgs>(
      args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends UserUpdateManyArgs>(
      args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(
      args: SelectSubset<T, UserUpsertArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">,
      never,
      ExtArgs
    >;

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
     **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], UserCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends UserAggregateArgs>(
      args: Subset<T, UserAggregateArgs>,
    ): Prisma.PrismaPromise<GetUserAggregateType<T>>;

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs["orderBy"] }
        : { orderBy?: UserGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors
      ? GetUserGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the User model
     */
    readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    orders<T extends User$ordersArgs<ExtArgs> = {}>(
      args?: Subset<T, User$ordersArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany"> | Null
    >;
    accounts<T extends User$accountsArgs<ExtArgs> = {}>(
      args?: Subset<T, User$accountsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany"> | Null
    >;
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(
      args?: Subset<T, User$sessionsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany"> | Null
    >;
    Authenticator<T extends User$AuthenticatorArgs<ExtArgs> = {}>(
      args?: Subset<T, User$AuthenticatorArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<Prisma.$AuthenticatorPayload<ExtArgs>, T, "findMany">
      | Null
    >;
    business<T extends User$businessArgs<ExtArgs> = {}>(
      args?: Subset<T, User$businessArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<Prisma.$UserBusinessPayload<ExtArgs>, T, "findMany">
      | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", "String">;
    readonly role: FieldRef<"User", "UserRoles">;
    readonly name: FieldRef<"User", "String">;
    readonly phone: FieldRef<"User", "String">;
    readonly email: FieldRef<"User", "String">;
    readonly emailVerified: FieldRef<"User", "DateTime">;
    readonly image: FieldRef<"User", "String">;
    readonly createdAt: FieldRef<"User", "DateTime">;
    readonly updatedAt: FieldRef<"User", "DateTime">;
  }

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
  };

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
  };

  /**
   * User findMany
   */
  export type UserFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
  };

  /**
   * User create
   */
  export type UserCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>;
  };

  /**
   * User createMany
   */
  export type UserCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * User update
   */
  export type UserUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>;
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput;
  };

  /**
   * User upsert
   */
  export type UserUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput;
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>;
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>;
  };

  /**
   * User delete
   */
  export type UserDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput;
  };

  /**
   * User.orders
   */
  export type User$ordersArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null;
    where?: OrderWhereInput;
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[];
    cursor?: OrderWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[];
  };

  /**
   * User.accounts
   */
  export type User$accountsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null;
    where?: AccountWhereInput;
    orderBy?:
      | AccountOrderByWithRelationInput
      | AccountOrderByWithRelationInput[];
    cursor?: AccountWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[];
  };

  /**
   * User.sessions
   */
  export type User$sessionsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    where?: SessionWhereInput;
    orderBy?:
      | SessionOrderByWithRelationInput
      | SessionOrderByWithRelationInput[];
    cursor?: SessionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[];
  };

  /**
   * User.Authenticator
   */
  export type User$AuthenticatorArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Authenticator
     */
    select?: AuthenticatorSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthenticatorInclude<ExtArgs> | null;
    where?: AuthenticatorWhereInput;
    orderBy?:
      | AuthenticatorOrderByWithRelationInput
      | AuthenticatorOrderByWithRelationInput[];
    cursor?: AuthenticatorWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: AuthenticatorScalarFieldEnum | AuthenticatorScalarFieldEnum[];
  };

  /**
   * User.business
   */
  export type User$businessArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserBusiness
     */
    select?: UserBusinessSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBusinessInclude<ExtArgs> | null;
    where?: UserBusinessWhereInput;
    orderBy?:
      | UserBusinessOrderByWithRelationInput
      | UserBusinessOrderByWithRelationInput[];
    cursor?: UserBusinessWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: UserBusinessScalarFieldEnum | UserBusinessScalarFieldEnum[];
  };

  /**
   * User without action
   */
  export type UserDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
  };

  /**
   * Model UserBusiness
   */

  export type AggregateUserBusiness = {
    _count: UserBusinessCountAggregateOutputType | null;
    _min: UserBusinessMinAggregateOutputType | null;
    _max: UserBusinessMaxAggregateOutputType | null;
  };

  export type UserBusinessMinAggregateOutputType = {
    userId: string | null;
    businessId: string | null;
  };

  export type UserBusinessMaxAggregateOutputType = {
    userId: string | null;
    businessId: string | null;
  };

  export type UserBusinessCountAggregateOutputType = {
    userId: number;
    businessId: number;
    _all: number;
  };

  export type UserBusinessMinAggregateInputType = {
    userId?: true;
    businessId?: true;
  };

  export type UserBusinessMaxAggregateInputType = {
    userId?: true;
    businessId?: true;
  };

  export type UserBusinessCountAggregateInputType = {
    userId?: true;
    businessId?: true;
    _all?: true;
  };

  export type UserBusinessAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which UserBusiness to aggregate.
     */
    where?: UserBusinessWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of UserBusinesses to fetch.
     */
    orderBy?:
      | UserBusinessOrderByWithRelationInput
      | UserBusinessOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: UserBusinessWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` UserBusinesses from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` UserBusinesses.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned UserBusinesses
     **/
    _count?: true | UserBusinessCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: UserBusinessMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: UserBusinessMaxAggregateInputType;
  };

  export type GetUserBusinessAggregateType<
    T extends UserBusinessAggregateArgs,
  > = {
    [P in keyof T & keyof AggregateUserBusiness]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserBusiness[P]>
      : GetScalarType<T[P], AggregateUserBusiness[P]>;
  };

  export type UserBusinessGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: UserBusinessWhereInput;
    orderBy?:
      | UserBusinessOrderByWithAggregationInput
      | UserBusinessOrderByWithAggregationInput[];
    by: UserBusinessScalarFieldEnum[] | UserBusinessScalarFieldEnum;
    having?: UserBusinessScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserBusinessCountAggregateInputType | true;
    _min?: UserBusinessMinAggregateInputType;
    _max?: UserBusinessMaxAggregateInputType;
  };

  export type UserBusinessGroupByOutputType = {
    userId: string;
    businessId: string;
    _count: UserBusinessCountAggregateOutputType | null;
    _min: UserBusinessMinAggregateOutputType | null;
    _max: UserBusinessMaxAggregateOutputType | null;
  };

  type GetUserBusinessGroupByPayload<T extends UserBusinessGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<UserBusinessGroupByOutputType, T["by"]> & {
          [P in keyof T &
            keyof UserBusinessGroupByOutputType]: P extends "_count"
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserBusinessGroupByOutputType[P]>
            : GetScalarType<T[P], UserBusinessGroupByOutputType[P]>;
        }
      >
    >;

  export type UserBusinessSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      userId?: boolean;
      businessId?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
      business?: boolean | BusinessDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["userBusiness"]
  >;

  export type UserBusinessSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      userId?: boolean;
      businessId?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
      business?: boolean | BusinessDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["userBusiness"]
  >;

  export type UserBusinessSelectScalar = {
    userId?: boolean;
    businessId?: boolean;
  };

  export type UserBusinessInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
    business?: boolean | BusinessDefaultArgs<ExtArgs>;
  };
  export type UserBusinessIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
    business?: boolean | BusinessDefaultArgs<ExtArgs>;
  };

  export type $UserBusinessPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "UserBusiness";
    objects: {
      user: Prisma.$UserPayload<ExtArgs>;
      business: Prisma.$BusinessPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        userId: string;
        businessId: string;
      },
      ExtArgs["result"]["userBusiness"]
    >;
    composites: {};
  };

  type UserBusinessGetPayload<
    S extends boolean | null | undefined | UserBusinessDefaultArgs,
  > = $Result.GetResult<Prisma.$UserBusinessPayload, S>;

  type UserBusinessCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<UserBusinessFindManyArgs, "select" | "include" | "distinct"> & {
    select?: UserBusinessCountAggregateInputType | true;
  };

  export interface UserBusinessDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["UserBusiness"];
      meta: { name: "UserBusiness" };
    };
    /**
     * Find zero or one UserBusiness that matches the filter.
     * @param {UserBusinessFindUniqueArgs} args - Arguments to find a UserBusiness
     * @example
     * // Get one UserBusiness
     * const userBusiness = await prisma.userBusiness.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserBusinessFindUniqueArgs>(
      args: SelectSubset<T, UserBusinessFindUniqueArgs<ExtArgs>>,
    ): Prisma__UserBusinessClient<
      $Result.GetResult<
        Prisma.$UserBusinessPayload<ExtArgs>,
        T,
        "findUnique"
      > | null,
      null,
      ExtArgs
    >;

    /**
     * Find one UserBusiness that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserBusinessFindUniqueOrThrowArgs} args - Arguments to find a UserBusiness
     * @example
     * // Get one UserBusiness
     * const userBusiness = await prisma.userBusiness.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserBusinessFindUniqueOrThrowArgs>(
      args: SelectSubset<T, UserBusinessFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__UserBusinessClient<
      $Result.GetResult<
        Prisma.$UserBusinessPayload<ExtArgs>,
        T,
        "findUniqueOrThrow"
      >,
      never,
      ExtArgs
    >;

    /**
     * Find the first UserBusiness that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserBusinessFindFirstArgs} args - Arguments to find a UserBusiness
     * @example
     * // Get one UserBusiness
     * const userBusiness = await prisma.userBusiness.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserBusinessFindFirstArgs>(
      args?: SelectSubset<T, UserBusinessFindFirstArgs<ExtArgs>>,
    ): Prisma__UserBusinessClient<
      $Result.GetResult<
        Prisma.$UserBusinessPayload<ExtArgs>,
        T,
        "findFirst"
      > | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first UserBusiness that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserBusinessFindFirstOrThrowArgs} args - Arguments to find a UserBusiness
     * @example
     * // Get one UserBusiness
     * const userBusiness = await prisma.userBusiness.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserBusinessFindFirstOrThrowArgs>(
      args?: SelectSubset<T, UserBusinessFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__UserBusinessClient<
      $Result.GetResult<
        Prisma.$UserBusinessPayload<ExtArgs>,
        T,
        "findFirstOrThrow"
      >,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more UserBusinesses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserBusinessFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserBusinesses
     * const userBusinesses = await prisma.userBusiness.findMany()
     *
     * // Get first 10 UserBusinesses
     * const userBusinesses = await prisma.userBusiness.findMany({ take: 10 })
     *
     * // Only select the `userId`
     * const userBusinessWithUserIdOnly = await prisma.userBusiness.findMany({ select: { userId: true } })
     *
     */
    findMany<T extends UserBusinessFindManyArgs>(
      args?: SelectSubset<T, UserBusinessFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$UserBusinessPayload<ExtArgs>, T, "findMany">
    >;

    /**
     * Create a UserBusiness.
     * @param {UserBusinessCreateArgs} args - Arguments to create a UserBusiness.
     * @example
     * // Create one UserBusiness
     * const UserBusiness = await prisma.userBusiness.create({
     *   data: {
     *     // ... data to create a UserBusiness
     *   }
     * })
     *
     */
    create<T extends UserBusinessCreateArgs>(
      args: SelectSubset<T, UserBusinessCreateArgs<ExtArgs>>,
    ): Prisma__UserBusinessClient<
      $Result.GetResult<Prisma.$UserBusinessPayload<ExtArgs>, T, "create">,
      never,
      ExtArgs
    >;

    /**
     * Create many UserBusinesses.
     * @param {UserBusinessCreateManyArgs} args - Arguments to create many UserBusinesses.
     * @example
     * // Create many UserBusinesses
     * const userBusiness = await prisma.userBusiness.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends UserBusinessCreateManyArgs>(
      args?: SelectSubset<T, UserBusinessCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many UserBusinesses and returns the data saved in the database.
     * @param {UserBusinessCreateManyAndReturnArgs} args - Arguments to create many UserBusinesses.
     * @example
     * // Create many UserBusinesses
     * const userBusiness = await prisma.userBusiness.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many UserBusinesses and only return the `userId`
     * const userBusinessWithUserIdOnly = await prisma.userBusiness.createManyAndReturn({
     *   select: { userId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends UserBusinessCreateManyAndReturnArgs>(
      args?: SelectSubset<T, UserBusinessCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$UserBusinessPayload<ExtArgs>,
        T,
        "createManyAndReturn"
      >
    >;

    /**
     * Delete a UserBusiness.
     * @param {UserBusinessDeleteArgs} args - Arguments to delete one UserBusiness.
     * @example
     * // Delete one UserBusiness
     * const UserBusiness = await prisma.userBusiness.delete({
     *   where: {
     *     // ... filter to delete one UserBusiness
     *   }
     * })
     *
     */
    delete<T extends UserBusinessDeleteArgs>(
      args: SelectSubset<T, UserBusinessDeleteArgs<ExtArgs>>,
    ): Prisma__UserBusinessClient<
      $Result.GetResult<Prisma.$UserBusinessPayload<ExtArgs>, T, "delete">,
      never,
      ExtArgs
    >;

    /**
     * Update one UserBusiness.
     * @param {UserBusinessUpdateArgs} args - Arguments to update one UserBusiness.
     * @example
     * // Update one UserBusiness
     * const userBusiness = await prisma.userBusiness.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends UserBusinessUpdateArgs>(
      args: SelectSubset<T, UserBusinessUpdateArgs<ExtArgs>>,
    ): Prisma__UserBusinessClient<
      $Result.GetResult<Prisma.$UserBusinessPayload<ExtArgs>, T, "update">,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more UserBusinesses.
     * @param {UserBusinessDeleteManyArgs} args - Arguments to filter UserBusinesses to delete.
     * @example
     * // Delete a few UserBusinesses
     * const { count } = await prisma.userBusiness.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends UserBusinessDeleteManyArgs>(
      args?: SelectSubset<T, UserBusinessDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more UserBusinesses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserBusinessUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserBusinesses
     * const userBusiness = await prisma.userBusiness.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends UserBusinessUpdateManyArgs>(
      args: SelectSubset<T, UserBusinessUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one UserBusiness.
     * @param {UserBusinessUpsertArgs} args - Arguments to update or create a UserBusiness.
     * @example
     * // Update or create a UserBusiness
     * const userBusiness = await prisma.userBusiness.upsert({
     *   create: {
     *     // ... data to create a UserBusiness
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserBusiness we want to update
     *   }
     * })
     */
    upsert<T extends UserBusinessUpsertArgs>(
      args: SelectSubset<T, UserBusinessUpsertArgs<ExtArgs>>,
    ): Prisma__UserBusinessClient<
      $Result.GetResult<Prisma.$UserBusinessPayload<ExtArgs>, T, "upsert">,
      never,
      ExtArgs
    >;

    /**
     * Count the number of UserBusinesses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserBusinessCountArgs} args - Arguments to filter UserBusinesses to count.
     * @example
     * // Count the number of UserBusinesses
     * const count = await prisma.userBusiness.count({
     *   where: {
     *     // ... the filter for the UserBusinesses we want to count
     *   }
     * })
     **/
    count<T extends UserBusinessCountArgs>(
      args?: Subset<T, UserBusinessCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], UserBusinessCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a UserBusiness.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserBusinessAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends UserBusinessAggregateArgs>(
      args: Subset<T, UserBusinessAggregateArgs>,
    ): Prisma.PrismaPromise<GetUserBusinessAggregateType<T>>;

    /**
     * Group by UserBusiness.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserBusinessGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends UserBusinessGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserBusinessGroupByArgs["orderBy"] }
        : { orderBy?: UserBusinessGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, UserBusinessGroupByArgs, OrderByArg> &
        InputErrors,
    ): {} extends InputErrors
      ? GetUserBusinessGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the UserBusiness model
     */
    readonly fields: UserBusinessFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserBusiness.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserBusinessClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>,
    ): Prisma__UserClient<
      | $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">
      | Null,
      Null,
      ExtArgs
    >;
    business<T extends BusinessDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, BusinessDefaultArgs<ExtArgs>>,
    ): Prisma__BusinessClient<
      | $Result.GetResult<
          Prisma.$BusinessPayload<ExtArgs>,
          T,
          "findUniqueOrThrow"
        >
      | Null,
      Null,
      ExtArgs
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the UserBusiness model
   */
  interface UserBusinessFieldRefs {
    readonly userId: FieldRef<"UserBusiness", "String">;
    readonly businessId: FieldRef<"UserBusiness", "String">;
  }

  // Custom InputTypes
  /**
   * UserBusiness findUnique
   */
  export type UserBusinessFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserBusiness
     */
    select?: UserBusinessSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBusinessInclude<ExtArgs> | null;
    /**
     * Filter, which UserBusiness to fetch.
     */
    where: UserBusinessWhereUniqueInput;
  };

  /**
   * UserBusiness findUniqueOrThrow
   */
  export type UserBusinessFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserBusiness
     */
    select?: UserBusinessSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBusinessInclude<ExtArgs> | null;
    /**
     * Filter, which UserBusiness to fetch.
     */
    where: UserBusinessWhereUniqueInput;
  };

  /**
   * UserBusiness findFirst
   */
  export type UserBusinessFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserBusiness
     */
    select?: UserBusinessSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBusinessInclude<ExtArgs> | null;
    /**
     * Filter, which UserBusiness to fetch.
     */
    where?: UserBusinessWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of UserBusinesses to fetch.
     */
    orderBy?:
      | UserBusinessOrderByWithRelationInput
      | UserBusinessOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for UserBusinesses.
     */
    cursor?: UserBusinessWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` UserBusinesses from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` UserBusinesses.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of UserBusinesses.
     */
    distinct?: UserBusinessScalarFieldEnum | UserBusinessScalarFieldEnum[];
  };

  /**
   * UserBusiness findFirstOrThrow
   */
  export type UserBusinessFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserBusiness
     */
    select?: UserBusinessSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBusinessInclude<ExtArgs> | null;
    /**
     * Filter, which UserBusiness to fetch.
     */
    where?: UserBusinessWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of UserBusinesses to fetch.
     */
    orderBy?:
      | UserBusinessOrderByWithRelationInput
      | UserBusinessOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for UserBusinesses.
     */
    cursor?: UserBusinessWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` UserBusinesses from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` UserBusinesses.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of UserBusinesses.
     */
    distinct?: UserBusinessScalarFieldEnum | UserBusinessScalarFieldEnum[];
  };

  /**
   * UserBusiness findMany
   */
  export type UserBusinessFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserBusiness
     */
    select?: UserBusinessSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBusinessInclude<ExtArgs> | null;
    /**
     * Filter, which UserBusinesses to fetch.
     */
    where?: UserBusinessWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of UserBusinesses to fetch.
     */
    orderBy?:
      | UserBusinessOrderByWithRelationInput
      | UserBusinessOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing UserBusinesses.
     */
    cursor?: UserBusinessWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` UserBusinesses from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` UserBusinesses.
     */
    skip?: number;
    distinct?: UserBusinessScalarFieldEnum | UserBusinessScalarFieldEnum[];
  };

  /**
   * UserBusiness create
   */
  export type UserBusinessCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserBusiness
     */
    select?: UserBusinessSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBusinessInclude<ExtArgs> | null;
    /**
     * The data needed to create a UserBusiness.
     */
    data: XOR<UserBusinessCreateInput, UserBusinessUncheckedCreateInput>;
  };

  /**
   * UserBusiness createMany
   */
  export type UserBusinessCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many UserBusinesses.
     */
    data: UserBusinessCreateManyInput | UserBusinessCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * UserBusiness createManyAndReturn
   */
  export type UserBusinessCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserBusiness
     */
    select?: UserBusinessSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many UserBusinesses.
     */
    data: UserBusinessCreateManyInput | UserBusinessCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBusinessIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * UserBusiness update
   */
  export type UserBusinessUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserBusiness
     */
    select?: UserBusinessSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBusinessInclude<ExtArgs> | null;
    /**
     * The data needed to update a UserBusiness.
     */
    data: XOR<UserBusinessUpdateInput, UserBusinessUncheckedUpdateInput>;
    /**
     * Choose, which UserBusiness to update.
     */
    where: UserBusinessWhereUniqueInput;
  };

  /**
   * UserBusiness updateMany
   */
  export type UserBusinessUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update UserBusinesses.
     */
    data: XOR<
      UserBusinessUpdateManyMutationInput,
      UserBusinessUncheckedUpdateManyInput
    >;
    /**
     * Filter which UserBusinesses to update
     */
    where?: UserBusinessWhereInput;
  };

  /**
   * UserBusiness upsert
   */
  export type UserBusinessUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserBusiness
     */
    select?: UserBusinessSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBusinessInclude<ExtArgs> | null;
    /**
     * The filter to search for the UserBusiness to update in case it exists.
     */
    where: UserBusinessWhereUniqueInput;
    /**
     * In case the UserBusiness found by the `where` argument doesn't exist, create a new UserBusiness with this data.
     */
    create: XOR<UserBusinessCreateInput, UserBusinessUncheckedCreateInput>;
    /**
     * In case the UserBusiness was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserBusinessUpdateInput, UserBusinessUncheckedUpdateInput>;
  };

  /**
   * UserBusiness delete
   */
  export type UserBusinessDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserBusiness
     */
    select?: UserBusinessSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBusinessInclude<ExtArgs> | null;
    /**
     * Filter which UserBusiness to delete.
     */
    where: UserBusinessWhereUniqueInput;
  };

  /**
   * UserBusiness deleteMany
   */
  export type UserBusinessDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which UserBusinesses to delete
     */
    where?: UserBusinessWhereInput;
  };

  /**
   * UserBusiness without action
   */
  export type UserBusinessDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserBusiness
     */
    select?: UserBusinessSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBusinessInclude<ExtArgs> | null;
  };

  /**
   * Model Order
   */

  export type AggregateOrder = {
    _count: OrderCountAggregateOutputType | null;
    _avg: OrderAvgAggregateOutputType | null;
    _sum: OrderSumAggregateOutputType | null;
    _min: OrderMinAggregateOutputType | null;
    _max: OrderMaxAggregateOutputType | null;
  };

  export type OrderAvgAggregateOutputType = {
    total: number | null;
    position: number | null;
  };

  export type OrderSumAggregateOutputType = {
    total: number | null;
    position: number | null;
  };

  export type OrderMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    total: number | null;
    status: $Enums.OrderStatus | null;
    sentAt: Date | null;
    position: number | null;
    businessId: string | null;
    identifier: string | null;
  };

  export type OrderMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    total: number | null;
    status: $Enums.OrderStatus | null;
    sentAt: Date | null;
    position: number | null;
    businessId: string | null;
    identifier: string | null;
  };

  export type OrderCountAggregateOutputType = {
    id: number;
    userId: number;
    productsDetails: number;
    total: number;
    status: number;
    sentAt: number;
    position: number;
    businessId: number;
    identifier: number;
    _all: number;
  };

  export type OrderAvgAggregateInputType = {
    total?: true;
    position?: true;
  };

  export type OrderSumAggregateInputType = {
    total?: true;
    position?: true;
  };

  export type OrderMinAggregateInputType = {
    id?: true;
    userId?: true;
    total?: true;
    status?: true;
    sentAt?: true;
    position?: true;
    businessId?: true;
    identifier?: true;
  };

  export type OrderMaxAggregateInputType = {
    id?: true;
    userId?: true;
    total?: true;
    status?: true;
    sentAt?: true;
    position?: true;
    businessId?: true;
    identifier?: true;
  };

  export type OrderCountAggregateInputType = {
    id?: true;
    userId?: true;
    productsDetails?: true;
    total?: true;
    status?: true;
    sentAt?: true;
    position?: true;
    businessId?: true;
    identifier?: true;
    _all?: true;
  };

  export type OrderAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Order to aggregate.
     */
    where?: OrderWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: OrderWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Orders.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Orders
     **/
    _count?: true | OrderCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: OrderAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: OrderSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: OrderMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: OrderMaxAggregateInputType;
  };

  export type GetOrderAggregateType<T extends OrderAggregateArgs> = {
    [P in keyof T & keyof AggregateOrder]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrder[P]>
      : GetScalarType<T[P], AggregateOrder[P]>;
  };

  export type OrderGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: OrderWhereInput;
    orderBy?:
      | OrderOrderByWithAggregationInput
      | OrderOrderByWithAggregationInput[];
    by: OrderScalarFieldEnum[] | OrderScalarFieldEnum;
    having?: OrderScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: OrderCountAggregateInputType | true;
    _avg?: OrderAvgAggregateInputType;
    _sum?: OrderSumAggregateInputType;
    _min?: OrderMinAggregateInputType;
    _max?: OrderMaxAggregateInputType;
  };

  export type OrderGroupByOutputType = {
    id: string;
    userId: string | null;
    productsDetails: JsonValue;
    total: number;
    status: $Enums.OrderStatus;
    sentAt: Date | null;
    position: number | null;
    businessId: string | null;
    identifier: string | null;
    _count: OrderCountAggregateOutputType | null;
    _avg: OrderAvgAggregateOutputType | null;
    _sum: OrderSumAggregateOutputType | null;
    _min: OrderMinAggregateOutputType | null;
    _max: OrderMaxAggregateOutputType | null;
  };

  type GetOrderGroupByPayload<T extends OrderGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<OrderGroupByOutputType, T["by"]> & {
          [P in keyof T & keyof OrderGroupByOutputType]: P extends "_count"
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderGroupByOutputType[P]>
            : GetScalarType<T[P], OrderGroupByOutputType[P]>;
        }
      >
    >;

  export type OrderSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      productsDetails?: boolean;
      total?: boolean;
      status?: boolean;
      sentAt?: boolean;
      position?: boolean;
      businessId?: boolean;
      identifier?: boolean;
      user?: boolean | Order$userArgs<ExtArgs>;
      items?: boolean | Order$itemsArgs<ExtArgs>;
      business?: boolean | Order$businessArgs<ExtArgs>;
      _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["order"]
  >;

  export type OrderSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      productsDetails?: boolean;
      total?: boolean;
      status?: boolean;
      sentAt?: boolean;
      position?: boolean;
      businessId?: boolean;
      identifier?: boolean;
      user?: boolean | Order$userArgs<ExtArgs>;
      business?: boolean | Order$businessArgs<ExtArgs>;
    },
    ExtArgs["result"]["order"]
  >;

  export type OrderSelectScalar = {
    id?: boolean;
    userId?: boolean;
    productsDetails?: boolean;
    total?: boolean;
    status?: boolean;
    sentAt?: boolean;
    position?: boolean;
    businessId?: boolean;
    identifier?: boolean;
  };

  export type OrderInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | Order$userArgs<ExtArgs>;
    items?: boolean | Order$itemsArgs<ExtArgs>;
    business?: boolean | Order$businessArgs<ExtArgs>;
    _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type OrderIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | Order$userArgs<ExtArgs>;
    business?: boolean | Order$businessArgs<ExtArgs>;
  };

  export type $OrderPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "Order";
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null;
      items: Prisma.$OrderProductPayload<ExtArgs>[];
      business: Prisma.$BusinessPayload<ExtArgs> | null;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        userId: string | null;
        productsDetails: Prisma.JsonValue;
        total: number;
        status: $Enums.OrderStatus;
        sentAt: Date | null;
        position: number | null;
        businessId: string | null;
        identifier: string | null;
      },
      ExtArgs["result"]["order"]
    >;
    composites: {};
  };

  type OrderGetPayload<
    S extends boolean | null | undefined | OrderDefaultArgs,
  > = $Result.GetResult<Prisma.$OrderPayload, S>;

  type OrderCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<OrderFindManyArgs, "select" | "include" | "distinct"> & {
    select?: OrderCountAggregateInputType | true;
  };

  export interface OrderDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["Order"];
      meta: { name: "Order" };
    };
    /**
     * Find zero or one Order that matches the filter.
     * @param {OrderFindUniqueArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderFindUniqueArgs>(
      args: SelectSubset<T, OrderFindUniqueArgs<ExtArgs>>,
    ): Prisma__OrderClient<
      $Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUnique"> | null,
      null,
      ExtArgs
    >;

    /**
     * Find one Order that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderFindUniqueOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderFindUniqueOrThrowArgs>(
      args: SelectSubset<T, OrderFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__OrderClient<
      $Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow">,
      never,
      ExtArgs
    >;

    /**
     * Find the first Order that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderFindFirstArgs>(
      args?: SelectSubset<T, OrderFindFirstArgs<ExtArgs>>,
    ): Prisma__OrderClient<
      $Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirst"> | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first Order that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderFindFirstOrThrowArgs>(
      args?: SelectSubset<T, OrderFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__OrderClient<
      $Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirstOrThrow">,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more Orders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Orders
     * const orders = await prisma.order.findMany()
     *
     * // Get first 10 Orders
     * const orders = await prisma.order.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const orderWithIdOnly = await prisma.order.findMany({ select: { id: true } })
     *
     */
    findMany<T extends OrderFindManyArgs>(
      args?: SelectSubset<T, OrderFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany">
    >;

    /**
     * Create a Order.
     * @param {OrderCreateArgs} args - Arguments to create a Order.
     * @example
     * // Create one Order
     * const Order = await prisma.order.create({
     *   data: {
     *     // ... data to create a Order
     *   }
     * })
     *
     */
    create<T extends OrderCreateArgs>(
      args: SelectSubset<T, OrderCreateArgs<ExtArgs>>,
    ): Prisma__OrderClient<
      $Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "create">,
      never,
      ExtArgs
    >;

    /**
     * Create many Orders.
     * @param {OrderCreateManyArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends OrderCreateManyArgs>(
      args?: SelectSubset<T, OrderCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Orders and returns the data saved in the database.
     * @param {OrderCreateManyAndReturnArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Orders and only return the `id`
     * const orderWithIdOnly = await prisma.order.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends OrderCreateManyAndReturnArgs>(
      args?: SelectSubset<T, OrderCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "createManyAndReturn">
    >;

    /**
     * Delete a Order.
     * @param {OrderDeleteArgs} args - Arguments to delete one Order.
     * @example
     * // Delete one Order
     * const Order = await prisma.order.delete({
     *   where: {
     *     // ... filter to delete one Order
     *   }
     * })
     *
     */
    delete<T extends OrderDeleteArgs>(
      args: SelectSubset<T, OrderDeleteArgs<ExtArgs>>,
    ): Prisma__OrderClient<
      $Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "delete">,
      never,
      ExtArgs
    >;

    /**
     * Update one Order.
     * @param {OrderUpdateArgs} args - Arguments to update one Order.
     * @example
     * // Update one Order
     * const order = await prisma.order.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends OrderUpdateArgs>(
      args: SelectSubset<T, OrderUpdateArgs<ExtArgs>>,
    ): Prisma__OrderClient<
      $Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "update">,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more Orders.
     * @param {OrderDeleteManyArgs} args - Arguments to filter Orders to delete.
     * @example
     * // Delete a few Orders
     * const { count } = await prisma.order.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends OrderDeleteManyArgs>(
      args?: SelectSubset<T, OrderDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends OrderUpdateManyArgs>(
      args: SelectSubset<T, OrderUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one Order.
     * @param {OrderUpsertArgs} args - Arguments to update or create a Order.
     * @example
     * // Update or create a Order
     * const order = await prisma.order.upsert({
     *   create: {
     *     // ... data to create a Order
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Order we want to update
     *   }
     * })
     */
    upsert<T extends OrderUpsertArgs>(
      args: SelectSubset<T, OrderUpsertArgs<ExtArgs>>,
    ): Prisma__OrderClient<
      $Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "upsert">,
      never,
      ExtArgs
    >;

    /**
     * Count the number of Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderCountArgs} args - Arguments to filter Orders to count.
     * @example
     * // Count the number of Orders
     * const count = await prisma.order.count({
     *   where: {
     *     // ... the filter for the Orders we want to count
     *   }
     * })
     **/
    count<T extends OrderCountArgs>(
      args?: Subset<T, OrderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], OrderCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends OrderAggregateArgs>(
      args: Subset<T, OrderAggregateArgs>,
    ): Prisma.PrismaPromise<GetOrderAggregateType<T>>;

    /**
     * Group by Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends OrderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderGroupByArgs["orderBy"] }
        : { orderBy?: OrderGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, OrderGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors
      ? GetOrderGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Order model
     */
    readonly fields: OrderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Order.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Order$userArgs<ExtArgs> = {}>(
      args?: Subset<T, Order$userArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "findUniqueOrThrow"
      > | null,
      null,
      ExtArgs
    >;
    items<T extends Order$itemsArgs<ExtArgs> = {}>(
      args?: Subset<T, Order$itemsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<Prisma.$OrderProductPayload<ExtArgs>, T, "findMany">
      | Null
    >;
    business<T extends Order$businessArgs<ExtArgs> = {}>(
      args?: Subset<T, Order$businessArgs<ExtArgs>>,
    ): Prisma__BusinessClient<
      $Result.GetResult<
        Prisma.$BusinessPayload<ExtArgs>,
        T,
        "findUniqueOrThrow"
      > | null,
      null,
      ExtArgs
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Order model
   */
  interface OrderFieldRefs {
    readonly id: FieldRef<"Order", "String">;
    readonly userId: FieldRef<"Order", "String">;
    readonly productsDetails: FieldRef<"Order", "Json">;
    readonly total: FieldRef<"Order", "Int">;
    readonly status: FieldRef<"Order", "OrderStatus">;
    readonly sentAt: FieldRef<"Order", "DateTime">;
    readonly position: FieldRef<"Order", "Int">;
    readonly businessId: FieldRef<"Order", "String">;
    readonly identifier: FieldRef<"Order", "String">;
  }

  // Custom InputTypes
  /**
   * Order findUnique
   */
  export type OrderFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null;
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput;
  };

  /**
   * Order findUniqueOrThrow
   */
  export type OrderFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null;
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput;
  };

  /**
   * Order findFirst
   */
  export type OrderFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null;
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Orders.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[];
  };

  /**
   * Order findFirstOrThrow
   */
  export type OrderFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null;
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Orders.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[];
  };

  /**
   * Order findMany
   */
  export type OrderFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null;
    /**
     * Filter, which Orders to fetch.
     */
    where?: OrderWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Orders.
     */
    cursor?: OrderWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Orders.
     */
    skip?: number;
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[];
  };

  /**
   * Order create
   */
  export type OrderCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null;
    /**
     * The data needed to create a Order.
     */
    data: XOR<OrderCreateInput, OrderUncheckedCreateInput>;
  };

  /**
   * Order createMany
   */
  export type OrderCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Order createManyAndReturn
   */
  export type OrderCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Order update
   */
  export type OrderUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null;
    /**
     * The data needed to update a Order.
     */
    data: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>;
    /**
     * Choose, which Order to update.
     */
    where: OrderWhereUniqueInput;
  };

  /**
   * Order updateMany
   */
  export type OrderUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>;
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput;
  };

  /**
   * Order upsert
   */
  export type OrderUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null;
    /**
     * The filter to search for the Order to update in case it exists.
     */
    where: OrderWhereUniqueInput;
    /**
     * In case the Order found by the `where` argument doesn't exist, create a new Order with this data.
     */
    create: XOR<OrderCreateInput, OrderUncheckedCreateInput>;
    /**
     * In case the Order was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>;
  };

  /**
   * Order delete
   */
  export type OrderDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null;
    /**
     * Filter which Order to delete.
     */
    where: OrderWhereUniqueInput;
  };

  /**
   * Order deleteMany
   */
  export type OrderDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Orders to delete
     */
    where?: OrderWhereInput;
  };

  /**
   * Order.user
   */
  export type Order$userArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    where?: UserWhereInput;
  };

  /**
   * Order.items
   */
  export type Order$itemsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderProduct
     */
    select?: OrderProductSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderProductInclude<ExtArgs> | null;
    where?: OrderProductWhereInput;
    orderBy?:
      | OrderProductOrderByWithRelationInput
      | OrderProductOrderByWithRelationInput[];
    cursor?: OrderProductWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: OrderProductScalarFieldEnum | OrderProductScalarFieldEnum[];
  };

  /**
   * Order.business
   */
  export type Order$businessArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Business
     */
    select?: BusinessSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessInclude<ExtArgs> | null;
    where?: BusinessWhereInput;
  };

  /**
   * Order without action
   */
  export type OrderDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null;
  };

  /**
   * Model OrderProduct
   */

  export type AggregateOrderProduct = {
    _count: OrderProductCountAggregateOutputType | null;
    _avg: OrderProductAvgAggregateOutputType | null;
    _sum: OrderProductSumAggregateOutputType | null;
    _min: OrderProductMinAggregateOutputType | null;
    _max: OrderProductMaxAggregateOutputType | null;
  };

  export type OrderProductAvgAggregateOutputType = {
    price: number | null;
    position: number | null;
    quantity: number | null;
  };

  export type OrderProductSumAggregateOutputType = {
    price: number | null;
    position: number | null;
    quantity: number | null;
  };

  export type OrderProductMinAggregateOutputType = {
    productId: string | null;
    orderId: string | null;
    price: number | null;
    position: number | null;
    quantity: number | null;
  };

  export type OrderProductMaxAggregateOutputType = {
    productId: string | null;
    orderId: string | null;
    price: number | null;
    position: number | null;
    quantity: number | null;
  };

  export type OrderProductCountAggregateOutputType = {
    productId: number;
    orderId: number;
    price: number;
    position: number;
    quantity: number;
    _all: number;
  };

  export type OrderProductAvgAggregateInputType = {
    price?: true;
    position?: true;
    quantity?: true;
  };

  export type OrderProductSumAggregateInputType = {
    price?: true;
    position?: true;
    quantity?: true;
  };

  export type OrderProductMinAggregateInputType = {
    productId?: true;
    orderId?: true;
    price?: true;
    position?: true;
    quantity?: true;
  };

  export type OrderProductMaxAggregateInputType = {
    productId?: true;
    orderId?: true;
    price?: true;
    position?: true;
    quantity?: true;
  };

  export type OrderProductCountAggregateInputType = {
    productId?: true;
    orderId?: true;
    price?: true;
    position?: true;
    quantity?: true;
    _all?: true;
  };

  export type OrderProductAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which OrderProduct to aggregate.
     */
    where?: OrderProductWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OrderProducts to fetch.
     */
    orderBy?:
      | OrderProductOrderByWithRelationInput
      | OrderProductOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: OrderProductWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OrderProducts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OrderProducts.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned OrderProducts
     **/
    _count?: true | OrderProductCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: OrderProductAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: OrderProductSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: OrderProductMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: OrderProductMaxAggregateInputType;
  };

  export type GetOrderProductAggregateType<
    T extends OrderProductAggregateArgs,
  > = {
    [P in keyof T & keyof AggregateOrderProduct]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrderProduct[P]>
      : GetScalarType<T[P], AggregateOrderProduct[P]>;
  };

  export type OrderProductGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: OrderProductWhereInput;
    orderBy?:
      | OrderProductOrderByWithAggregationInput
      | OrderProductOrderByWithAggregationInput[];
    by: OrderProductScalarFieldEnum[] | OrderProductScalarFieldEnum;
    having?: OrderProductScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: OrderProductCountAggregateInputType | true;
    _avg?: OrderProductAvgAggregateInputType;
    _sum?: OrderProductSumAggregateInputType;
    _min?: OrderProductMinAggregateInputType;
    _max?: OrderProductMaxAggregateInputType;
  };

  export type OrderProductGroupByOutputType = {
    productId: string;
    orderId: string;
    price: number;
    position: number;
    quantity: number;
    _count: OrderProductCountAggregateOutputType | null;
    _avg: OrderProductAvgAggregateOutputType | null;
    _sum: OrderProductSumAggregateOutputType | null;
    _min: OrderProductMinAggregateOutputType | null;
    _max: OrderProductMaxAggregateOutputType | null;
  };

  type GetOrderProductGroupByPayload<T extends OrderProductGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<OrderProductGroupByOutputType, T["by"]> & {
          [P in keyof T &
            keyof OrderProductGroupByOutputType]: P extends "_count"
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderProductGroupByOutputType[P]>
            : GetScalarType<T[P], OrderProductGroupByOutputType[P]>;
        }
      >
    >;

  export type OrderProductSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      productId?: boolean;
      orderId?: boolean;
      price?: boolean;
      position?: boolean;
      quantity?: boolean;
      product?: boolean | ProductDefaultArgs<ExtArgs>;
      order?: boolean | OrderDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["orderProduct"]
  >;

  export type OrderProductSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      productId?: boolean;
      orderId?: boolean;
      price?: boolean;
      position?: boolean;
      quantity?: boolean;
      product?: boolean | ProductDefaultArgs<ExtArgs>;
      order?: boolean | OrderDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["orderProduct"]
  >;

  export type OrderProductSelectScalar = {
    productId?: boolean;
    orderId?: boolean;
    price?: boolean;
    position?: boolean;
    quantity?: boolean;
  };

  export type OrderProductInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    product?: boolean | ProductDefaultArgs<ExtArgs>;
    order?: boolean | OrderDefaultArgs<ExtArgs>;
  };
  export type OrderProductIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    product?: boolean | ProductDefaultArgs<ExtArgs>;
    order?: boolean | OrderDefaultArgs<ExtArgs>;
  };

  export type $OrderProductPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "OrderProduct";
    objects: {
      product: Prisma.$ProductPayload<ExtArgs>;
      order: Prisma.$OrderPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        productId: string;
        orderId: string;
        price: number;
        position: number;
        quantity: number;
      },
      ExtArgs["result"]["orderProduct"]
    >;
    composites: {};
  };

  type OrderProductGetPayload<
    S extends boolean | null | undefined | OrderProductDefaultArgs,
  > = $Result.GetResult<Prisma.$OrderProductPayload, S>;

  type OrderProductCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<OrderProductFindManyArgs, "select" | "include" | "distinct"> & {
    select?: OrderProductCountAggregateInputType | true;
  };

  export interface OrderProductDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["OrderProduct"];
      meta: { name: "OrderProduct" };
    };
    /**
     * Find zero or one OrderProduct that matches the filter.
     * @param {OrderProductFindUniqueArgs} args - Arguments to find a OrderProduct
     * @example
     * // Get one OrderProduct
     * const orderProduct = await prisma.orderProduct.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderProductFindUniqueArgs>(
      args: SelectSubset<T, OrderProductFindUniqueArgs<ExtArgs>>,
    ): Prisma__OrderProductClient<
      $Result.GetResult<
        Prisma.$OrderProductPayload<ExtArgs>,
        T,
        "findUnique"
      > | null,
      null,
      ExtArgs
    >;

    /**
     * Find one OrderProduct that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderProductFindUniqueOrThrowArgs} args - Arguments to find a OrderProduct
     * @example
     * // Get one OrderProduct
     * const orderProduct = await prisma.orderProduct.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderProductFindUniqueOrThrowArgs>(
      args: SelectSubset<T, OrderProductFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__OrderProductClient<
      $Result.GetResult<
        Prisma.$OrderProductPayload<ExtArgs>,
        T,
        "findUniqueOrThrow"
      >,
      never,
      ExtArgs
    >;

    /**
     * Find the first OrderProduct that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderProductFindFirstArgs} args - Arguments to find a OrderProduct
     * @example
     * // Get one OrderProduct
     * const orderProduct = await prisma.orderProduct.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderProductFindFirstArgs>(
      args?: SelectSubset<T, OrderProductFindFirstArgs<ExtArgs>>,
    ): Prisma__OrderProductClient<
      $Result.GetResult<
        Prisma.$OrderProductPayload<ExtArgs>,
        T,
        "findFirst"
      > | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first OrderProduct that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderProductFindFirstOrThrowArgs} args - Arguments to find a OrderProduct
     * @example
     * // Get one OrderProduct
     * const orderProduct = await prisma.orderProduct.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderProductFindFirstOrThrowArgs>(
      args?: SelectSubset<T, OrderProductFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__OrderProductClient<
      $Result.GetResult<
        Prisma.$OrderProductPayload<ExtArgs>,
        T,
        "findFirstOrThrow"
      >,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more OrderProducts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OrderProducts
     * const orderProducts = await prisma.orderProduct.findMany()
     *
     * // Get first 10 OrderProducts
     * const orderProducts = await prisma.orderProduct.findMany({ take: 10 })
     *
     * // Only select the `productId`
     * const orderProductWithProductIdOnly = await prisma.orderProduct.findMany({ select: { productId: true } })
     *
     */
    findMany<T extends OrderProductFindManyArgs>(
      args?: SelectSubset<T, OrderProductFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$OrderProductPayload<ExtArgs>, T, "findMany">
    >;

    /**
     * Create a OrderProduct.
     * @param {OrderProductCreateArgs} args - Arguments to create a OrderProduct.
     * @example
     * // Create one OrderProduct
     * const OrderProduct = await prisma.orderProduct.create({
     *   data: {
     *     // ... data to create a OrderProduct
     *   }
     * })
     *
     */
    create<T extends OrderProductCreateArgs>(
      args: SelectSubset<T, OrderProductCreateArgs<ExtArgs>>,
    ): Prisma__OrderProductClient<
      $Result.GetResult<Prisma.$OrderProductPayload<ExtArgs>, T, "create">,
      never,
      ExtArgs
    >;

    /**
     * Create many OrderProducts.
     * @param {OrderProductCreateManyArgs} args - Arguments to create many OrderProducts.
     * @example
     * // Create many OrderProducts
     * const orderProduct = await prisma.orderProduct.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends OrderProductCreateManyArgs>(
      args?: SelectSubset<T, OrderProductCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many OrderProducts and returns the data saved in the database.
     * @param {OrderProductCreateManyAndReturnArgs} args - Arguments to create many OrderProducts.
     * @example
     * // Create many OrderProducts
     * const orderProduct = await prisma.orderProduct.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many OrderProducts and only return the `productId`
     * const orderProductWithProductIdOnly = await prisma.orderProduct.createManyAndReturn({
     *   select: { productId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends OrderProductCreateManyAndReturnArgs>(
      args?: SelectSubset<T, OrderProductCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$OrderProductPayload<ExtArgs>,
        T,
        "createManyAndReturn"
      >
    >;

    /**
     * Delete a OrderProduct.
     * @param {OrderProductDeleteArgs} args - Arguments to delete one OrderProduct.
     * @example
     * // Delete one OrderProduct
     * const OrderProduct = await prisma.orderProduct.delete({
     *   where: {
     *     // ... filter to delete one OrderProduct
     *   }
     * })
     *
     */
    delete<T extends OrderProductDeleteArgs>(
      args: SelectSubset<T, OrderProductDeleteArgs<ExtArgs>>,
    ): Prisma__OrderProductClient<
      $Result.GetResult<Prisma.$OrderProductPayload<ExtArgs>, T, "delete">,
      never,
      ExtArgs
    >;

    /**
     * Update one OrderProduct.
     * @param {OrderProductUpdateArgs} args - Arguments to update one OrderProduct.
     * @example
     * // Update one OrderProduct
     * const orderProduct = await prisma.orderProduct.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends OrderProductUpdateArgs>(
      args: SelectSubset<T, OrderProductUpdateArgs<ExtArgs>>,
    ): Prisma__OrderProductClient<
      $Result.GetResult<Prisma.$OrderProductPayload<ExtArgs>, T, "update">,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more OrderProducts.
     * @param {OrderProductDeleteManyArgs} args - Arguments to filter OrderProducts to delete.
     * @example
     * // Delete a few OrderProducts
     * const { count } = await prisma.orderProduct.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends OrderProductDeleteManyArgs>(
      args?: SelectSubset<T, OrderProductDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more OrderProducts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OrderProducts
     * const orderProduct = await prisma.orderProduct.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends OrderProductUpdateManyArgs>(
      args: SelectSubset<T, OrderProductUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one OrderProduct.
     * @param {OrderProductUpsertArgs} args - Arguments to update or create a OrderProduct.
     * @example
     * // Update or create a OrderProduct
     * const orderProduct = await prisma.orderProduct.upsert({
     *   create: {
     *     // ... data to create a OrderProduct
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OrderProduct we want to update
     *   }
     * })
     */
    upsert<T extends OrderProductUpsertArgs>(
      args: SelectSubset<T, OrderProductUpsertArgs<ExtArgs>>,
    ): Prisma__OrderProductClient<
      $Result.GetResult<Prisma.$OrderProductPayload<ExtArgs>, T, "upsert">,
      never,
      ExtArgs
    >;

    /**
     * Count the number of OrderProducts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderProductCountArgs} args - Arguments to filter OrderProducts to count.
     * @example
     * // Count the number of OrderProducts
     * const count = await prisma.orderProduct.count({
     *   where: {
     *     // ... the filter for the OrderProducts we want to count
     *   }
     * })
     **/
    count<T extends OrderProductCountArgs>(
      args?: Subset<T, OrderProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], OrderProductCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a OrderProduct.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends OrderProductAggregateArgs>(
      args: Subset<T, OrderProductAggregateArgs>,
    ): Prisma.PrismaPromise<GetOrderProductAggregateType<T>>;

    /**
     * Group by OrderProduct.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderProductGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends OrderProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderProductGroupByArgs["orderBy"] }
        : { orderBy?: OrderProductGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, OrderProductGroupByArgs, OrderByArg> &
        InputErrors,
    ): {} extends InputErrors
      ? GetOrderProductGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the OrderProduct model
     */
    readonly fields: OrderProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OrderProduct.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderProductClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, ProductDefaultArgs<ExtArgs>>,
    ): Prisma__ProductClient<
      | $Result.GetResult<
          Prisma.$ProductPayload<ExtArgs>,
          T,
          "findUniqueOrThrow"
        >
      | Null,
      Null,
      ExtArgs
    >;
    order<T extends OrderDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, OrderDefaultArgs<ExtArgs>>,
    ): Prisma__OrderClient<
      | $Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow">
      | Null,
      Null,
      ExtArgs
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the OrderProduct model
   */
  interface OrderProductFieldRefs {
    readonly productId: FieldRef<"OrderProduct", "String">;
    readonly orderId: FieldRef<"OrderProduct", "String">;
    readonly price: FieldRef<"OrderProduct", "Int">;
    readonly position: FieldRef<"OrderProduct", "Int">;
    readonly quantity: FieldRef<"OrderProduct", "Int">;
  }

  // Custom InputTypes
  /**
   * OrderProduct findUnique
   */
  export type OrderProductFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderProduct
     */
    select?: OrderProductSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderProductInclude<ExtArgs> | null;
    /**
     * Filter, which OrderProduct to fetch.
     */
    where: OrderProductWhereUniqueInput;
  };

  /**
   * OrderProduct findUniqueOrThrow
   */
  export type OrderProductFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderProduct
     */
    select?: OrderProductSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderProductInclude<ExtArgs> | null;
    /**
     * Filter, which OrderProduct to fetch.
     */
    where: OrderProductWhereUniqueInput;
  };

  /**
   * OrderProduct findFirst
   */
  export type OrderProductFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderProduct
     */
    select?: OrderProductSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderProductInclude<ExtArgs> | null;
    /**
     * Filter, which OrderProduct to fetch.
     */
    where?: OrderProductWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OrderProducts to fetch.
     */
    orderBy?:
      | OrderProductOrderByWithRelationInput
      | OrderProductOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for OrderProducts.
     */
    cursor?: OrderProductWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OrderProducts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OrderProducts.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of OrderProducts.
     */
    distinct?: OrderProductScalarFieldEnum | OrderProductScalarFieldEnum[];
  };

  /**
   * OrderProduct findFirstOrThrow
   */
  export type OrderProductFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderProduct
     */
    select?: OrderProductSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderProductInclude<ExtArgs> | null;
    /**
     * Filter, which OrderProduct to fetch.
     */
    where?: OrderProductWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OrderProducts to fetch.
     */
    orderBy?:
      | OrderProductOrderByWithRelationInput
      | OrderProductOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for OrderProducts.
     */
    cursor?: OrderProductWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OrderProducts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OrderProducts.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of OrderProducts.
     */
    distinct?: OrderProductScalarFieldEnum | OrderProductScalarFieldEnum[];
  };

  /**
   * OrderProduct findMany
   */
  export type OrderProductFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderProduct
     */
    select?: OrderProductSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderProductInclude<ExtArgs> | null;
    /**
     * Filter, which OrderProducts to fetch.
     */
    where?: OrderProductWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OrderProducts to fetch.
     */
    orderBy?:
      | OrderProductOrderByWithRelationInput
      | OrderProductOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing OrderProducts.
     */
    cursor?: OrderProductWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OrderProducts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OrderProducts.
     */
    skip?: number;
    distinct?: OrderProductScalarFieldEnum | OrderProductScalarFieldEnum[];
  };

  /**
   * OrderProduct create
   */
  export type OrderProductCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderProduct
     */
    select?: OrderProductSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderProductInclude<ExtArgs> | null;
    /**
     * The data needed to create a OrderProduct.
     */
    data: XOR<OrderProductCreateInput, OrderProductUncheckedCreateInput>;
  };

  /**
   * OrderProduct createMany
   */
  export type OrderProductCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many OrderProducts.
     */
    data: OrderProductCreateManyInput | OrderProductCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * OrderProduct createManyAndReturn
   */
  export type OrderProductCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderProduct
     */
    select?: OrderProductSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many OrderProducts.
     */
    data: OrderProductCreateManyInput | OrderProductCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderProductIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * OrderProduct update
   */
  export type OrderProductUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderProduct
     */
    select?: OrderProductSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderProductInclude<ExtArgs> | null;
    /**
     * The data needed to update a OrderProduct.
     */
    data: XOR<OrderProductUpdateInput, OrderProductUncheckedUpdateInput>;
    /**
     * Choose, which OrderProduct to update.
     */
    where: OrderProductWhereUniqueInput;
  };

  /**
   * OrderProduct updateMany
   */
  export type OrderProductUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update OrderProducts.
     */
    data: XOR<
      OrderProductUpdateManyMutationInput,
      OrderProductUncheckedUpdateManyInput
    >;
    /**
     * Filter which OrderProducts to update
     */
    where?: OrderProductWhereInput;
  };

  /**
   * OrderProduct upsert
   */
  export type OrderProductUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderProduct
     */
    select?: OrderProductSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderProductInclude<ExtArgs> | null;
    /**
     * The filter to search for the OrderProduct to update in case it exists.
     */
    where: OrderProductWhereUniqueInput;
    /**
     * In case the OrderProduct found by the `where` argument doesn't exist, create a new OrderProduct with this data.
     */
    create: XOR<OrderProductCreateInput, OrderProductUncheckedCreateInput>;
    /**
     * In case the OrderProduct was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderProductUpdateInput, OrderProductUncheckedUpdateInput>;
  };

  /**
   * OrderProduct delete
   */
  export type OrderProductDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderProduct
     */
    select?: OrderProductSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderProductInclude<ExtArgs> | null;
    /**
     * Filter which OrderProduct to delete.
     */
    where: OrderProductWhereUniqueInput;
  };

  /**
   * OrderProduct deleteMany
   */
  export type OrderProductDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which OrderProducts to delete
     */
    where?: OrderProductWhereInput;
  };

  /**
   * OrderProduct without action
   */
  export type OrderProductDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderProduct
     */
    select?: OrderProductSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderProductInclude<ExtArgs> | null;
  };

  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null;
    _avg: AccountAvgAggregateOutputType | null;
    _sum: AccountSumAggregateOutputType | null;
    _min: AccountMinAggregateOutputType | null;
    _max: AccountMaxAggregateOutputType | null;
  };

  export type AccountAvgAggregateOutputType = {
    expires_at: number | null;
  };

  export type AccountSumAggregateOutputType = {
    expires_at: number | null;
  };

  export type AccountMinAggregateOutputType = {
    userId: string | null;
    type: string | null;
    provider: string | null;
    providerAccountId: string | null;
    refresh_token: string | null;
    access_token: string | null;
    expires_at: number | null;
    token_type: string | null;
    scope: string | null;
    id_token: string | null;
    session_state: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type AccountMaxAggregateOutputType = {
    userId: string | null;
    type: string | null;
    provider: string | null;
    providerAccountId: string | null;
    refresh_token: string | null;
    access_token: string | null;
    expires_at: number | null;
    token_type: string | null;
    scope: string | null;
    id_token: string | null;
    session_state: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type AccountCountAggregateOutputType = {
    userId: number;
    type: number;
    provider: number;
    providerAccountId: number;
    refresh_token: number;
    access_token: number;
    expires_at: number;
    token_type: number;
    scope: number;
    id_token: number;
    session_state: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type AccountAvgAggregateInputType = {
    expires_at?: true;
  };

  export type AccountSumAggregateInputType = {
    expires_at?: true;
  };

  export type AccountMinAggregateInputType = {
    userId?: true;
    type?: true;
    provider?: true;
    providerAccountId?: true;
    refresh_token?: true;
    access_token?: true;
    expires_at?: true;
    token_type?: true;
    scope?: true;
    id_token?: true;
    session_state?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type AccountMaxAggregateInputType = {
    userId?: true;
    type?: true;
    provider?: true;
    providerAccountId?: true;
    refresh_token?: true;
    access_token?: true;
    expires_at?: true;
    token_type?: true;
    scope?: true;
    id_token?: true;
    session_state?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type AccountCountAggregateInputType = {
    userId?: true;
    type?: true;
    provider?: true;
    providerAccountId?: true;
    refresh_token?: true;
    access_token?: true;
    expires_at?: true;
    token_type?: true;
    scope?: true;
    id_token?: true;
    session_state?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type AccountAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Accounts to fetch.
     */
    orderBy?:
      | AccountOrderByWithRelationInput
      | AccountOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Accounts.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Accounts
     **/
    _count?: true | AccountCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: AccountAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: AccountSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: AccountMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: AccountMaxAggregateInputType;
  };

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
    [P in keyof T & keyof AggregateAccount]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>;
  };

  export type AccountGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: AccountWhereInput;
    orderBy?:
      | AccountOrderByWithAggregationInput
      | AccountOrderByWithAggregationInput[];
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum;
    having?: AccountScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AccountCountAggregateInputType | true;
    _avg?: AccountAvgAggregateInputType;
    _sum?: AccountSumAggregateInputType;
    _min?: AccountMinAggregateInputType;
    _max?: AccountMaxAggregateInputType;
  };

  export type AccountGroupByOutputType = {
    userId: string;
    type: string;
    provider: string;
    providerAccountId: string;
    refresh_token: string | null;
    access_token: string | null;
    expires_at: number | null;
    token_type: string | null;
    scope: string | null;
    id_token: string | null;
    session_state: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: AccountCountAggregateOutputType | null;
    _avg: AccountAvgAggregateOutputType | null;
    _sum: AccountSumAggregateOutputType | null;
    _min: AccountMinAggregateOutputType | null;
    _max: AccountMaxAggregateOutputType | null;
  };

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<AccountGroupByOutputType, T["by"]> & {
          [P in keyof T & keyof AccountGroupByOutputType]: P extends "_count"
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>;
        }
      >
    >;

  export type AccountSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      userId?: boolean;
      type?: boolean;
      provider?: boolean;
      providerAccountId?: boolean;
      refresh_token?: boolean;
      access_token?: boolean;
      expires_at?: boolean;
      token_type?: boolean;
      scope?: boolean;
      id_token?: boolean;
      session_state?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["account"]
  >;

  export type AccountSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      userId?: boolean;
      type?: boolean;
      provider?: boolean;
      providerAccountId?: boolean;
      refresh_token?: boolean;
      access_token?: boolean;
      expires_at?: boolean;
      token_type?: boolean;
      scope?: boolean;
      id_token?: boolean;
      session_state?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["account"]
  >;

  export type AccountSelectScalar = {
    userId?: boolean;
    type?: boolean;
    provider?: boolean;
    providerAccountId?: boolean;
    refresh_token?: boolean;
    access_token?: boolean;
    expires_at?: boolean;
    token_type?: boolean;
    scope?: boolean;
    id_token?: boolean;
    session_state?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type AccountInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type AccountIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };

  export type $AccountPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "Account";
    objects: {
      user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        userId: string;
        type: string;
        provider: string;
        providerAccountId: string;
        refresh_token: string | null;
        access_token: string | null;
        expires_at: number | null;
        token_type: string | null;
        scope: string | null;
        id_token: string | null;
        session_state: string | null;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs["result"]["account"]
    >;
    composites: {};
  };

  type AccountGetPayload<
    S extends boolean | null | undefined | AccountDefaultArgs,
  > = $Result.GetResult<Prisma.$AccountPayload, S>;

  type AccountCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<AccountFindManyArgs, "select" | "include" | "distinct"> & {
    select?: AccountCountAggregateInputType | true;
  };

  export interface AccountDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["Account"];
      meta: { name: "Account" };
    };
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(
      args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>,
    ): Prisma__AccountClient<
      $Result.GetResult<
        Prisma.$AccountPayload<ExtArgs>,
        T,
        "findUnique"
      > | null,
      null,
      ExtArgs
    >;

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(
      args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__AccountClient<
      $Result.GetResult<
        Prisma.$AccountPayload<ExtArgs>,
        T,
        "findUniqueOrThrow"
      >,
      never,
      ExtArgs
    >;

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(
      args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>,
    ): Prisma__AccountClient<
      $Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst"> | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(
      args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__AccountClient<
      $Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow">,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     *
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     *
     * // Only select the `userId`
     * const accountWithUserIdOnly = await prisma.account.findMany({ select: { userId: true } })
     *
     */
    findMany<T extends AccountFindManyArgs>(
      args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany">
    >;

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     *
     */
    create<T extends AccountCreateArgs>(
      args: SelectSubset<T, AccountCreateArgs<ExtArgs>>,
    ): Prisma__AccountClient<
      $Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create">,
      never,
      ExtArgs
    >;

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends AccountCreateManyArgs>(
      args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Accounts and only return the `userId`
     * const accountWithUserIdOnly = await prisma.account.createManyAndReturn({
     *   select: { userId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(
      args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$AccountPayload<ExtArgs>,
        T,
        "createManyAndReturn"
      >
    >;

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     *
     */
    delete<T extends AccountDeleteArgs>(
      args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>,
    ): Prisma__AccountClient<
      $Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete">,
      never,
      ExtArgs
    >;

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends AccountUpdateArgs>(
      args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>,
    ): Prisma__AccountClient<
      $Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update">,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends AccountDeleteManyArgs>(
      args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends AccountUpdateManyArgs>(
      args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(
      args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>,
    ): Prisma__AccountClient<
      $Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert">,
      never,
      ExtArgs
    >;

    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
     **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], AccountCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends AccountAggregateArgs>(
      args: Subset<T, AccountAggregateArgs>,
    ): Prisma.PrismaPromise<GetAccountAggregateType<T>>;

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs["orderBy"] }
        : { orderBy?: AccountGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors
      ? GetAccountGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Account model
     */
    readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>,
    ): Prisma__UserClient<
      | $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">
      | Null,
      Null,
      ExtArgs
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Account model
   */
  interface AccountFieldRefs {
    readonly userId: FieldRef<"Account", "String">;
    readonly type: FieldRef<"Account", "String">;
    readonly provider: FieldRef<"Account", "String">;
    readonly providerAccountId: FieldRef<"Account", "String">;
    readonly refresh_token: FieldRef<"Account", "String">;
    readonly access_token: FieldRef<"Account", "String">;
    readonly expires_at: FieldRef<"Account", "Int">;
    readonly token_type: FieldRef<"Account", "String">;
    readonly scope: FieldRef<"Account", "String">;
    readonly id_token: FieldRef<"Account", "String">;
    readonly session_state: FieldRef<"Account", "String">;
    readonly createdAt: FieldRef<"Account", "DateTime">;
    readonly updatedAt: FieldRef<"Account", "DateTime">;
  }

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null;
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput;
  };

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null;
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput;
  };

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null;
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Accounts to fetch.
     */
    orderBy?:
      | AccountOrderByWithRelationInput
      | AccountOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Accounts.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[];
  };

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null;
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Accounts to fetch.
     */
    orderBy?:
      | AccountOrderByWithRelationInput
      | AccountOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Accounts.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[];
  };

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null;
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Accounts to fetch.
     */
    orderBy?:
      | AccountOrderByWithRelationInput
      | AccountOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Accounts.
     */
    skip?: number;
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[];
  };

  /**
   * Account create
   */
  export type AccountCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null;
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>;
  };

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Account createManyAndReturn
   */
  export type AccountCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Account update
   */
  export type AccountUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null;
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>;
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput;
  };

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>;
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput;
  };

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null;
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput;
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>;
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>;
  };

  /**
   * Account delete
   */
  export type AccountDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null;
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput;
  };

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput;
  };

  /**
   * Account without action
   */
  export type AccountDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null;
  };

  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null;
    _min: SessionMinAggregateOutputType | null;
    _max: SessionMaxAggregateOutputType | null;
  };

  export type SessionMinAggregateOutputType = {
    sessionToken: string | null;
    userId: string | null;
    expires: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type SessionMaxAggregateOutputType = {
    sessionToken: string | null;
    userId: string | null;
    expires: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type SessionCountAggregateOutputType = {
    sessionToken: number;
    userId: number;
    expires: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type SessionMinAggregateInputType = {
    sessionToken?: true;
    userId?: true;
    expires?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type SessionMaxAggregateInputType = {
    sessionToken?: true;
    userId?: true;
    expires?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type SessionCountAggregateInputType = {
    sessionToken?: true;
    userId?: true;
    expires?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type SessionAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Sessions to fetch.
     */
    orderBy?:
      | SessionOrderByWithRelationInput
      | SessionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Sessions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Sessions
     **/
    _count?: true | SessionCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: SessionMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: SessionMaxAggregateInputType;
  };

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
    [P in keyof T & keyof AggregateSession]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>;
  };

  export type SessionGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: SessionWhereInput;
    orderBy?:
      | SessionOrderByWithAggregationInput
      | SessionOrderByWithAggregationInput[];
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum;
    having?: SessionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SessionCountAggregateInputType | true;
    _min?: SessionMinAggregateInputType;
    _max?: SessionMaxAggregateInputType;
  };

  export type SessionGroupByOutputType = {
    sessionToken: string;
    userId: string;
    expires: Date;
    createdAt: Date;
    updatedAt: Date;
    _count: SessionCountAggregateOutputType | null;
    _min: SessionMinAggregateOutputType | null;
    _max: SessionMaxAggregateOutputType | null;
  };

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<SessionGroupByOutputType, T["by"]> & {
          [P in keyof T & keyof SessionGroupByOutputType]: P extends "_count"
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>;
        }
      >
    >;

  export type SessionSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      sessionToken?: boolean;
      userId?: boolean;
      expires?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["session"]
  >;

  export type SessionSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      sessionToken?: boolean;
      userId?: boolean;
      expires?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["session"]
  >;

  export type SessionSelectScalar = {
    sessionToken?: boolean;
    userId?: boolean;
    expires?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type SessionInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type SessionIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };

  export type $SessionPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "Session";
    objects: {
      user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        sessionToken: string;
        userId: string;
        expires: Date;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs["result"]["session"]
    >;
    composites: {};
  };

  type SessionGetPayload<
    S extends boolean | null | undefined | SessionDefaultArgs,
  > = $Result.GetResult<Prisma.$SessionPayload, S>;

  type SessionCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<SessionFindManyArgs, "select" | "include" | "distinct"> & {
    select?: SessionCountAggregateInputType | true;
  };

  export interface SessionDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["Session"];
      meta: { name: "Session" };
    };
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(
      args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>,
    ): Prisma__SessionClient<
      $Result.GetResult<
        Prisma.$SessionPayload<ExtArgs>,
        T,
        "findUnique"
      > | null,
      null,
      ExtArgs
    >;

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(
      args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__SessionClient<
      $Result.GetResult<
        Prisma.$SessionPayload<ExtArgs>,
        T,
        "findUniqueOrThrow"
      >,
      never,
      ExtArgs
    >;

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(
      args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>,
    ): Prisma__SessionClient<
      $Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst"> | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(
      args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__SessionClient<
      $Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow">,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     *
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     *
     * // Only select the `sessionToken`
     * const sessionWithSessionTokenOnly = await prisma.session.findMany({ select: { sessionToken: true } })
     *
     */
    findMany<T extends SessionFindManyArgs>(
      args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany">
    >;

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     *
     */
    create<T extends SessionCreateArgs>(
      args: SelectSubset<T, SessionCreateArgs<ExtArgs>>,
    ): Prisma__SessionClient<
      $Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create">,
      never,
      ExtArgs
    >;

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends SessionCreateManyArgs>(
      args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Sessions and only return the `sessionToken`
     * const sessionWithSessionTokenOnly = await prisma.session.createManyAndReturn({
     *   select: { sessionToken: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(
      args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$SessionPayload<ExtArgs>,
        T,
        "createManyAndReturn"
      >
    >;

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     *
     */
    delete<T extends SessionDeleteArgs>(
      args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>,
    ): Prisma__SessionClient<
      $Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete">,
      never,
      ExtArgs
    >;

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends SessionUpdateArgs>(
      args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>,
    ): Prisma__SessionClient<
      $Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update">,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends SessionDeleteManyArgs>(
      args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends SessionUpdateManyArgs>(
      args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(
      args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>,
    ): Prisma__SessionClient<
      $Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert">,
      never,
      ExtArgs
    >;

    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
     **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], SessionCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends SessionAggregateArgs>(
      args: Subset<T, SessionAggregateArgs>,
    ): Prisma.PrismaPromise<GetSessionAggregateType<T>>;

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs["orderBy"] }
        : { orderBy?: SessionGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors
      ? GetSessionGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Session model
     */
    readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>,
    ): Prisma__UserClient<
      | $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">
      | Null,
      Null,
      ExtArgs
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly sessionToken: FieldRef<"Session", "String">;
    readonly userId: FieldRef<"Session", "String">;
    readonly expires: FieldRef<"Session", "DateTime">;
    readonly createdAt: FieldRef<"Session", "DateTime">;
    readonly updatedAt: FieldRef<"Session", "DateTime">;
  }

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput;
  };

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput;
  };

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Sessions to fetch.
     */
    orderBy?:
      | SessionOrderByWithRelationInput
      | SessionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Sessions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[];
  };

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Sessions to fetch.
     */
    orderBy?:
      | SessionOrderByWithRelationInput
      | SessionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Sessions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[];
  };

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Sessions to fetch.
     */
    orderBy?:
      | SessionOrderByWithRelationInput
      | SessionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Sessions.
     */
    skip?: number;
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[];
  };

  /**
   * Session create
   */
  export type SessionCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>;
  };

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Session update
   */
  export type SessionUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>;
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput;
  };

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>;
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput;
  };

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput;
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>;
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>;
  };

  /**
   * Session delete
   */
  export type SessionDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput;
  };

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput;
  };

  /**
   * Session without action
   */
  export type SessionDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
  };

  /**
   * Model VerificationToken
   */

  export type AggregateVerificationToken = {
    _count: VerificationTokenCountAggregateOutputType | null;
    _min: VerificationTokenMinAggregateOutputType | null;
    _max: VerificationTokenMaxAggregateOutputType | null;
  };

  export type VerificationTokenMinAggregateOutputType = {
    identifier: string | null;
    token: string | null;
    expires: Date | null;
  };

  export type VerificationTokenMaxAggregateOutputType = {
    identifier: string | null;
    token: string | null;
    expires: Date | null;
  };

  export type VerificationTokenCountAggregateOutputType = {
    identifier: number;
    token: number;
    expires: number;
    _all: number;
  };

  export type VerificationTokenMinAggregateInputType = {
    identifier?: true;
    token?: true;
    expires?: true;
  };

  export type VerificationTokenMaxAggregateInputType = {
    identifier?: true;
    token?: true;
    expires?: true;
  };

  export type VerificationTokenCountAggregateInputType = {
    identifier?: true;
    token?: true;
    expires?: true;
    _all?: true;
  };

  export type VerificationTokenAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which VerificationToken to aggregate.
     */
    where?: VerificationTokenWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?:
      | VerificationTokenOrderByWithRelationInput
      | VerificationTokenOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: VerificationTokenWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` VerificationTokens.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned VerificationTokens
     **/
    _count?: true | VerificationTokenCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: VerificationTokenMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: VerificationTokenMaxAggregateInputType;
  };

  export type GetVerificationTokenAggregateType<
    T extends VerificationTokenAggregateArgs,
  > = {
    [P in keyof T & keyof AggregateVerificationToken]: P extends
      | "_count"
      | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerificationToken[P]>
      : GetScalarType<T[P], AggregateVerificationToken[P]>;
  };

  export type VerificationTokenGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: VerificationTokenWhereInput;
    orderBy?:
      | VerificationTokenOrderByWithAggregationInput
      | VerificationTokenOrderByWithAggregationInput[];
    by: VerificationTokenScalarFieldEnum[] | VerificationTokenScalarFieldEnum;
    having?: VerificationTokenScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: VerificationTokenCountAggregateInputType | true;
    _min?: VerificationTokenMinAggregateInputType;
    _max?: VerificationTokenMaxAggregateInputType;
  };

  export type VerificationTokenGroupByOutputType = {
    identifier: string;
    token: string;
    expires: Date;
    _count: VerificationTokenCountAggregateOutputType | null;
    _min: VerificationTokenMinAggregateOutputType | null;
    _max: VerificationTokenMaxAggregateOutputType | null;
  };

  type GetVerificationTokenGroupByPayload<
    T extends VerificationTokenGroupByArgs,
  > = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerificationTokenGroupByOutputType, T["by"]> & {
        [P in keyof T &
          keyof VerificationTokenGroupByOutputType]: P extends "_count"
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
          : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>;
      }
    >
  >;

  export type VerificationTokenSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      identifier?: boolean;
      token?: boolean;
      expires?: boolean;
    },
    ExtArgs["result"]["verificationToken"]
  >;

  export type VerificationTokenSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      identifier?: boolean;
      token?: boolean;
      expires?: boolean;
    },
    ExtArgs["result"]["verificationToken"]
  >;

  export type VerificationTokenSelectScalar = {
    identifier?: boolean;
    token?: boolean;
    expires?: boolean;
  };

  export type $VerificationTokenPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "VerificationToken";
    objects: {};
    scalars: $Extensions.GetPayloadResult<
      {
        identifier: string;
        token: string;
        expires: Date;
      },
      ExtArgs["result"]["verificationToken"]
    >;
    composites: {};
  };

  type VerificationTokenGetPayload<
    S extends boolean | null | undefined | VerificationTokenDefaultArgs,
  > = $Result.GetResult<Prisma.$VerificationTokenPayload, S>;

  type VerificationTokenCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<VerificationTokenFindManyArgs, "select" | "include" | "distinct"> & {
    select?: VerificationTokenCountAggregateInputType | true;
  };

  export interface VerificationTokenDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["VerificationToken"];
      meta: { name: "VerificationToken" };
    };
    /**
     * Find zero or one VerificationToken that matches the filter.
     * @param {VerificationTokenFindUniqueArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VerificationTokenFindUniqueArgs>(
      args: SelectSubset<T, VerificationTokenFindUniqueArgs<ExtArgs>>,
    ): Prisma__VerificationTokenClient<
      $Result.GetResult<
        Prisma.$VerificationTokenPayload<ExtArgs>,
        T,
        "findUnique"
      > | null,
      null,
      ExtArgs
    >;

    /**
     * Find one VerificationToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VerificationTokenFindUniqueOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VerificationTokenFindUniqueOrThrowArgs>(
      args: SelectSubset<T, VerificationTokenFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__VerificationTokenClient<
      $Result.GetResult<
        Prisma.$VerificationTokenPayload<ExtArgs>,
        T,
        "findUniqueOrThrow"
      >,
      never,
      ExtArgs
    >;

    /**
     * Find the first VerificationToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VerificationTokenFindFirstArgs>(
      args?: SelectSubset<T, VerificationTokenFindFirstArgs<ExtArgs>>,
    ): Prisma__VerificationTokenClient<
      $Result.GetResult<
        Prisma.$VerificationTokenPayload<ExtArgs>,
        T,
        "findFirst"
      > | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first VerificationToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VerificationTokenFindFirstOrThrowArgs>(
      args?: SelectSubset<T, VerificationTokenFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__VerificationTokenClient<
      $Result.GetResult<
        Prisma.$VerificationTokenPayload<ExtArgs>,
        T,
        "findFirstOrThrow"
      >,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more VerificationTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany()
     *
     * // Get first 10 VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany({ take: 10 })
     *
     * // Only select the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.findMany({ select: { identifier: true } })
     *
     */
    findMany<T extends VerificationTokenFindManyArgs>(
      args?: SelectSubset<T, VerificationTokenFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$VerificationTokenPayload<ExtArgs>,
        T,
        "findMany"
      >
    >;

    /**
     * Create a VerificationToken.
     * @param {VerificationTokenCreateArgs} args - Arguments to create a VerificationToken.
     * @example
     * // Create one VerificationToken
     * const VerificationToken = await prisma.verificationToken.create({
     *   data: {
     *     // ... data to create a VerificationToken
     *   }
     * })
     *
     */
    create<T extends VerificationTokenCreateArgs>(
      args: SelectSubset<T, VerificationTokenCreateArgs<ExtArgs>>,
    ): Prisma__VerificationTokenClient<
      $Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "create">,
      never,
      ExtArgs
    >;

    /**
     * Create many VerificationTokens.
     * @param {VerificationTokenCreateManyArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends VerificationTokenCreateManyArgs>(
      args?: SelectSubset<T, VerificationTokenCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many VerificationTokens and returns the data saved in the database.
     * @param {VerificationTokenCreateManyAndReturnArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many VerificationTokens and only return the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.createManyAndReturn({
     *   select: { identifier: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends VerificationTokenCreateManyAndReturnArgs>(
      args?: SelectSubset<T, VerificationTokenCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$VerificationTokenPayload<ExtArgs>,
        T,
        "createManyAndReturn"
      >
    >;

    /**
     * Delete a VerificationToken.
     * @param {VerificationTokenDeleteArgs} args - Arguments to delete one VerificationToken.
     * @example
     * // Delete one VerificationToken
     * const VerificationToken = await prisma.verificationToken.delete({
     *   where: {
     *     // ... filter to delete one VerificationToken
     *   }
     * })
     *
     */
    delete<T extends VerificationTokenDeleteArgs>(
      args: SelectSubset<T, VerificationTokenDeleteArgs<ExtArgs>>,
    ): Prisma__VerificationTokenClient<
      $Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "delete">,
      never,
      ExtArgs
    >;

    /**
     * Update one VerificationToken.
     * @param {VerificationTokenUpdateArgs} args - Arguments to update one VerificationToken.
     * @example
     * // Update one VerificationToken
     * const verificationToken = await prisma.verificationToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends VerificationTokenUpdateArgs>(
      args: SelectSubset<T, VerificationTokenUpdateArgs<ExtArgs>>,
    ): Prisma__VerificationTokenClient<
      $Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "update">,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more VerificationTokens.
     * @param {VerificationTokenDeleteManyArgs} args - Arguments to filter VerificationTokens to delete.
     * @example
     * // Delete a few VerificationTokens
     * const { count } = await prisma.verificationToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends VerificationTokenDeleteManyArgs>(
      args?: SelectSubset<T, VerificationTokenDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends VerificationTokenUpdateManyArgs>(
      args: SelectSubset<T, VerificationTokenUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one VerificationToken.
     * @param {VerificationTokenUpsertArgs} args - Arguments to update or create a VerificationToken.
     * @example
     * // Update or create a VerificationToken
     * const verificationToken = await prisma.verificationToken.upsert({
     *   create: {
     *     // ... data to create a VerificationToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VerificationToken we want to update
     *   }
     * })
     */
    upsert<T extends VerificationTokenUpsertArgs>(
      args: SelectSubset<T, VerificationTokenUpsertArgs<ExtArgs>>,
    ): Prisma__VerificationTokenClient<
      $Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "upsert">,
      never,
      ExtArgs
    >;

    /**
     * Count the number of VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenCountArgs} args - Arguments to filter VerificationTokens to count.
     * @example
     * // Count the number of VerificationTokens
     * const count = await prisma.verificationToken.count({
     *   where: {
     *     // ... the filter for the VerificationTokens we want to count
     *   }
     * })
     **/
    count<T extends VerificationTokenCountArgs>(
      args?: Subset<T, VerificationTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<
              T["select"],
              VerificationTokenCountAggregateOutputType
            >
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends VerificationTokenAggregateArgs>(
      args: Subset<T, VerificationTokenAggregateArgs>,
    ): Prisma.PrismaPromise<GetVerificationTokenAggregateType<T>>;

    /**
     * Group by VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends VerificationTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationTokenGroupByArgs["orderBy"] }
        : { orderBy?: VerificationTokenGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, VerificationTokenGroupByArgs, OrderByArg> &
        InputErrors,
    ): {} extends InputErrors
      ? GetVerificationTokenGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the VerificationToken model
     */
    readonly fields: VerificationTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VerificationToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VerificationTokenClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the VerificationToken model
   */
  interface VerificationTokenFieldRefs {
    readonly identifier: FieldRef<"VerificationToken", "String">;
    readonly token: FieldRef<"VerificationToken", "String">;
    readonly expires: FieldRef<"VerificationToken", "DateTime">;
  }

  // Custom InputTypes
  /**
   * VerificationToken findUnique
   */
  export type VerificationTokenFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null;
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput;
  };

  /**
   * VerificationToken findUniqueOrThrow
   */
  export type VerificationTokenFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null;
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput;
  };

  /**
   * VerificationToken findFirst
   */
  export type VerificationTokenFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null;
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?:
      | VerificationTokenOrderByWithRelationInput
      | VerificationTokenOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` VerificationTokens.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?:
      | VerificationTokenScalarFieldEnum
      | VerificationTokenScalarFieldEnum[];
  };

  /**
   * VerificationToken findFirstOrThrow
   */
  export type VerificationTokenFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null;
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?:
      | VerificationTokenOrderByWithRelationInput
      | VerificationTokenOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` VerificationTokens.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?:
      | VerificationTokenScalarFieldEnum
      | VerificationTokenScalarFieldEnum[];
  };

  /**
   * VerificationToken findMany
   */
  export type VerificationTokenFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null;
    /**
     * Filter, which VerificationTokens to fetch.
     */
    where?: VerificationTokenWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?:
      | VerificationTokenOrderByWithRelationInput
      | VerificationTokenOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` VerificationTokens.
     */
    skip?: number;
    distinct?:
      | VerificationTokenScalarFieldEnum
      | VerificationTokenScalarFieldEnum[];
  };

  /**
   * VerificationToken create
   */
  export type VerificationTokenCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null;
    /**
     * The data needed to create a VerificationToken.
     */
    data: XOR<
      VerificationTokenCreateInput,
      VerificationTokenUncheckedCreateInput
    >;
  };

  /**
   * VerificationToken createMany
   */
  export type VerificationTokenCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * VerificationToken createManyAndReturn
   */
  export type VerificationTokenCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * VerificationToken update
   */
  export type VerificationTokenUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null;
    /**
     * The data needed to update a VerificationToken.
     */
    data: XOR<
      VerificationTokenUpdateInput,
      VerificationTokenUncheckedUpdateInput
    >;
    /**
     * Choose, which VerificationToken to update.
     */
    where: VerificationTokenWhereUniqueInput;
  };

  /**
   * VerificationToken updateMany
   */
  export type VerificationTokenUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<
      VerificationTokenUpdateManyMutationInput,
      VerificationTokenUncheckedUpdateManyInput
    >;
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput;
  };

  /**
   * VerificationToken upsert
   */
  export type VerificationTokenUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null;
    /**
     * The filter to search for the VerificationToken to update in case it exists.
     */
    where: VerificationTokenWhereUniqueInput;
    /**
     * In case the VerificationToken found by the `where` argument doesn't exist, create a new VerificationToken with this data.
     */
    create: XOR<
      VerificationTokenCreateInput,
      VerificationTokenUncheckedCreateInput
    >;
    /**
     * In case the VerificationToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<
      VerificationTokenUpdateInput,
      VerificationTokenUncheckedUpdateInput
    >;
  };

  /**
   * VerificationToken delete
   */
  export type VerificationTokenDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null;
    /**
     * Filter which VerificationToken to delete.
     */
    where: VerificationTokenWhereUniqueInput;
  };

  /**
   * VerificationToken deleteMany
   */
  export type VerificationTokenDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which VerificationTokens to delete
     */
    where?: VerificationTokenWhereInput;
  };

  /**
   * VerificationToken without action
   */
  export type VerificationTokenDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null;
  };

  /**
   * Model Authenticator
   */

  export type AggregateAuthenticator = {
    _count: AuthenticatorCountAggregateOutputType | null;
    _avg: AuthenticatorAvgAggregateOutputType | null;
    _sum: AuthenticatorSumAggregateOutputType | null;
    _min: AuthenticatorMinAggregateOutputType | null;
    _max: AuthenticatorMaxAggregateOutputType | null;
  };

  export type AuthenticatorAvgAggregateOutputType = {
    counter: number | null;
  };

  export type AuthenticatorSumAggregateOutputType = {
    counter: number | null;
  };

  export type AuthenticatorMinAggregateOutputType = {
    credentialID: string | null;
    userId: string | null;
    providerAccountId: string | null;
    credentialPublicKey: string | null;
    counter: number | null;
    credentialDeviceType: string | null;
    credentialBackedUp: boolean | null;
    transports: string | null;
  };

  export type AuthenticatorMaxAggregateOutputType = {
    credentialID: string | null;
    userId: string | null;
    providerAccountId: string | null;
    credentialPublicKey: string | null;
    counter: number | null;
    credentialDeviceType: string | null;
    credentialBackedUp: boolean | null;
    transports: string | null;
  };

  export type AuthenticatorCountAggregateOutputType = {
    credentialID: number;
    userId: number;
    providerAccountId: number;
    credentialPublicKey: number;
    counter: number;
    credentialDeviceType: number;
    credentialBackedUp: number;
    transports: number;
    _all: number;
  };

  export type AuthenticatorAvgAggregateInputType = {
    counter?: true;
  };

  export type AuthenticatorSumAggregateInputType = {
    counter?: true;
  };

  export type AuthenticatorMinAggregateInputType = {
    credentialID?: true;
    userId?: true;
    providerAccountId?: true;
    credentialPublicKey?: true;
    counter?: true;
    credentialDeviceType?: true;
    credentialBackedUp?: true;
    transports?: true;
  };

  export type AuthenticatorMaxAggregateInputType = {
    credentialID?: true;
    userId?: true;
    providerAccountId?: true;
    credentialPublicKey?: true;
    counter?: true;
    credentialDeviceType?: true;
    credentialBackedUp?: true;
    transports?: true;
  };

  export type AuthenticatorCountAggregateInputType = {
    credentialID?: true;
    userId?: true;
    providerAccountId?: true;
    credentialPublicKey?: true;
    counter?: true;
    credentialDeviceType?: true;
    credentialBackedUp?: true;
    transports?: true;
    _all?: true;
  };

  export type AuthenticatorAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Authenticator to aggregate.
     */
    where?: AuthenticatorWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Authenticators to fetch.
     */
    orderBy?:
      | AuthenticatorOrderByWithRelationInput
      | AuthenticatorOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: AuthenticatorWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Authenticators from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Authenticators.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Authenticators
     **/
    _count?: true | AuthenticatorCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: AuthenticatorAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: AuthenticatorSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: AuthenticatorMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: AuthenticatorMaxAggregateInputType;
  };

  export type GetAuthenticatorAggregateType<
    T extends AuthenticatorAggregateArgs,
  > = {
    [P in keyof T & keyof AggregateAuthenticator]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuthenticator[P]>
      : GetScalarType<T[P], AggregateAuthenticator[P]>;
  };

  export type AuthenticatorGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: AuthenticatorWhereInput;
    orderBy?:
      | AuthenticatorOrderByWithAggregationInput
      | AuthenticatorOrderByWithAggregationInput[];
    by: AuthenticatorScalarFieldEnum[] | AuthenticatorScalarFieldEnum;
    having?: AuthenticatorScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AuthenticatorCountAggregateInputType | true;
    _avg?: AuthenticatorAvgAggregateInputType;
    _sum?: AuthenticatorSumAggregateInputType;
    _min?: AuthenticatorMinAggregateInputType;
    _max?: AuthenticatorMaxAggregateInputType;
  };

  export type AuthenticatorGroupByOutputType = {
    credentialID: string;
    userId: string;
    providerAccountId: string;
    credentialPublicKey: string;
    counter: number;
    credentialDeviceType: string;
    credentialBackedUp: boolean;
    transports: string | null;
    _count: AuthenticatorCountAggregateOutputType | null;
    _avg: AuthenticatorAvgAggregateOutputType | null;
    _sum: AuthenticatorSumAggregateOutputType | null;
    _min: AuthenticatorMinAggregateOutputType | null;
    _max: AuthenticatorMaxAggregateOutputType | null;
  };

  type GetAuthenticatorGroupByPayload<T extends AuthenticatorGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<AuthenticatorGroupByOutputType, T["by"]> & {
          [P in keyof T &
            keyof AuthenticatorGroupByOutputType]: P extends "_count"
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuthenticatorGroupByOutputType[P]>
            : GetScalarType<T[P], AuthenticatorGroupByOutputType[P]>;
        }
      >
    >;

  export type AuthenticatorSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      credentialID?: boolean;
      userId?: boolean;
      providerAccountId?: boolean;
      credentialPublicKey?: boolean;
      counter?: boolean;
      credentialDeviceType?: boolean;
      credentialBackedUp?: boolean;
      transports?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["authenticator"]
  >;

  export type AuthenticatorSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      credentialID?: boolean;
      userId?: boolean;
      providerAccountId?: boolean;
      credentialPublicKey?: boolean;
      counter?: boolean;
      credentialDeviceType?: boolean;
      credentialBackedUp?: boolean;
      transports?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["authenticator"]
  >;

  export type AuthenticatorSelectScalar = {
    credentialID?: boolean;
    userId?: boolean;
    providerAccountId?: boolean;
    credentialPublicKey?: boolean;
    counter?: boolean;
    credentialDeviceType?: boolean;
    credentialBackedUp?: boolean;
    transports?: boolean;
  };

  export type AuthenticatorInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type AuthenticatorIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };

  export type $AuthenticatorPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "Authenticator";
    objects: {
      user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        credentialID: string;
        userId: string;
        providerAccountId: string;
        credentialPublicKey: string;
        counter: number;
        credentialDeviceType: string;
        credentialBackedUp: boolean;
        transports: string | null;
      },
      ExtArgs["result"]["authenticator"]
    >;
    composites: {};
  };

  type AuthenticatorGetPayload<
    S extends boolean | null | undefined | AuthenticatorDefaultArgs,
  > = $Result.GetResult<Prisma.$AuthenticatorPayload, S>;

  type AuthenticatorCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<AuthenticatorFindManyArgs, "select" | "include" | "distinct"> & {
    select?: AuthenticatorCountAggregateInputType | true;
  };

  export interface AuthenticatorDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["Authenticator"];
      meta: { name: "Authenticator" };
    };
    /**
     * Find zero or one Authenticator that matches the filter.
     * @param {AuthenticatorFindUniqueArgs} args - Arguments to find a Authenticator
     * @example
     * // Get one Authenticator
     * const authenticator = await prisma.authenticator.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuthenticatorFindUniqueArgs>(
      args: SelectSubset<T, AuthenticatorFindUniqueArgs<ExtArgs>>,
    ): Prisma__AuthenticatorClient<
      $Result.GetResult<
        Prisma.$AuthenticatorPayload<ExtArgs>,
        T,
        "findUnique"
      > | null,
      null,
      ExtArgs
    >;

    /**
     * Find one Authenticator that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuthenticatorFindUniqueOrThrowArgs} args - Arguments to find a Authenticator
     * @example
     * // Get one Authenticator
     * const authenticator = await prisma.authenticator.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuthenticatorFindUniqueOrThrowArgs>(
      args: SelectSubset<T, AuthenticatorFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__AuthenticatorClient<
      $Result.GetResult<
        Prisma.$AuthenticatorPayload<ExtArgs>,
        T,
        "findUniqueOrThrow"
      >,
      never,
      ExtArgs
    >;

    /**
     * Find the first Authenticator that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthenticatorFindFirstArgs} args - Arguments to find a Authenticator
     * @example
     * // Get one Authenticator
     * const authenticator = await prisma.authenticator.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuthenticatorFindFirstArgs>(
      args?: SelectSubset<T, AuthenticatorFindFirstArgs<ExtArgs>>,
    ): Prisma__AuthenticatorClient<
      $Result.GetResult<
        Prisma.$AuthenticatorPayload<ExtArgs>,
        T,
        "findFirst"
      > | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first Authenticator that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthenticatorFindFirstOrThrowArgs} args - Arguments to find a Authenticator
     * @example
     * // Get one Authenticator
     * const authenticator = await prisma.authenticator.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuthenticatorFindFirstOrThrowArgs>(
      args?: SelectSubset<T, AuthenticatorFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__AuthenticatorClient<
      $Result.GetResult<
        Prisma.$AuthenticatorPayload<ExtArgs>,
        T,
        "findFirstOrThrow"
      >,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more Authenticators that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthenticatorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Authenticators
     * const authenticators = await prisma.authenticator.findMany()
     *
     * // Get first 10 Authenticators
     * const authenticators = await prisma.authenticator.findMany({ take: 10 })
     *
     * // Only select the `credentialID`
     * const authenticatorWithCredentialIDOnly = await prisma.authenticator.findMany({ select: { credentialID: true } })
     *
     */
    findMany<T extends AuthenticatorFindManyArgs>(
      args?: SelectSubset<T, AuthenticatorFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$AuthenticatorPayload<ExtArgs>, T, "findMany">
    >;

    /**
     * Create a Authenticator.
     * @param {AuthenticatorCreateArgs} args - Arguments to create a Authenticator.
     * @example
     * // Create one Authenticator
     * const Authenticator = await prisma.authenticator.create({
     *   data: {
     *     // ... data to create a Authenticator
     *   }
     * })
     *
     */
    create<T extends AuthenticatorCreateArgs>(
      args: SelectSubset<T, AuthenticatorCreateArgs<ExtArgs>>,
    ): Prisma__AuthenticatorClient<
      $Result.GetResult<Prisma.$AuthenticatorPayload<ExtArgs>, T, "create">,
      never,
      ExtArgs
    >;

    /**
     * Create many Authenticators.
     * @param {AuthenticatorCreateManyArgs} args - Arguments to create many Authenticators.
     * @example
     * // Create many Authenticators
     * const authenticator = await prisma.authenticator.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends AuthenticatorCreateManyArgs>(
      args?: SelectSubset<T, AuthenticatorCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Authenticators and returns the data saved in the database.
     * @param {AuthenticatorCreateManyAndReturnArgs} args - Arguments to create many Authenticators.
     * @example
     * // Create many Authenticators
     * const authenticator = await prisma.authenticator.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Authenticators and only return the `credentialID`
     * const authenticatorWithCredentialIDOnly = await prisma.authenticator.createManyAndReturn({
     *   select: { credentialID: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends AuthenticatorCreateManyAndReturnArgs>(
      args?: SelectSubset<T, AuthenticatorCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$AuthenticatorPayload<ExtArgs>,
        T,
        "createManyAndReturn"
      >
    >;

    /**
     * Delete a Authenticator.
     * @param {AuthenticatorDeleteArgs} args - Arguments to delete one Authenticator.
     * @example
     * // Delete one Authenticator
     * const Authenticator = await prisma.authenticator.delete({
     *   where: {
     *     // ... filter to delete one Authenticator
     *   }
     * })
     *
     */
    delete<T extends AuthenticatorDeleteArgs>(
      args: SelectSubset<T, AuthenticatorDeleteArgs<ExtArgs>>,
    ): Prisma__AuthenticatorClient<
      $Result.GetResult<Prisma.$AuthenticatorPayload<ExtArgs>, T, "delete">,
      never,
      ExtArgs
    >;

    /**
     * Update one Authenticator.
     * @param {AuthenticatorUpdateArgs} args - Arguments to update one Authenticator.
     * @example
     * // Update one Authenticator
     * const authenticator = await prisma.authenticator.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends AuthenticatorUpdateArgs>(
      args: SelectSubset<T, AuthenticatorUpdateArgs<ExtArgs>>,
    ): Prisma__AuthenticatorClient<
      $Result.GetResult<Prisma.$AuthenticatorPayload<ExtArgs>, T, "update">,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more Authenticators.
     * @param {AuthenticatorDeleteManyArgs} args - Arguments to filter Authenticators to delete.
     * @example
     * // Delete a few Authenticators
     * const { count } = await prisma.authenticator.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends AuthenticatorDeleteManyArgs>(
      args?: SelectSubset<T, AuthenticatorDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Authenticators.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthenticatorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Authenticators
     * const authenticator = await prisma.authenticator.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends AuthenticatorUpdateManyArgs>(
      args: SelectSubset<T, AuthenticatorUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one Authenticator.
     * @param {AuthenticatorUpsertArgs} args - Arguments to update or create a Authenticator.
     * @example
     * // Update or create a Authenticator
     * const authenticator = await prisma.authenticator.upsert({
     *   create: {
     *     // ... data to create a Authenticator
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Authenticator we want to update
     *   }
     * })
     */
    upsert<T extends AuthenticatorUpsertArgs>(
      args: SelectSubset<T, AuthenticatorUpsertArgs<ExtArgs>>,
    ): Prisma__AuthenticatorClient<
      $Result.GetResult<Prisma.$AuthenticatorPayload<ExtArgs>, T, "upsert">,
      never,
      ExtArgs
    >;

    /**
     * Count the number of Authenticators.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthenticatorCountArgs} args - Arguments to filter Authenticators to count.
     * @example
     * // Count the number of Authenticators
     * const count = await prisma.authenticator.count({
     *   where: {
     *     // ... the filter for the Authenticators we want to count
     *   }
     * })
     **/
    count<T extends AuthenticatorCountArgs>(
      args?: Subset<T, AuthenticatorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], AuthenticatorCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Authenticator.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthenticatorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends AuthenticatorAggregateArgs>(
      args: Subset<T, AuthenticatorAggregateArgs>,
    ): Prisma.PrismaPromise<GetAuthenticatorAggregateType<T>>;

    /**
     * Group by Authenticator.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthenticatorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends AuthenticatorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuthenticatorGroupByArgs["orderBy"] }
        : { orderBy?: AuthenticatorGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, AuthenticatorGroupByArgs, OrderByArg> &
        InputErrors,
    ): {} extends InputErrors
      ? GetAuthenticatorGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Authenticator model
     */
    readonly fields: AuthenticatorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Authenticator.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuthenticatorClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>,
    ): Prisma__UserClient<
      | $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">
      | Null,
      Null,
      ExtArgs
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Authenticator model
   */
  interface AuthenticatorFieldRefs {
    readonly credentialID: FieldRef<"Authenticator", "String">;
    readonly userId: FieldRef<"Authenticator", "String">;
    readonly providerAccountId: FieldRef<"Authenticator", "String">;
    readonly credentialPublicKey: FieldRef<"Authenticator", "String">;
    readonly counter: FieldRef<"Authenticator", "Int">;
    readonly credentialDeviceType: FieldRef<"Authenticator", "String">;
    readonly credentialBackedUp: FieldRef<"Authenticator", "Boolean">;
    readonly transports: FieldRef<"Authenticator", "String">;
  }

  // Custom InputTypes
  /**
   * Authenticator findUnique
   */
  export type AuthenticatorFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Authenticator
     */
    select?: AuthenticatorSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthenticatorInclude<ExtArgs> | null;
    /**
     * Filter, which Authenticator to fetch.
     */
    where: AuthenticatorWhereUniqueInput;
  };

  /**
   * Authenticator findUniqueOrThrow
   */
  export type AuthenticatorFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Authenticator
     */
    select?: AuthenticatorSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthenticatorInclude<ExtArgs> | null;
    /**
     * Filter, which Authenticator to fetch.
     */
    where: AuthenticatorWhereUniqueInput;
  };

  /**
   * Authenticator findFirst
   */
  export type AuthenticatorFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Authenticator
     */
    select?: AuthenticatorSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthenticatorInclude<ExtArgs> | null;
    /**
     * Filter, which Authenticator to fetch.
     */
    where?: AuthenticatorWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Authenticators to fetch.
     */
    orderBy?:
      | AuthenticatorOrderByWithRelationInput
      | AuthenticatorOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Authenticators.
     */
    cursor?: AuthenticatorWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Authenticators from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Authenticators.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Authenticators.
     */
    distinct?: AuthenticatorScalarFieldEnum | AuthenticatorScalarFieldEnum[];
  };

  /**
   * Authenticator findFirstOrThrow
   */
  export type AuthenticatorFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Authenticator
     */
    select?: AuthenticatorSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthenticatorInclude<ExtArgs> | null;
    /**
     * Filter, which Authenticator to fetch.
     */
    where?: AuthenticatorWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Authenticators to fetch.
     */
    orderBy?:
      | AuthenticatorOrderByWithRelationInput
      | AuthenticatorOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Authenticators.
     */
    cursor?: AuthenticatorWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Authenticators from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Authenticators.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Authenticators.
     */
    distinct?: AuthenticatorScalarFieldEnum | AuthenticatorScalarFieldEnum[];
  };

  /**
   * Authenticator findMany
   */
  export type AuthenticatorFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Authenticator
     */
    select?: AuthenticatorSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthenticatorInclude<ExtArgs> | null;
    /**
     * Filter, which Authenticators to fetch.
     */
    where?: AuthenticatorWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Authenticators to fetch.
     */
    orderBy?:
      | AuthenticatorOrderByWithRelationInput
      | AuthenticatorOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Authenticators.
     */
    cursor?: AuthenticatorWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Authenticators from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Authenticators.
     */
    skip?: number;
    distinct?: AuthenticatorScalarFieldEnum | AuthenticatorScalarFieldEnum[];
  };

  /**
   * Authenticator create
   */
  export type AuthenticatorCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Authenticator
     */
    select?: AuthenticatorSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthenticatorInclude<ExtArgs> | null;
    /**
     * The data needed to create a Authenticator.
     */
    data: XOR<AuthenticatorCreateInput, AuthenticatorUncheckedCreateInput>;
  };

  /**
   * Authenticator createMany
   */
  export type AuthenticatorCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Authenticators.
     */
    data: AuthenticatorCreateManyInput | AuthenticatorCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Authenticator createManyAndReturn
   */
  export type AuthenticatorCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Authenticator
     */
    select?: AuthenticatorSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many Authenticators.
     */
    data: AuthenticatorCreateManyInput | AuthenticatorCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthenticatorIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Authenticator update
   */
  export type AuthenticatorUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Authenticator
     */
    select?: AuthenticatorSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthenticatorInclude<ExtArgs> | null;
    /**
     * The data needed to update a Authenticator.
     */
    data: XOR<AuthenticatorUpdateInput, AuthenticatorUncheckedUpdateInput>;
    /**
     * Choose, which Authenticator to update.
     */
    where: AuthenticatorWhereUniqueInput;
  };

  /**
   * Authenticator updateMany
   */
  export type AuthenticatorUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Authenticators.
     */
    data: XOR<
      AuthenticatorUpdateManyMutationInput,
      AuthenticatorUncheckedUpdateManyInput
    >;
    /**
     * Filter which Authenticators to update
     */
    where?: AuthenticatorWhereInput;
  };

  /**
   * Authenticator upsert
   */
  export type AuthenticatorUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Authenticator
     */
    select?: AuthenticatorSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthenticatorInclude<ExtArgs> | null;
    /**
     * The filter to search for the Authenticator to update in case it exists.
     */
    where: AuthenticatorWhereUniqueInput;
    /**
     * In case the Authenticator found by the `where` argument doesn't exist, create a new Authenticator with this data.
     */
    create: XOR<AuthenticatorCreateInput, AuthenticatorUncheckedCreateInput>;
    /**
     * In case the Authenticator was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuthenticatorUpdateInput, AuthenticatorUncheckedUpdateInput>;
  };

  /**
   * Authenticator delete
   */
  export type AuthenticatorDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Authenticator
     */
    select?: AuthenticatorSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthenticatorInclude<ExtArgs> | null;
    /**
     * Filter which Authenticator to delete.
     */
    where: AuthenticatorWhereUniqueInput;
  };

  /**
   * Authenticator deleteMany
   */
  export type AuthenticatorDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Authenticators to delete
     */
    where?: AuthenticatorWhereInput;
  };

  /**
   * Authenticator without action
   */
  export type AuthenticatorDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Authenticator
     */
    select?: AuthenticatorSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthenticatorInclude<ExtArgs> | null;
  };

  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: "ReadUncommitted";
    ReadCommitted: "ReadCommitted";
    RepeatableRead: "RepeatableRead";
    Serializable: "Serializable";
  };

  export type TransactionIsolationLevel =
    (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];

  export const BusinessScalarFieldEnum: {
    id: "id";
    name: "name";
    description: "description";
    address: "address";
    phone: "phone";
    howToArrive: "howToArrive";
    coordinates: "coordinates";
    slug: "slug";
  };

  export type BusinessScalarFieldEnum =
    (typeof BusinessScalarFieldEnum)[keyof typeof BusinessScalarFieldEnum];

  export const CategoryScalarFieldEnum: {
    id: "id";
    name: "name";
    slug: "slug";
    businessId: "businessId";
  };

  export type CategoryScalarFieldEnum =
    (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum];

  export const ProductScalarFieldEnum: {
    id: "id";
    name: "name";
    slug: "slug";
    image: "image";
    description: "description";
    price: "price";
    offerPrice: "offerPrice";
    images: "images";
    active: "active";
    businessId: "businessId";
    categoryId: "categoryId";
  };

  export type ProductScalarFieldEnum =
    (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum];

  export const UserScalarFieldEnum: {
    id: "id";
    role: "role";
    name: "name";
    phone: "phone";
    email: "email";
    emailVerified: "emailVerified";
    image: "image";
    createdAt: "createdAt";
    updatedAt: "updatedAt";
  };

  export type UserScalarFieldEnum =
    (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];

  export const UserBusinessScalarFieldEnum: {
    userId: "userId";
    businessId: "businessId";
  };

  export type UserBusinessScalarFieldEnum =
    (typeof UserBusinessScalarFieldEnum)[keyof typeof UserBusinessScalarFieldEnum];

  export const OrderScalarFieldEnum: {
    id: "id";
    userId: "userId";
    productsDetails: "productsDetails";
    total: "total";
    status: "status";
    sentAt: "sentAt";
    position: "position";
    businessId: "businessId";
    identifier: "identifier";
  };

  export type OrderScalarFieldEnum =
    (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum];

  export const OrderProductScalarFieldEnum: {
    productId: "productId";
    orderId: "orderId";
    price: "price";
    position: "position";
    quantity: "quantity";
  };

  export type OrderProductScalarFieldEnum =
    (typeof OrderProductScalarFieldEnum)[keyof typeof OrderProductScalarFieldEnum];

  export const AccountScalarFieldEnum: {
    userId: "userId";
    type: "type";
    provider: "provider";
    providerAccountId: "providerAccountId";
    refresh_token: "refresh_token";
    access_token: "access_token";
    expires_at: "expires_at";
    token_type: "token_type";
    scope: "scope";
    id_token: "id_token";
    session_state: "session_state";
    createdAt: "createdAt";
    updatedAt: "updatedAt";
  };

  export type AccountScalarFieldEnum =
    (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum];

  export const SessionScalarFieldEnum: {
    sessionToken: "sessionToken";
    userId: "userId";
    expires: "expires";
    createdAt: "createdAt";
    updatedAt: "updatedAt";
  };

  export type SessionScalarFieldEnum =
    (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum];

  export const VerificationTokenScalarFieldEnum: {
    identifier: "identifier";
    token: "token";
    expires: "expires";
  };

  export type VerificationTokenScalarFieldEnum =
    (typeof VerificationTokenScalarFieldEnum)[keyof typeof VerificationTokenScalarFieldEnum];

  export const AuthenticatorScalarFieldEnum: {
    credentialID: "credentialID";
    userId: "userId";
    providerAccountId: "providerAccountId";
    credentialPublicKey: "credentialPublicKey";
    counter: "counter";
    credentialDeviceType: "credentialDeviceType";
    credentialBackedUp: "credentialBackedUp";
    transports: "transports";
  };

  export type AuthenticatorScalarFieldEnum =
    (typeof AuthenticatorScalarFieldEnum)[keyof typeof AuthenticatorScalarFieldEnum];

  export const SortOrder: {
    asc: "asc";
    desc: "desc";
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];

  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull;
  };

  export type JsonNullValueInput =
    (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput];

  export const QueryMode: {
    default: "default";
    insensitive: "insensitive";
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];

  export const NullsOrder: {
    first: "first";
    last: "last";
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];

  export const JsonNullValueFilter: {
    DbNull: typeof DbNull;
    JsonNull: typeof JsonNull;
    AnyNull: typeof AnyNull;
  };

  export type JsonNullValueFilter =
    (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];

  /**
   * Field references
   */

  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "String"
  >;

  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "String[]"
  >;

  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "Float[]"
  >;

  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "Float"
  >;

  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "Json"
  >;

  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "Int"
  >;

  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "Int[]"
  >;

  /**
   * Reference to a field of type 'Json[]'
   */
  export type ListJsonFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "Json[]"
  >;

  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "Boolean"
  >;

  /**
   * Reference to a field of type 'UserRoles'
   */
  export type EnumUserRolesFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "UserRoles"
  >;

  /**
   * Reference to a field of type 'UserRoles[]'
   */
  export type ListEnumUserRolesFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "UserRoles[]"
  >;

  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "DateTime"
  >;

  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "DateTime[]"
  >;

  /**
   * Reference to a field of type 'OrderStatus'
   */
  export type EnumOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "OrderStatus"
  >;

  /**
   * Reference to a field of type 'OrderStatus[]'
   */
  export type ListEnumOrderStatusFieldRefInput<$PrismaModel> =
    FieldRefInputType<$PrismaModel, "OrderStatus[]">;

  /**
   * Deep Input Types
   */

  export type BusinessWhereInput = {
    AND?: BusinessWhereInput | BusinessWhereInput[];
    OR?: BusinessWhereInput[];
    NOT?: BusinessWhereInput | BusinessWhereInput[];
    id?: StringFilter<"Business"> | string;
    name?: StringFilter<"Business"> | string;
    description?: StringNullableFilter<"Business"> | string | null;
    address?: StringNullableFilter<"Business"> | string | null;
    phone?: StringNullableFilter<"Business"> | string | null;
    howToArrive?: StringNullableFilter<"Business"> | string | null;
    coordinates?: FloatNullableListFilter<"Business">;
    slug?: StringNullableFilter<"Business"> | string | null;
    categories?: CategoryListRelationFilter;
    products?: ProductListRelationFilter;
    orders?: OrderListRelationFilter;
    users?: UserBusinessListRelationFilter;
  };

  export type BusinessOrderByWithRelationInput = {
    id?: SortOrder;
    name?: SortOrder;
    description?: SortOrderInput | SortOrder;
    address?: SortOrderInput | SortOrder;
    phone?: SortOrderInput | SortOrder;
    howToArrive?: SortOrderInput | SortOrder;
    coordinates?: SortOrder;
    slug?: SortOrderInput | SortOrder;
    categories?: CategoryOrderByRelationAggregateInput;
    products?: ProductOrderByRelationAggregateInput;
    orders?: OrderOrderByRelationAggregateInput;
    users?: UserBusinessOrderByRelationAggregateInput;
  };

  export type BusinessWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      slug?: string;
      AND?: BusinessWhereInput | BusinessWhereInput[];
      OR?: BusinessWhereInput[];
      NOT?: BusinessWhereInput | BusinessWhereInput[];
      name?: StringFilter<"Business"> | string;
      description?: StringNullableFilter<"Business"> | string | null;
      address?: StringNullableFilter<"Business"> | string | null;
      phone?: StringNullableFilter<"Business"> | string | null;
      howToArrive?: StringNullableFilter<"Business"> | string | null;
      coordinates?: FloatNullableListFilter<"Business">;
      categories?: CategoryListRelationFilter;
      products?: ProductListRelationFilter;
      orders?: OrderListRelationFilter;
      users?: UserBusinessListRelationFilter;
    },
    "id" | "slug"
  >;

  export type BusinessOrderByWithAggregationInput = {
    id?: SortOrder;
    name?: SortOrder;
    description?: SortOrderInput | SortOrder;
    address?: SortOrderInput | SortOrder;
    phone?: SortOrderInput | SortOrder;
    howToArrive?: SortOrderInput | SortOrder;
    coordinates?: SortOrder;
    slug?: SortOrderInput | SortOrder;
    _count?: BusinessCountOrderByAggregateInput;
    _avg?: BusinessAvgOrderByAggregateInput;
    _max?: BusinessMaxOrderByAggregateInput;
    _min?: BusinessMinOrderByAggregateInput;
    _sum?: BusinessSumOrderByAggregateInput;
  };

  export type BusinessScalarWhereWithAggregatesInput = {
    AND?:
      | BusinessScalarWhereWithAggregatesInput
      | BusinessScalarWhereWithAggregatesInput[];
    OR?: BusinessScalarWhereWithAggregatesInput[];
    NOT?:
      | BusinessScalarWhereWithAggregatesInput
      | BusinessScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"Business"> | string;
    name?: StringWithAggregatesFilter<"Business"> | string;
    description?:
      | StringNullableWithAggregatesFilter<"Business">
      | string
      | null;
    address?: StringNullableWithAggregatesFilter<"Business"> | string | null;
    phone?: StringNullableWithAggregatesFilter<"Business"> | string | null;
    howToArrive?:
      | StringNullableWithAggregatesFilter<"Business">
      | string
      | null;
    coordinates?: FloatNullableListFilter<"Business">;
    slug?: StringNullableWithAggregatesFilter<"Business"> | string | null;
  };

  export type CategoryWhereInput = {
    AND?: CategoryWhereInput | CategoryWhereInput[];
    OR?: CategoryWhereInput[];
    NOT?: CategoryWhereInput | CategoryWhereInput[];
    id?: StringFilter<"Category"> | string;
    name?: StringFilter<"Category"> | string;
    slug?: StringNullableFilter<"Category"> | string | null;
    businessId?: StringFilter<"Category"> | string;
    products?: ProductListRelationFilter;
    business?: XOR<BusinessRelationFilter, BusinessWhereInput>;
  };

  export type CategoryOrderByWithRelationInput = {
    id?: SortOrder;
    name?: SortOrder;
    slug?: SortOrderInput | SortOrder;
    businessId?: SortOrder;
    products?: ProductOrderByRelationAggregateInput;
    business?: BusinessOrderByWithRelationInput;
  };

  export type CategoryWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      slug?: string;
      AND?: CategoryWhereInput | CategoryWhereInput[];
      OR?: CategoryWhereInput[];
      NOT?: CategoryWhereInput | CategoryWhereInput[];
      name?: StringFilter<"Category"> | string;
      businessId?: StringFilter<"Category"> | string;
      products?: ProductListRelationFilter;
      business?: XOR<BusinessRelationFilter, BusinessWhereInput>;
    },
    "id" | "slug"
  >;

  export type CategoryOrderByWithAggregationInput = {
    id?: SortOrder;
    name?: SortOrder;
    slug?: SortOrderInput | SortOrder;
    businessId?: SortOrder;
    _count?: CategoryCountOrderByAggregateInput;
    _max?: CategoryMaxOrderByAggregateInput;
    _min?: CategoryMinOrderByAggregateInput;
  };

  export type CategoryScalarWhereWithAggregatesInput = {
    AND?:
      | CategoryScalarWhereWithAggregatesInput
      | CategoryScalarWhereWithAggregatesInput[];
    OR?: CategoryScalarWhereWithAggregatesInput[];
    NOT?:
      | CategoryScalarWhereWithAggregatesInput
      | CategoryScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"Category"> | string;
    name?: StringWithAggregatesFilter<"Category"> | string;
    slug?: StringNullableWithAggregatesFilter<"Category"> | string | null;
    businessId?: StringWithAggregatesFilter<"Category"> | string;
  };

  export type ProductWhereInput = {
    AND?: ProductWhereInput | ProductWhereInput[];
    OR?: ProductWhereInput[];
    NOT?: ProductWhereInput | ProductWhereInput[];
    id?: StringFilter<"Product"> | string;
    name?: StringFilter<"Product"> | string;
    slug?: StringNullableFilter<"Product"> | string | null;
    image?: JsonFilter<"Product">;
    description?: StringFilter<"Product"> | string;
    price?: IntFilter<"Product"> | number;
    offerPrice?: IntNullableFilter<"Product"> | number | null;
    images?: JsonNullableListFilter<"Product">;
    active?: BoolFilter<"Product"> | boolean;
    businessId?: StringFilter<"Product"> | string;
    categoryId?: StringFilter<"Product"> | string;
    business?: XOR<BusinessRelationFilter, BusinessWhereInput>;
    category?: XOR<CategoryRelationFilter, CategoryWhereInput>;
    orderItems?: OrderProductListRelationFilter;
  };

  export type ProductOrderByWithRelationInput = {
    id?: SortOrder;
    name?: SortOrder;
    slug?: SortOrderInput | SortOrder;
    image?: SortOrder;
    description?: SortOrder;
    price?: SortOrder;
    offerPrice?: SortOrderInput | SortOrder;
    images?: SortOrder;
    active?: SortOrder;
    businessId?: SortOrder;
    categoryId?: SortOrder;
    business?: BusinessOrderByWithRelationInput;
    category?: CategoryOrderByWithRelationInput;
    orderItems?: OrderProductOrderByRelationAggregateInput;
  };

  export type ProductWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      slug?: string;
      AND?: ProductWhereInput | ProductWhereInput[];
      OR?: ProductWhereInput[];
      NOT?: ProductWhereInput | ProductWhereInput[];
      name?: StringFilter<"Product"> | string;
      image?: JsonFilter<"Product">;
      description?: StringFilter<"Product"> | string;
      price?: IntFilter<"Product"> | number;
      offerPrice?: IntNullableFilter<"Product"> | number | null;
      images?: JsonNullableListFilter<"Product">;
      active?: BoolFilter<"Product"> | boolean;
      businessId?: StringFilter<"Product"> | string;
      categoryId?: StringFilter<"Product"> | string;
      business?: XOR<BusinessRelationFilter, BusinessWhereInput>;
      category?: XOR<CategoryRelationFilter, CategoryWhereInput>;
      orderItems?: OrderProductListRelationFilter;
    },
    "id" | "slug"
  >;

  export type ProductOrderByWithAggregationInput = {
    id?: SortOrder;
    name?: SortOrder;
    slug?: SortOrderInput | SortOrder;
    image?: SortOrder;
    description?: SortOrder;
    price?: SortOrder;
    offerPrice?: SortOrderInput | SortOrder;
    images?: SortOrder;
    active?: SortOrder;
    businessId?: SortOrder;
    categoryId?: SortOrder;
    _count?: ProductCountOrderByAggregateInput;
    _avg?: ProductAvgOrderByAggregateInput;
    _max?: ProductMaxOrderByAggregateInput;
    _min?: ProductMinOrderByAggregateInput;
    _sum?: ProductSumOrderByAggregateInput;
  };

  export type ProductScalarWhereWithAggregatesInput = {
    AND?:
      | ProductScalarWhereWithAggregatesInput
      | ProductScalarWhereWithAggregatesInput[];
    OR?: ProductScalarWhereWithAggregatesInput[];
    NOT?:
      | ProductScalarWhereWithAggregatesInput
      | ProductScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"Product"> | string;
    name?: StringWithAggregatesFilter<"Product"> | string;
    slug?: StringNullableWithAggregatesFilter<"Product"> | string | null;
    image?: JsonWithAggregatesFilter<"Product">;
    description?: StringWithAggregatesFilter<"Product"> | string;
    price?: IntWithAggregatesFilter<"Product"> | number;
    offerPrice?: IntNullableWithAggregatesFilter<"Product"> | number | null;
    images?: JsonNullableListFilter<"Product">;
    active?: BoolWithAggregatesFilter<"Product"> | boolean;
    businessId?: StringWithAggregatesFilter<"Product"> | string;
    categoryId?: StringWithAggregatesFilter<"Product"> | string;
  };

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[];
    OR?: UserWhereInput[];
    NOT?: UserWhereInput | UserWhereInput[];
    id?: StringFilter<"User"> | string;
    role?: EnumUserRolesFilter<"User"> | $Enums.UserRoles;
    name?: StringNullableFilter<"User"> | string | null;
    phone?: StringNullableFilter<"User"> | string | null;
    email?: StringFilter<"User"> | string;
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null;
    image?: StringNullableFilter<"User"> | string | null;
    createdAt?: DateTimeFilter<"User"> | Date | string;
    updatedAt?: DateTimeFilter<"User"> | Date | string;
    orders?: OrderListRelationFilter;
    accounts?: AccountListRelationFilter;
    sessions?: SessionListRelationFilter;
    Authenticator?: AuthenticatorListRelationFilter;
    business?: UserBusinessListRelationFilter;
  };

  export type UserOrderByWithRelationInput = {
    id?: SortOrder;
    role?: SortOrder;
    name?: SortOrderInput | SortOrder;
    phone?: SortOrderInput | SortOrder;
    email?: SortOrder;
    emailVerified?: SortOrderInput | SortOrder;
    image?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    orders?: OrderOrderByRelationAggregateInput;
    accounts?: AccountOrderByRelationAggregateInput;
    sessions?: SessionOrderByRelationAggregateInput;
    Authenticator?: AuthenticatorOrderByRelationAggregateInput;
    business?: UserBusinessOrderByRelationAggregateInput;
  };

  export type UserWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      email?: string;
      AND?: UserWhereInput | UserWhereInput[];
      OR?: UserWhereInput[];
      NOT?: UserWhereInput | UserWhereInput[];
      role?: EnumUserRolesFilter<"User"> | $Enums.UserRoles;
      name?: StringNullableFilter<"User"> | string | null;
      phone?: StringNullableFilter<"User"> | string | null;
      emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null;
      image?: StringNullableFilter<"User"> | string | null;
      createdAt?: DateTimeFilter<"User"> | Date | string;
      updatedAt?: DateTimeFilter<"User"> | Date | string;
      orders?: OrderListRelationFilter;
      accounts?: AccountListRelationFilter;
      sessions?: SessionListRelationFilter;
      Authenticator?: AuthenticatorListRelationFilter;
      business?: UserBusinessListRelationFilter;
    },
    "id" | "email"
  >;

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder;
    role?: SortOrder;
    name?: SortOrderInput | SortOrder;
    phone?: SortOrderInput | SortOrder;
    email?: SortOrder;
    emailVerified?: SortOrderInput | SortOrder;
    image?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: UserCountOrderByAggregateInput;
    _max?: UserMaxOrderByAggregateInput;
    _min?: UserMinOrderByAggregateInput;
  };

  export type UserScalarWhereWithAggregatesInput = {
    AND?:
      | UserScalarWhereWithAggregatesInput
      | UserScalarWhereWithAggregatesInput[];
    OR?: UserScalarWhereWithAggregatesInput[];
    NOT?:
      | UserScalarWhereWithAggregatesInput
      | UserScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"User"> | string;
    role?: EnumUserRolesWithAggregatesFilter<"User"> | $Enums.UserRoles;
    name?: StringNullableWithAggregatesFilter<"User"> | string | null;
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null;
    email?: StringWithAggregatesFilter<"User"> | string;
    emailVerified?:
      | DateTimeNullableWithAggregatesFilter<"User">
      | Date
      | string
      | null;
    image?: StringNullableWithAggregatesFilter<"User"> | string | null;
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string;
  };

  export type UserBusinessWhereInput = {
    AND?: UserBusinessWhereInput | UserBusinessWhereInput[];
    OR?: UserBusinessWhereInput[];
    NOT?: UserBusinessWhereInput | UserBusinessWhereInput[];
    userId?: StringFilter<"UserBusiness"> | string;
    businessId?: StringFilter<"UserBusiness"> | string;
    user?: XOR<UserRelationFilter, UserWhereInput>;
    business?: XOR<BusinessRelationFilter, BusinessWhereInput>;
  };

  export type UserBusinessOrderByWithRelationInput = {
    userId?: SortOrder;
    businessId?: SortOrder;
    user?: UserOrderByWithRelationInput;
    business?: BusinessOrderByWithRelationInput;
  };

  export type UserBusinessWhereUniqueInput = Prisma.AtLeast<
    {
      userId_businessId?: UserBusinessUserIdBusinessIdCompoundUniqueInput;
      AND?: UserBusinessWhereInput | UserBusinessWhereInput[];
      OR?: UserBusinessWhereInput[];
      NOT?: UserBusinessWhereInput | UserBusinessWhereInput[];
      userId?: StringFilter<"UserBusiness"> | string;
      businessId?: StringFilter<"UserBusiness"> | string;
      user?: XOR<UserRelationFilter, UserWhereInput>;
      business?: XOR<BusinessRelationFilter, BusinessWhereInput>;
    },
    "userId_businessId"
  >;

  export type UserBusinessOrderByWithAggregationInput = {
    userId?: SortOrder;
    businessId?: SortOrder;
    _count?: UserBusinessCountOrderByAggregateInput;
    _max?: UserBusinessMaxOrderByAggregateInput;
    _min?: UserBusinessMinOrderByAggregateInput;
  };

  export type UserBusinessScalarWhereWithAggregatesInput = {
    AND?:
      | UserBusinessScalarWhereWithAggregatesInput
      | UserBusinessScalarWhereWithAggregatesInput[];
    OR?: UserBusinessScalarWhereWithAggregatesInput[];
    NOT?:
      | UserBusinessScalarWhereWithAggregatesInput
      | UserBusinessScalarWhereWithAggregatesInput[];
    userId?: StringWithAggregatesFilter<"UserBusiness"> | string;
    businessId?: StringWithAggregatesFilter<"UserBusiness"> | string;
  };

  export type OrderWhereInput = {
    AND?: OrderWhereInput | OrderWhereInput[];
    OR?: OrderWhereInput[];
    NOT?: OrderWhereInput | OrderWhereInput[];
    id?: StringFilter<"Order"> | string;
    userId?: StringNullableFilter<"Order"> | string | null;
    productsDetails?: JsonFilter<"Order">;
    total?: IntFilter<"Order"> | number;
    status?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus;
    sentAt?: DateTimeNullableFilter<"Order"> | Date | string | null;
    position?: IntNullableFilter<"Order"> | number | null;
    businessId?: StringNullableFilter<"Order"> | string | null;
    identifier?: StringNullableFilter<"Order"> | string | null;
    user?: XOR<UserNullableRelationFilter, UserWhereInput> | null;
    items?: OrderProductListRelationFilter;
    business?: XOR<BusinessNullableRelationFilter, BusinessWhereInput> | null;
  };

  export type OrderOrderByWithRelationInput = {
    id?: SortOrder;
    userId?: SortOrderInput | SortOrder;
    productsDetails?: SortOrder;
    total?: SortOrder;
    status?: SortOrder;
    sentAt?: SortOrderInput | SortOrder;
    position?: SortOrderInput | SortOrder;
    businessId?: SortOrderInput | SortOrder;
    identifier?: SortOrderInput | SortOrder;
    user?: UserOrderByWithRelationInput;
    items?: OrderProductOrderByRelationAggregateInput;
    business?: BusinessOrderByWithRelationInput;
  };

  export type OrderWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: OrderWhereInput | OrderWhereInput[];
      OR?: OrderWhereInput[];
      NOT?: OrderWhereInput | OrderWhereInput[];
      userId?: StringNullableFilter<"Order"> | string | null;
      productsDetails?: JsonFilter<"Order">;
      total?: IntFilter<"Order"> | number;
      status?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus;
      sentAt?: DateTimeNullableFilter<"Order"> | Date | string | null;
      position?: IntNullableFilter<"Order"> | number | null;
      businessId?: StringNullableFilter<"Order"> | string | null;
      identifier?: StringNullableFilter<"Order"> | string | null;
      user?: XOR<UserNullableRelationFilter, UserWhereInput> | null;
      items?: OrderProductListRelationFilter;
      business?: XOR<BusinessNullableRelationFilter, BusinessWhereInput> | null;
    },
    "id"
  >;

  export type OrderOrderByWithAggregationInput = {
    id?: SortOrder;
    userId?: SortOrderInput | SortOrder;
    productsDetails?: SortOrder;
    total?: SortOrder;
    status?: SortOrder;
    sentAt?: SortOrderInput | SortOrder;
    position?: SortOrderInput | SortOrder;
    businessId?: SortOrderInput | SortOrder;
    identifier?: SortOrderInput | SortOrder;
    _count?: OrderCountOrderByAggregateInput;
    _avg?: OrderAvgOrderByAggregateInput;
    _max?: OrderMaxOrderByAggregateInput;
    _min?: OrderMinOrderByAggregateInput;
    _sum?: OrderSumOrderByAggregateInput;
  };

  export type OrderScalarWhereWithAggregatesInput = {
    AND?:
      | OrderScalarWhereWithAggregatesInput
      | OrderScalarWhereWithAggregatesInput[];
    OR?: OrderScalarWhereWithAggregatesInput[];
    NOT?:
      | OrderScalarWhereWithAggregatesInput
      | OrderScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"Order"> | string;
    userId?: StringNullableWithAggregatesFilter<"Order"> | string | null;
    productsDetails?: JsonWithAggregatesFilter<"Order">;
    total?: IntWithAggregatesFilter<"Order"> | number;
    status?: EnumOrderStatusWithAggregatesFilter<"Order"> | $Enums.OrderStatus;
    sentAt?:
      | DateTimeNullableWithAggregatesFilter<"Order">
      | Date
      | string
      | null;
    position?: IntNullableWithAggregatesFilter<"Order"> | number | null;
    businessId?: StringNullableWithAggregatesFilter<"Order"> | string | null;
    identifier?: StringNullableWithAggregatesFilter<"Order"> | string | null;
  };

  export type OrderProductWhereInput = {
    AND?: OrderProductWhereInput | OrderProductWhereInput[];
    OR?: OrderProductWhereInput[];
    NOT?: OrderProductWhereInput | OrderProductWhereInput[];
    productId?: StringFilter<"OrderProduct"> | string;
    orderId?: StringFilter<"OrderProduct"> | string;
    price?: IntFilter<"OrderProduct"> | number;
    position?: IntFilter<"OrderProduct"> | number;
    quantity?: IntFilter<"OrderProduct"> | number;
    product?: XOR<ProductRelationFilter, ProductWhereInput>;
    order?: XOR<OrderRelationFilter, OrderWhereInput>;
  };

  export type OrderProductOrderByWithRelationInput = {
    productId?: SortOrder;
    orderId?: SortOrder;
    price?: SortOrder;
    position?: SortOrder;
    quantity?: SortOrder;
    product?: ProductOrderByWithRelationInput;
    order?: OrderOrderByWithRelationInput;
  };

  export type OrderProductWhereUniqueInput = Prisma.AtLeast<
    {
      productId_orderId?: OrderProductProductIdOrderIdCompoundUniqueInput;
      AND?: OrderProductWhereInput | OrderProductWhereInput[];
      OR?: OrderProductWhereInput[];
      NOT?: OrderProductWhereInput | OrderProductWhereInput[];
      productId?: StringFilter<"OrderProduct"> | string;
      orderId?: StringFilter<"OrderProduct"> | string;
      price?: IntFilter<"OrderProduct"> | number;
      position?: IntFilter<"OrderProduct"> | number;
      quantity?: IntFilter<"OrderProduct"> | number;
      product?: XOR<ProductRelationFilter, ProductWhereInput>;
      order?: XOR<OrderRelationFilter, OrderWhereInput>;
    },
    "productId_orderId"
  >;

  export type OrderProductOrderByWithAggregationInput = {
    productId?: SortOrder;
    orderId?: SortOrder;
    price?: SortOrder;
    position?: SortOrder;
    quantity?: SortOrder;
    _count?: OrderProductCountOrderByAggregateInput;
    _avg?: OrderProductAvgOrderByAggregateInput;
    _max?: OrderProductMaxOrderByAggregateInput;
    _min?: OrderProductMinOrderByAggregateInput;
    _sum?: OrderProductSumOrderByAggregateInput;
  };

  export type OrderProductScalarWhereWithAggregatesInput = {
    AND?:
      | OrderProductScalarWhereWithAggregatesInput
      | OrderProductScalarWhereWithAggregatesInput[];
    OR?: OrderProductScalarWhereWithAggregatesInput[];
    NOT?:
      | OrderProductScalarWhereWithAggregatesInput
      | OrderProductScalarWhereWithAggregatesInput[];
    productId?: StringWithAggregatesFilter<"OrderProduct"> | string;
    orderId?: StringWithAggregatesFilter<"OrderProduct"> | string;
    price?: IntWithAggregatesFilter<"OrderProduct"> | number;
    position?: IntWithAggregatesFilter<"OrderProduct"> | number;
    quantity?: IntWithAggregatesFilter<"OrderProduct"> | number;
  };

  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[];
    OR?: AccountWhereInput[];
    NOT?: AccountWhereInput | AccountWhereInput[];
    userId?: StringFilter<"Account"> | string;
    type?: StringFilter<"Account"> | string;
    provider?: StringFilter<"Account"> | string;
    providerAccountId?: StringFilter<"Account"> | string;
    refresh_token?: StringNullableFilter<"Account"> | string | null;
    access_token?: StringNullableFilter<"Account"> | string | null;
    expires_at?: IntNullableFilter<"Account"> | number | null;
    token_type?: StringNullableFilter<"Account"> | string | null;
    scope?: StringNullableFilter<"Account"> | string | null;
    id_token?: StringNullableFilter<"Account"> | string | null;
    session_state?: StringNullableFilter<"Account"> | string | null;
    createdAt?: DateTimeFilter<"Account"> | Date | string;
    updatedAt?: DateTimeFilter<"Account"> | Date | string;
    user?: XOR<UserRelationFilter, UserWhereInput>;
  };

  export type AccountOrderByWithRelationInput = {
    userId?: SortOrder;
    type?: SortOrder;
    provider?: SortOrder;
    providerAccountId?: SortOrder;
    refresh_token?: SortOrderInput | SortOrder;
    access_token?: SortOrderInput | SortOrder;
    expires_at?: SortOrderInput | SortOrder;
    token_type?: SortOrderInput | SortOrder;
    scope?: SortOrderInput | SortOrder;
    id_token?: SortOrderInput | SortOrder;
    session_state?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    user?: UserOrderByWithRelationInput;
  };

  export type AccountWhereUniqueInput = Prisma.AtLeast<
    {
      provider_providerAccountId?: AccountProviderProviderAccountIdCompoundUniqueInput;
      AND?: AccountWhereInput | AccountWhereInput[];
      OR?: AccountWhereInput[];
      NOT?: AccountWhereInput | AccountWhereInput[];
      userId?: StringFilter<"Account"> | string;
      type?: StringFilter<"Account"> | string;
      provider?: StringFilter<"Account"> | string;
      providerAccountId?: StringFilter<"Account"> | string;
      refresh_token?: StringNullableFilter<"Account"> | string | null;
      access_token?: StringNullableFilter<"Account"> | string | null;
      expires_at?: IntNullableFilter<"Account"> | number | null;
      token_type?: StringNullableFilter<"Account"> | string | null;
      scope?: StringNullableFilter<"Account"> | string | null;
      id_token?: StringNullableFilter<"Account"> | string | null;
      session_state?: StringNullableFilter<"Account"> | string | null;
      createdAt?: DateTimeFilter<"Account"> | Date | string;
      updatedAt?: DateTimeFilter<"Account"> | Date | string;
      user?: XOR<UserRelationFilter, UserWhereInput>;
    },
    "provider_providerAccountId"
  >;

  export type AccountOrderByWithAggregationInput = {
    userId?: SortOrder;
    type?: SortOrder;
    provider?: SortOrder;
    providerAccountId?: SortOrder;
    refresh_token?: SortOrderInput | SortOrder;
    access_token?: SortOrderInput | SortOrder;
    expires_at?: SortOrderInput | SortOrder;
    token_type?: SortOrderInput | SortOrder;
    scope?: SortOrderInput | SortOrder;
    id_token?: SortOrderInput | SortOrder;
    session_state?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: AccountCountOrderByAggregateInput;
    _avg?: AccountAvgOrderByAggregateInput;
    _max?: AccountMaxOrderByAggregateInput;
    _min?: AccountMinOrderByAggregateInput;
    _sum?: AccountSumOrderByAggregateInput;
  };

  export type AccountScalarWhereWithAggregatesInput = {
    AND?:
      | AccountScalarWhereWithAggregatesInput
      | AccountScalarWhereWithAggregatesInput[];
    OR?: AccountScalarWhereWithAggregatesInput[];
    NOT?:
      | AccountScalarWhereWithAggregatesInput
      | AccountScalarWhereWithAggregatesInput[];
    userId?: StringWithAggregatesFilter<"Account"> | string;
    type?: StringWithAggregatesFilter<"Account"> | string;
    provider?: StringWithAggregatesFilter<"Account"> | string;
    providerAccountId?: StringWithAggregatesFilter<"Account"> | string;
    refresh_token?:
      | StringNullableWithAggregatesFilter<"Account">
      | string
      | null;
    access_token?:
      | StringNullableWithAggregatesFilter<"Account">
      | string
      | null;
    expires_at?: IntNullableWithAggregatesFilter<"Account"> | number | null;
    token_type?: StringNullableWithAggregatesFilter<"Account"> | string | null;
    scope?: StringNullableWithAggregatesFilter<"Account"> | string | null;
    id_token?: StringNullableWithAggregatesFilter<"Account"> | string | null;
    session_state?:
      | StringNullableWithAggregatesFilter<"Account">
      | string
      | null;
    createdAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string;
  };

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[];
    OR?: SessionWhereInput[];
    NOT?: SessionWhereInput | SessionWhereInput[];
    sessionToken?: StringFilter<"Session"> | string;
    userId?: StringFilter<"Session"> | string;
    expires?: DateTimeFilter<"Session"> | Date | string;
    createdAt?: DateTimeFilter<"Session"> | Date | string;
    updatedAt?: DateTimeFilter<"Session"> | Date | string;
    user?: XOR<UserRelationFilter, UserWhereInput>;
  };

  export type SessionOrderByWithRelationInput = {
    sessionToken?: SortOrder;
    userId?: SortOrder;
    expires?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    user?: UserOrderByWithRelationInput;
  };

  export type SessionWhereUniqueInput = Prisma.AtLeast<
    {
      sessionToken?: string;
      AND?: SessionWhereInput | SessionWhereInput[];
      OR?: SessionWhereInput[];
      NOT?: SessionWhereInput | SessionWhereInput[];
      userId?: StringFilter<"Session"> | string;
      expires?: DateTimeFilter<"Session"> | Date | string;
      createdAt?: DateTimeFilter<"Session"> | Date | string;
      updatedAt?: DateTimeFilter<"Session"> | Date | string;
      user?: XOR<UserRelationFilter, UserWhereInput>;
    },
    "sessionToken"
  >;

  export type SessionOrderByWithAggregationInput = {
    sessionToken?: SortOrder;
    userId?: SortOrder;
    expires?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: SessionCountOrderByAggregateInput;
    _max?: SessionMaxOrderByAggregateInput;
    _min?: SessionMinOrderByAggregateInput;
  };

  export type SessionScalarWhereWithAggregatesInput = {
    AND?:
      | SessionScalarWhereWithAggregatesInput
      | SessionScalarWhereWithAggregatesInput[];
    OR?: SessionScalarWhereWithAggregatesInput[];
    NOT?:
      | SessionScalarWhereWithAggregatesInput
      | SessionScalarWhereWithAggregatesInput[];
    sessionToken?: StringWithAggregatesFilter<"Session"> | string;
    userId?: StringWithAggregatesFilter<"Session"> | string;
    expires?: DateTimeWithAggregatesFilter<"Session"> | Date | string;
    createdAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string;
  };

  export type VerificationTokenWhereInput = {
    AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[];
    OR?: VerificationTokenWhereInput[];
    NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[];
    identifier?: StringFilter<"VerificationToken"> | string;
    token?: StringFilter<"VerificationToken"> | string;
    expires?: DateTimeFilter<"VerificationToken"> | Date | string;
  };

  export type VerificationTokenOrderByWithRelationInput = {
    identifier?: SortOrder;
    token?: SortOrder;
    expires?: SortOrder;
  };

  export type VerificationTokenWhereUniqueInput = Prisma.AtLeast<
    {
      identifier_token?: VerificationTokenIdentifierTokenCompoundUniqueInput;
      AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[];
      OR?: VerificationTokenWhereInput[];
      NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[];
      identifier?: StringFilter<"VerificationToken"> | string;
      token?: StringFilter<"VerificationToken"> | string;
      expires?: DateTimeFilter<"VerificationToken"> | Date | string;
    },
    "identifier_token"
  >;

  export type VerificationTokenOrderByWithAggregationInput = {
    identifier?: SortOrder;
    token?: SortOrder;
    expires?: SortOrder;
    _count?: VerificationTokenCountOrderByAggregateInput;
    _max?: VerificationTokenMaxOrderByAggregateInput;
    _min?: VerificationTokenMinOrderByAggregateInput;
  };

  export type VerificationTokenScalarWhereWithAggregatesInput = {
    AND?:
      | VerificationTokenScalarWhereWithAggregatesInput
      | VerificationTokenScalarWhereWithAggregatesInput[];
    OR?: VerificationTokenScalarWhereWithAggregatesInput[];
    NOT?:
      | VerificationTokenScalarWhereWithAggregatesInput
      | VerificationTokenScalarWhereWithAggregatesInput[];
    identifier?: StringWithAggregatesFilter<"VerificationToken"> | string;
    token?: StringWithAggregatesFilter<"VerificationToken"> | string;
    expires?: DateTimeWithAggregatesFilter<"VerificationToken"> | Date | string;
  };

  export type AuthenticatorWhereInput = {
    AND?: AuthenticatorWhereInput | AuthenticatorWhereInput[];
    OR?: AuthenticatorWhereInput[];
    NOT?: AuthenticatorWhereInput | AuthenticatorWhereInput[];
    credentialID?: StringFilter<"Authenticator"> | string;
    userId?: StringFilter<"Authenticator"> | string;
    providerAccountId?: StringFilter<"Authenticator"> | string;
    credentialPublicKey?: StringFilter<"Authenticator"> | string;
    counter?: IntFilter<"Authenticator"> | number;
    credentialDeviceType?: StringFilter<"Authenticator"> | string;
    credentialBackedUp?: BoolFilter<"Authenticator"> | boolean;
    transports?: StringNullableFilter<"Authenticator"> | string | null;
    user?: XOR<UserRelationFilter, UserWhereInput>;
  };

  export type AuthenticatorOrderByWithRelationInput = {
    credentialID?: SortOrder;
    userId?: SortOrder;
    providerAccountId?: SortOrder;
    credentialPublicKey?: SortOrder;
    counter?: SortOrder;
    credentialDeviceType?: SortOrder;
    credentialBackedUp?: SortOrder;
    transports?: SortOrderInput | SortOrder;
    user?: UserOrderByWithRelationInput;
  };

  export type AuthenticatorWhereUniqueInput = Prisma.AtLeast<
    {
      credentialID?: string;
      userId_credentialID?: AuthenticatorUserIdCredentialIDCompoundUniqueInput;
      AND?: AuthenticatorWhereInput | AuthenticatorWhereInput[];
      OR?: AuthenticatorWhereInput[];
      NOT?: AuthenticatorWhereInput | AuthenticatorWhereInput[];
      userId?: StringFilter<"Authenticator"> | string;
      providerAccountId?: StringFilter<"Authenticator"> | string;
      credentialPublicKey?: StringFilter<"Authenticator"> | string;
      counter?: IntFilter<"Authenticator"> | number;
      credentialDeviceType?: StringFilter<"Authenticator"> | string;
      credentialBackedUp?: BoolFilter<"Authenticator"> | boolean;
      transports?: StringNullableFilter<"Authenticator"> | string | null;
      user?: XOR<UserRelationFilter, UserWhereInput>;
    },
    "userId_credentialID" | "credentialID"
  >;

  export type AuthenticatorOrderByWithAggregationInput = {
    credentialID?: SortOrder;
    userId?: SortOrder;
    providerAccountId?: SortOrder;
    credentialPublicKey?: SortOrder;
    counter?: SortOrder;
    credentialDeviceType?: SortOrder;
    credentialBackedUp?: SortOrder;
    transports?: SortOrderInput | SortOrder;
    _count?: AuthenticatorCountOrderByAggregateInput;
    _avg?: AuthenticatorAvgOrderByAggregateInput;
    _max?: AuthenticatorMaxOrderByAggregateInput;
    _min?: AuthenticatorMinOrderByAggregateInput;
    _sum?: AuthenticatorSumOrderByAggregateInput;
  };

  export type AuthenticatorScalarWhereWithAggregatesInput = {
    AND?:
      | AuthenticatorScalarWhereWithAggregatesInput
      | AuthenticatorScalarWhereWithAggregatesInput[];
    OR?: AuthenticatorScalarWhereWithAggregatesInput[];
    NOT?:
      | AuthenticatorScalarWhereWithAggregatesInput
      | AuthenticatorScalarWhereWithAggregatesInput[];
    credentialID?: StringWithAggregatesFilter<"Authenticator"> | string;
    userId?: StringWithAggregatesFilter<"Authenticator"> | string;
    providerAccountId?: StringWithAggregatesFilter<"Authenticator"> | string;
    credentialPublicKey?: StringWithAggregatesFilter<"Authenticator"> | string;
    counter?: IntWithAggregatesFilter<"Authenticator"> | number;
    credentialDeviceType?: StringWithAggregatesFilter<"Authenticator"> | string;
    credentialBackedUp?: BoolWithAggregatesFilter<"Authenticator"> | boolean;
    transports?:
      | StringNullableWithAggregatesFilter<"Authenticator">
      | string
      | null;
  };

  export type BusinessCreateInput = {
    id?: string;
    name: string;
    description?: string | null;
    address?: string | null;
    phone?: string | null;
    howToArrive?: string | null;
    coordinates?: BusinessCreatecoordinatesInput | number[];
    slug?: string | null;
    categories?: CategoryCreateNestedManyWithoutBusinessInput;
    products?: ProductCreateNestedManyWithoutBusinessInput;
    orders?: OrderCreateNestedManyWithoutBusinessInput;
    users?: UserBusinessCreateNestedManyWithoutBusinessInput;
  };

  export type BusinessUncheckedCreateInput = {
    id?: string;
    name: string;
    description?: string | null;
    address?: string | null;
    phone?: string | null;
    howToArrive?: string | null;
    coordinates?: BusinessCreatecoordinatesInput | number[];
    slug?: string | null;
    categories?: CategoryUncheckedCreateNestedManyWithoutBusinessInput;
    products?: ProductUncheckedCreateNestedManyWithoutBusinessInput;
    orders?: OrderUncheckedCreateNestedManyWithoutBusinessInput;
    users?: UserBusinessUncheckedCreateNestedManyWithoutBusinessInput;
  };

  export type BusinessUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    address?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    howToArrive?: NullableStringFieldUpdateOperationsInput | string | null;
    coordinates?: BusinessUpdatecoordinatesInput | number[];
    slug?: NullableStringFieldUpdateOperationsInput | string | null;
    categories?: CategoryUpdateManyWithoutBusinessNestedInput;
    products?: ProductUpdateManyWithoutBusinessNestedInput;
    orders?: OrderUpdateManyWithoutBusinessNestedInput;
    users?: UserBusinessUpdateManyWithoutBusinessNestedInput;
  };

  export type BusinessUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    address?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    howToArrive?: NullableStringFieldUpdateOperationsInput | string | null;
    coordinates?: BusinessUpdatecoordinatesInput | number[];
    slug?: NullableStringFieldUpdateOperationsInput | string | null;
    categories?: CategoryUncheckedUpdateManyWithoutBusinessNestedInput;
    products?: ProductUncheckedUpdateManyWithoutBusinessNestedInput;
    orders?: OrderUncheckedUpdateManyWithoutBusinessNestedInput;
    users?: UserBusinessUncheckedUpdateManyWithoutBusinessNestedInput;
  };

  export type BusinessCreateManyInput = {
    id?: string;
    name: string;
    description?: string | null;
    address?: string | null;
    phone?: string | null;
    howToArrive?: string | null;
    coordinates?: BusinessCreatecoordinatesInput | number[];
    slug?: string | null;
  };

  export type BusinessUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    address?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    howToArrive?: NullableStringFieldUpdateOperationsInput | string | null;
    coordinates?: BusinessUpdatecoordinatesInput | number[];
    slug?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type BusinessUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    address?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    howToArrive?: NullableStringFieldUpdateOperationsInput | string | null;
    coordinates?: BusinessUpdatecoordinatesInput | number[];
    slug?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type CategoryCreateInput = {
    id?: string;
    name: string;
    slug?: string | null;
    products?: ProductCreateNestedManyWithoutCategoryInput;
    business: BusinessCreateNestedOneWithoutCategoriesInput;
  };

  export type CategoryUncheckedCreateInput = {
    id?: string;
    name: string;
    slug?: string | null;
    businessId: string;
    products?: ProductUncheckedCreateNestedManyWithoutCategoryInput;
  };

  export type CategoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    slug?: NullableStringFieldUpdateOperationsInput | string | null;
    products?: ProductUpdateManyWithoutCategoryNestedInput;
    business?: BusinessUpdateOneRequiredWithoutCategoriesNestedInput;
  };

  export type CategoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    slug?: NullableStringFieldUpdateOperationsInput | string | null;
    businessId?: StringFieldUpdateOperationsInput | string;
    products?: ProductUncheckedUpdateManyWithoutCategoryNestedInput;
  };

  export type CategoryCreateManyInput = {
    id?: string;
    name: string;
    slug?: string | null;
    businessId: string;
  };

  export type CategoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    slug?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type CategoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    slug?: NullableStringFieldUpdateOperationsInput | string | null;
    businessId?: StringFieldUpdateOperationsInput | string;
  };

  export type ProductCreateInput = {
    id?: string;
    name: string;
    slug?: string | null;
    image: JsonNullValueInput | InputJsonValue;
    description: string;
    price: number;
    offerPrice?: number | null;
    images?: ProductCreateimagesInput | InputJsonValue[];
    active?: boolean;
    business: BusinessCreateNestedOneWithoutProductsInput;
    category: CategoryCreateNestedOneWithoutProductsInput;
    orderItems?: OrderProductCreateNestedManyWithoutProductInput;
  };

  export type ProductUncheckedCreateInput = {
    id?: string;
    name: string;
    slug?: string | null;
    image: JsonNullValueInput | InputJsonValue;
    description: string;
    price: number;
    offerPrice?: number | null;
    images?: ProductCreateimagesInput | InputJsonValue[];
    active?: boolean;
    businessId: string;
    categoryId: string;
    orderItems?: OrderProductUncheckedCreateNestedManyWithoutProductInput;
  };

  export type ProductUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    slug?: NullableStringFieldUpdateOperationsInput | string | null;
    image?: JsonNullValueInput | InputJsonValue;
    description?: StringFieldUpdateOperationsInput | string;
    price?: IntFieldUpdateOperationsInput | number;
    offerPrice?: NullableIntFieldUpdateOperationsInput | number | null;
    images?: ProductUpdateimagesInput | InputJsonValue[];
    active?: BoolFieldUpdateOperationsInput | boolean;
    business?: BusinessUpdateOneRequiredWithoutProductsNestedInput;
    category?: CategoryUpdateOneRequiredWithoutProductsNestedInput;
    orderItems?: OrderProductUpdateManyWithoutProductNestedInput;
  };

  export type ProductUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    slug?: NullableStringFieldUpdateOperationsInput | string | null;
    image?: JsonNullValueInput | InputJsonValue;
    description?: StringFieldUpdateOperationsInput | string;
    price?: IntFieldUpdateOperationsInput | number;
    offerPrice?: NullableIntFieldUpdateOperationsInput | number | null;
    images?: ProductUpdateimagesInput | InputJsonValue[];
    active?: BoolFieldUpdateOperationsInput | boolean;
    businessId?: StringFieldUpdateOperationsInput | string;
    categoryId?: StringFieldUpdateOperationsInput | string;
    orderItems?: OrderProductUncheckedUpdateManyWithoutProductNestedInput;
  };

  export type ProductCreateManyInput = {
    id?: string;
    name: string;
    slug?: string | null;
    image: JsonNullValueInput | InputJsonValue;
    description: string;
    price: number;
    offerPrice?: number | null;
    images?: ProductCreateimagesInput | InputJsonValue[];
    active?: boolean;
    businessId: string;
    categoryId: string;
  };

  export type ProductUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    slug?: NullableStringFieldUpdateOperationsInput | string | null;
    image?: JsonNullValueInput | InputJsonValue;
    description?: StringFieldUpdateOperationsInput | string;
    price?: IntFieldUpdateOperationsInput | number;
    offerPrice?: NullableIntFieldUpdateOperationsInput | number | null;
    images?: ProductUpdateimagesInput | InputJsonValue[];
    active?: BoolFieldUpdateOperationsInput | boolean;
  };

  export type ProductUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    slug?: NullableStringFieldUpdateOperationsInput | string | null;
    image?: JsonNullValueInput | InputJsonValue;
    description?: StringFieldUpdateOperationsInput | string;
    price?: IntFieldUpdateOperationsInput | number;
    offerPrice?: NullableIntFieldUpdateOperationsInput | number | null;
    images?: ProductUpdateimagesInput | InputJsonValue[];
    active?: BoolFieldUpdateOperationsInput | boolean;
    businessId?: StringFieldUpdateOperationsInput | string;
    categoryId?: StringFieldUpdateOperationsInput | string;
  };

  export type UserCreateInput = {
    id?: string;
    role?: $Enums.UserRoles;
    name?: string | null;
    phone?: string | null;
    email: string;
    emailVerified?: Date | string | null;
    image?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    orders?: OrderCreateNestedManyWithoutUserInput;
    accounts?: AccountCreateNestedManyWithoutUserInput;
    sessions?: SessionCreateNestedManyWithoutUserInput;
    Authenticator?: AuthenticatorCreateNestedManyWithoutUserInput;
    business?: UserBusinessCreateNestedManyWithoutUserInput;
  };

  export type UserUncheckedCreateInput = {
    id?: string;
    role?: $Enums.UserRoles;
    name?: string | null;
    phone?: string | null;
    email: string;
    emailVerified?: Date | string | null;
    image?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    orders?: OrderUncheckedCreateNestedManyWithoutUserInput;
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput;
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput;
    Authenticator?: AuthenticatorUncheckedCreateNestedManyWithoutUserInput;
    business?: UserBusinessUncheckedCreateNestedManyWithoutUserInput;
  };

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    role?: EnumUserRolesFieldUpdateOperationsInput | $Enums.UserRoles;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: StringFieldUpdateOperationsInput | string;
    emailVerified?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    orders?: OrderUpdateManyWithoutUserNestedInput;
    accounts?: AccountUpdateManyWithoutUserNestedInput;
    sessions?: SessionUpdateManyWithoutUserNestedInput;
    Authenticator?: AuthenticatorUpdateManyWithoutUserNestedInput;
    business?: UserBusinessUpdateManyWithoutUserNestedInput;
  };

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    role?: EnumUserRolesFieldUpdateOperationsInput | $Enums.UserRoles;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: StringFieldUpdateOperationsInput | string;
    emailVerified?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    orders?: OrderUncheckedUpdateManyWithoutUserNestedInput;
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput;
    Authenticator?: AuthenticatorUncheckedUpdateManyWithoutUserNestedInput;
    business?: UserBusinessUncheckedUpdateManyWithoutUserNestedInput;
  };

  export type UserCreateManyInput = {
    id?: string;
    role?: $Enums.UserRoles;
    name?: string | null;
    phone?: string | null;
    email: string;
    emailVerified?: Date | string | null;
    image?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    role?: EnumUserRolesFieldUpdateOperationsInput | $Enums.UserRoles;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: StringFieldUpdateOperationsInput | string;
    emailVerified?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    role?: EnumUserRolesFieldUpdateOperationsInput | $Enums.UserRoles;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: StringFieldUpdateOperationsInput | string;
    emailVerified?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type UserBusinessCreateInput = {
    user: UserCreateNestedOneWithoutBusinessInput;
    business: BusinessCreateNestedOneWithoutUsersInput;
  };

  export type UserBusinessUncheckedCreateInput = {
    userId: string;
    businessId: string;
  };

  export type UserBusinessUpdateInput = {
    user?: UserUpdateOneRequiredWithoutBusinessNestedInput;
    business?: BusinessUpdateOneRequiredWithoutUsersNestedInput;
  };

  export type UserBusinessUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string;
    businessId?: StringFieldUpdateOperationsInput | string;
  };

  export type UserBusinessCreateManyInput = {
    userId: string;
    businessId: string;
  };

  export type UserBusinessUpdateManyMutationInput = {};

  export type UserBusinessUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string;
    businessId?: StringFieldUpdateOperationsInput | string;
  };

  export type OrderCreateInput = {
    id?: string;
    productsDetails: JsonNullValueInput | InputJsonValue;
    total?: number;
    status?: $Enums.OrderStatus;
    sentAt?: Date | string | null;
    position?: number | null;
    identifier?: string | null;
    user?: UserCreateNestedOneWithoutOrdersInput;
    items?: OrderProductCreateNestedManyWithoutOrderInput;
    business?: BusinessCreateNestedOneWithoutOrdersInput;
  };

  export type OrderUncheckedCreateInput = {
    id?: string;
    userId?: string | null;
    productsDetails: JsonNullValueInput | InputJsonValue;
    total?: number;
    status?: $Enums.OrderStatus;
    sentAt?: Date | string | null;
    position?: number | null;
    businessId?: string | null;
    identifier?: string | null;
    items?: OrderProductUncheckedCreateNestedManyWithoutOrderInput;
  };

  export type OrderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    productsDetails?: JsonNullValueInput | InputJsonValue;
    total?: IntFieldUpdateOperationsInput | number;
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    position?: NullableIntFieldUpdateOperationsInput | number | null;
    identifier?: NullableStringFieldUpdateOperationsInput | string | null;
    user?: UserUpdateOneWithoutOrdersNestedInput;
    items?: OrderProductUpdateManyWithoutOrderNestedInput;
    business?: BusinessUpdateOneWithoutOrdersNestedInput;
  };

  export type OrderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: NullableStringFieldUpdateOperationsInput | string | null;
    productsDetails?: JsonNullValueInput | InputJsonValue;
    total?: IntFieldUpdateOperationsInput | number;
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    position?: NullableIntFieldUpdateOperationsInput | number | null;
    businessId?: NullableStringFieldUpdateOperationsInput | string | null;
    identifier?: NullableStringFieldUpdateOperationsInput | string | null;
    items?: OrderProductUncheckedUpdateManyWithoutOrderNestedInput;
  };

  export type OrderCreateManyInput = {
    id?: string;
    userId?: string | null;
    productsDetails: JsonNullValueInput | InputJsonValue;
    total?: number;
    status?: $Enums.OrderStatus;
    sentAt?: Date | string | null;
    position?: number | null;
    businessId?: string | null;
    identifier?: string | null;
  };

  export type OrderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    productsDetails?: JsonNullValueInput | InputJsonValue;
    total?: IntFieldUpdateOperationsInput | number;
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    position?: NullableIntFieldUpdateOperationsInput | number | null;
    identifier?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type OrderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: NullableStringFieldUpdateOperationsInput | string | null;
    productsDetails?: JsonNullValueInput | InputJsonValue;
    total?: IntFieldUpdateOperationsInput | number;
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    position?: NullableIntFieldUpdateOperationsInput | number | null;
    businessId?: NullableStringFieldUpdateOperationsInput | string | null;
    identifier?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type OrderProductCreateInput = {
    price: number;
    position?: number;
    quantity: number;
    product: ProductCreateNestedOneWithoutOrderItemsInput;
    order: OrderCreateNestedOneWithoutItemsInput;
  };

  export type OrderProductUncheckedCreateInput = {
    productId: string;
    orderId: string;
    price: number;
    position?: number;
    quantity: number;
  };

  export type OrderProductUpdateInput = {
    price?: IntFieldUpdateOperationsInput | number;
    position?: IntFieldUpdateOperationsInput | number;
    quantity?: IntFieldUpdateOperationsInput | number;
    product?: ProductUpdateOneRequiredWithoutOrderItemsNestedInput;
    order?: OrderUpdateOneRequiredWithoutItemsNestedInput;
  };

  export type OrderProductUncheckedUpdateInput = {
    productId?: StringFieldUpdateOperationsInput | string;
    orderId?: StringFieldUpdateOperationsInput | string;
    price?: IntFieldUpdateOperationsInput | number;
    position?: IntFieldUpdateOperationsInput | number;
    quantity?: IntFieldUpdateOperationsInput | number;
  };

  export type OrderProductCreateManyInput = {
    productId: string;
    orderId: string;
    price: number;
    position?: number;
    quantity: number;
  };

  export type OrderProductUpdateManyMutationInput = {
    price?: IntFieldUpdateOperationsInput | number;
    position?: IntFieldUpdateOperationsInput | number;
    quantity?: IntFieldUpdateOperationsInput | number;
  };

  export type OrderProductUncheckedUpdateManyInput = {
    productId?: StringFieldUpdateOperationsInput | string;
    orderId?: StringFieldUpdateOperationsInput | string;
    price?: IntFieldUpdateOperationsInput | number;
    position?: IntFieldUpdateOperationsInput | number;
    quantity?: IntFieldUpdateOperationsInput | number;
  };

  export type AccountCreateInput = {
    type: string;
    provider: string;
    providerAccountId: string;
    refresh_token?: string | null;
    access_token?: string | null;
    expires_at?: number | null;
    token_type?: string | null;
    scope?: string | null;
    id_token?: string | null;
    session_state?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: UserCreateNestedOneWithoutAccountsInput;
  };

  export type AccountUncheckedCreateInput = {
    userId: string;
    type: string;
    provider: string;
    providerAccountId: string;
    refresh_token?: string | null;
    access_token?: string | null;
    expires_at?: number | null;
    token_type?: string | null;
    scope?: string | null;
    id_token?: string | null;
    session_state?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type AccountUpdateInput = {
    type?: StringFieldUpdateOperationsInput | string;
    provider?: StringFieldUpdateOperationsInput | string;
    providerAccountId?: StringFieldUpdateOperationsInput | string;
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null;
    access_token?: NullableStringFieldUpdateOperationsInput | string | null;
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null;
    token_type?: NullableStringFieldUpdateOperationsInput | string | null;
    scope?: NullableStringFieldUpdateOperationsInput | string | null;
    id_token?: NullableStringFieldUpdateOperationsInput | string | null;
    session_state?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput;
  };

  export type AccountUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string;
    type?: StringFieldUpdateOperationsInput | string;
    provider?: StringFieldUpdateOperationsInput | string;
    providerAccountId?: StringFieldUpdateOperationsInput | string;
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null;
    access_token?: NullableStringFieldUpdateOperationsInput | string | null;
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null;
    token_type?: NullableStringFieldUpdateOperationsInput | string | null;
    scope?: NullableStringFieldUpdateOperationsInput | string | null;
    id_token?: NullableStringFieldUpdateOperationsInput | string | null;
    session_state?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AccountCreateManyInput = {
    userId: string;
    type: string;
    provider: string;
    providerAccountId: string;
    refresh_token?: string | null;
    access_token?: string | null;
    expires_at?: number | null;
    token_type?: string | null;
    scope?: string | null;
    id_token?: string | null;
    session_state?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type AccountUpdateManyMutationInput = {
    type?: StringFieldUpdateOperationsInput | string;
    provider?: StringFieldUpdateOperationsInput | string;
    providerAccountId?: StringFieldUpdateOperationsInput | string;
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null;
    access_token?: NullableStringFieldUpdateOperationsInput | string | null;
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null;
    token_type?: NullableStringFieldUpdateOperationsInput | string | null;
    scope?: NullableStringFieldUpdateOperationsInput | string | null;
    id_token?: NullableStringFieldUpdateOperationsInput | string | null;
    session_state?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AccountUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string;
    type?: StringFieldUpdateOperationsInput | string;
    provider?: StringFieldUpdateOperationsInput | string;
    providerAccountId?: StringFieldUpdateOperationsInput | string;
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null;
    access_token?: NullableStringFieldUpdateOperationsInput | string | null;
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null;
    token_type?: NullableStringFieldUpdateOperationsInput | string | null;
    scope?: NullableStringFieldUpdateOperationsInput | string | null;
    id_token?: NullableStringFieldUpdateOperationsInput | string | null;
    session_state?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SessionCreateInput = {
    sessionToken: string;
    expires: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: UserCreateNestedOneWithoutSessionsInput;
  };

  export type SessionUncheckedCreateInput = {
    sessionToken: string;
    userId: string;
    expires: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type SessionUpdateInput = {
    sessionToken?: StringFieldUpdateOperationsInput | string;
    expires?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput;
  };

  export type SessionUncheckedUpdateInput = {
    sessionToken?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    expires?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SessionCreateManyInput = {
    sessionToken: string;
    userId: string;
    expires: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type SessionUpdateManyMutationInput = {
    sessionToken?: StringFieldUpdateOperationsInput | string;
    expires?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SessionUncheckedUpdateManyInput = {
    sessionToken?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    expires?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type VerificationTokenCreateInput = {
    identifier: string;
    token: string;
    expires: Date | string;
  };

  export type VerificationTokenUncheckedCreateInput = {
    identifier: string;
    token: string;
    expires: Date | string;
  };

  export type VerificationTokenUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string;
    token?: StringFieldUpdateOperationsInput | string;
    expires?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type VerificationTokenUncheckedUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string;
    token?: StringFieldUpdateOperationsInput | string;
    expires?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type VerificationTokenCreateManyInput = {
    identifier: string;
    token: string;
    expires: Date | string;
  };

  export type VerificationTokenUpdateManyMutationInput = {
    identifier?: StringFieldUpdateOperationsInput | string;
    token?: StringFieldUpdateOperationsInput | string;
    expires?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type VerificationTokenUncheckedUpdateManyInput = {
    identifier?: StringFieldUpdateOperationsInput | string;
    token?: StringFieldUpdateOperationsInput | string;
    expires?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AuthenticatorCreateInput = {
    credentialID: string;
    providerAccountId: string;
    credentialPublicKey: string;
    counter: number;
    credentialDeviceType: string;
    credentialBackedUp: boolean;
    transports?: string | null;
    user: UserCreateNestedOneWithoutAuthenticatorInput;
  };

  export type AuthenticatorUncheckedCreateInput = {
    credentialID: string;
    userId: string;
    providerAccountId: string;
    credentialPublicKey: string;
    counter: number;
    credentialDeviceType: string;
    credentialBackedUp: boolean;
    transports?: string | null;
  };

  export type AuthenticatorUpdateInput = {
    credentialID?: StringFieldUpdateOperationsInput | string;
    providerAccountId?: StringFieldUpdateOperationsInput | string;
    credentialPublicKey?: StringFieldUpdateOperationsInput | string;
    counter?: IntFieldUpdateOperationsInput | number;
    credentialDeviceType?: StringFieldUpdateOperationsInput | string;
    credentialBackedUp?: BoolFieldUpdateOperationsInput | boolean;
    transports?: NullableStringFieldUpdateOperationsInput | string | null;
    user?: UserUpdateOneRequiredWithoutAuthenticatorNestedInput;
  };

  export type AuthenticatorUncheckedUpdateInput = {
    credentialID?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    providerAccountId?: StringFieldUpdateOperationsInput | string;
    credentialPublicKey?: StringFieldUpdateOperationsInput | string;
    counter?: IntFieldUpdateOperationsInput | number;
    credentialDeviceType?: StringFieldUpdateOperationsInput | string;
    credentialBackedUp?: BoolFieldUpdateOperationsInput | boolean;
    transports?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type AuthenticatorCreateManyInput = {
    credentialID: string;
    userId: string;
    providerAccountId: string;
    credentialPublicKey: string;
    counter: number;
    credentialDeviceType: string;
    credentialBackedUp: boolean;
    transports?: string | null;
  };

  export type AuthenticatorUpdateManyMutationInput = {
    credentialID?: StringFieldUpdateOperationsInput | string;
    providerAccountId?: StringFieldUpdateOperationsInput | string;
    credentialPublicKey?: StringFieldUpdateOperationsInput | string;
    counter?: IntFieldUpdateOperationsInput | number;
    credentialDeviceType?: StringFieldUpdateOperationsInput | string;
    credentialBackedUp?: BoolFieldUpdateOperationsInput | boolean;
    transports?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type AuthenticatorUncheckedUpdateManyInput = {
    credentialID?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    providerAccountId?: StringFieldUpdateOperationsInput | string;
    credentialPublicKey?: StringFieldUpdateOperationsInput | string;
    counter?: IntFieldUpdateOperationsInput | number;
    credentialDeviceType?: StringFieldUpdateOperationsInput | string;
    credentialBackedUp?: BoolFieldUpdateOperationsInput | boolean;
    transports?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringFilter<$PrismaModel> | string;
  };

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringNullableFilter<$PrismaModel> | string | null;
  };

  export type FloatNullableListFilter<$PrismaModel = never> = {
    equals?: number[] | ListFloatFieldRefInput<$PrismaModel> | null;
    has?: number | FloatFieldRefInput<$PrismaModel> | null;
    hasEvery?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    hasSome?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    isEmpty?: boolean;
  };

  export type CategoryListRelationFilter = {
    every?: CategoryWhereInput;
    some?: CategoryWhereInput;
    none?: CategoryWhereInput;
  };

  export type ProductListRelationFilter = {
    every?: ProductWhereInput;
    some?: ProductWhereInput;
    none?: ProductWhereInput;
  };

  export type OrderListRelationFilter = {
    every?: OrderWhereInput;
    some?: OrderWhereInput;
    none?: OrderWhereInput;
  };

  export type UserBusinessListRelationFilter = {
    every?: UserBusinessWhereInput;
    some?: UserBusinessWhereInput;
    none?: UserBusinessWhereInput;
  };

  export type SortOrderInput = {
    sort: SortOrder;
    nulls?: NullsOrder;
  };

  export type CategoryOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type ProductOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type OrderOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type UserBusinessOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type BusinessCountOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    description?: SortOrder;
    address?: SortOrder;
    phone?: SortOrder;
    howToArrive?: SortOrder;
    coordinates?: SortOrder;
    slug?: SortOrder;
  };

  export type BusinessAvgOrderByAggregateInput = {
    coordinates?: SortOrder;
  };

  export type BusinessMaxOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    description?: SortOrder;
    address?: SortOrder;
    phone?: SortOrder;
    howToArrive?: SortOrder;
    slug?: SortOrder;
  };

  export type BusinessMinOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    description?: SortOrder;
    address?: SortOrder;
    phone?: SortOrder;
    howToArrive?: SortOrder;
    slug?: SortOrder;
  };

  export type BusinessSumOrderByAggregateInput = {
    coordinates?: SortOrder;
  };

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?:
      | NestedStringNullableWithAggregatesFilter<$PrismaModel>
      | string
      | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedStringNullableFilter<$PrismaModel>;
    _max?: NestedStringNullableFilter<$PrismaModel>;
  };

  export type BusinessRelationFilter = {
    is?: BusinessWhereInput;
    isNot?: BusinessWhereInput;
  };

  export type CategoryCountOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    slug?: SortOrder;
    businessId?: SortOrder;
  };

  export type CategoryMaxOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    slug?: SortOrder;
    businessId?: SortOrder;
  };

  export type CategoryMinOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    slug?: SortOrder;
    businessId?: SortOrder;
  };
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<JsonFilterBase<$PrismaModel>>,
          Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, "path">
        >,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, "path">>;

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?:
      | InputJsonValue
      | JsonFieldRefInput<$PrismaModel>
      | JsonNullValueFilter;
    path?: string[];
    string_contains?: string | StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    not?:
      | InputJsonValue
      | JsonFieldRefInput<$PrismaModel>
      | JsonNullValueFilter;
  };

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntFilter<$PrismaModel> | number;
  };

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableFilter<$PrismaModel> | number | null;
  };
  export type JsonNullableListFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<JsonNullableListFilterBase<$PrismaModel>>,
          Exclude<
            keyof Required<JsonNullableListFilterBase<$PrismaModel>>,
            "path"
          >
        >,
        Required<JsonNullableListFilterBase<$PrismaModel>>
      >
    | OptionalFlat<
        Omit<Required<JsonNullableListFilterBase<$PrismaModel>>, "path">
      >;

  export type JsonNullableListFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue[] | ListJsonFieldRefInput<$PrismaModel> | null;
    has?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    hasEvery?: InputJsonValue[] | ListJsonFieldRefInput<$PrismaModel>;
    hasSome?: InputJsonValue[] | ListJsonFieldRefInput<$PrismaModel>;
    isEmpty?: boolean;
  };

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolFilter<$PrismaModel> | boolean;
  };

  export type CategoryRelationFilter = {
    is?: CategoryWhereInput;
    isNot?: CategoryWhereInput;
  };

  export type OrderProductListRelationFilter = {
    every?: OrderProductWhereInput;
    some?: OrderProductWhereInput;
    none?: OrderProductWhereInput;
  };

  export type OrderProductOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type ProductCountOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    slug?: SortOrder;
    image?: SortOrder;
    description?: SortOrder;
    price?: SortOrder;
    offerPrice?: SortOrder;
    images?: SortOrder;
    active?: SortOrder;
    businessId?: SortOrder;
    categoryId?: SortOrder;
  };

  export type ProductAvgOrderByAggregateInput = {
    price?: SortOrder;
    offerPrice?: SortOrder;
  };

  export type ProductMaxOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    slug?: SortOrder;
    description?: SortOrder;
    price?: SortOrder;
    offerPrice?: SortOrder;
    active?: SortOrder;
    businessId?: SortOrder;
    categoryId?: SortOrder;
  };

  export type ProductMinOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    slug?: SortOrder;
    description?: SortOrder;
    price?: SortOrder;
    offerPrice?: SortOrder;
    active?: SortOrder;
    businessId?: SortOrder;
    categoryId?: SortOrder;
  };

  export type ProductSumOrderByAggregateInput = {
    price?: SortOrder;
    offerPrice?: SortOrder;
  };
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<JsonWithAggregatesFilterBase<$PrismaModel>>,
          Exclude<
            keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>,
            "path"
          >
        >,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<
        Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, "path">
      >;

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?:
      | InputJsonValue
      | JsonFieldRefInput<$PrismaModel>
      | JsonNullValueFilter;
    path?: string[];
    string_contains?: string | StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    not?:
      | InputJsonValue
      | JsonFieldRefInput<$PrismaModel>
      | JsonNullValueFilter;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedJsonFilter<$PrismaModel>;
    _max?: NestedJsonFilter<$PrismaModel>;
  };

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedIntFilter<$PrismaModel>;
    _min?: NestedIntFilter<$PrismaModel>;
    _max?: NestedIntFilter<$PrismaModel>;
  };

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _avg?: NestedFloatNullableFilter<$PrismaModel>;
    _sum?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedIntNullableFilter<$PrismaModel>;
    _max?: NestedIntNullableFilter<$PrismaModel>;
  };

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedBoolFilter<$PrismaModel>;
    _max?: NestedBoolFilter<$PrismaModel>;
  };

  export type EnumUserRolesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRoles | EnumUserRolesFieldRefInput<$PrismaModel>;
    in?: $Enums.UserRoles[] | ListEnumUserRolesFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserRoles[] | ListEnumUserRolesFieldRefInput<$PrismaModel>;
    not?: NestedEnumUserRolesFilter<$PrismaModel> | $Enums.UserRoles;
  };

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
  };

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  };

  export type AccountListRelationFilter = {
    every?: AccountWhereInput;
    some?: AccountWhereInput;
    none?: AccountWhereInput;
  };

  export type SessionListRelationFilter = {
    every?: SessionWhereInput;
    some?: SessionWhereInput;
    none?: SessionWhereInput;
  };

  export type AuthenticatorListRelationFilter = {
    every?: AuthenticatorWhereInput;
    some?: AuthenticatorWhereInput;
    none?: AuthenticatorWhereInput;
  };

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type AuthenticatorOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder;
    role?: SortOrder;
    name?: SortOrder;
    phone?: SortOrder;
    email?: SortOrder;
    emailVerified?: SortOrder;
    image?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder;
    role?: SortOrder;
    name?: SortOrder;
    phone?: SortOrder;
    email?: SortOrder;
    emailVerified?: SortOrder;
    image?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder;
    role?: SortOrder;
    name?: SortOrder;
    phone?: SortOrder;
    email?: SortOrder;
    emailVerified?: SortOrder;
    image?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type EnumUserRolesWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRoles | EnumUserRolesFieldRefInput<$PrismaModel>;
    in?: $Enums.UserRoles[] | ListEnumUserRolesFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserRoles[] | ListEnumUserRolesFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumUserRolesWithAggregatesFilter<$PrismaModel>
      | $Enums.UserRoles;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumUserRolesFilter<$PrismaModel>;
    _max?: NestedEnumUserRolesFilter<$PrismaModel>;
  };

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?:
      | NestedDateTimeNullableWithAggregatesFilter<$PrismaModel>
      | Date
      | string
      | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedDateTimeNullableFilter<$PrismaModel>;
    _max?: NestedDateTimeNullableFilter<$PrismaModel>;
  };

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  };

  export type UserRelationFilter = {
    is?: UserWhereInput;
    isNot?: UserWhereInput;
  };

  export type UserBusinessUserIdBusinessIdCompoundUniqueInput = {
    userId: string;
    businessId: string;
  };

  export type UserBusinessCountOrderByAggregateInput = {
    userId?: SortOrder;
    businessId?: SortOrder;
  };

  export type UserBusinessMaxOrderByAggregateInput = {
    userId?: SortOrder;
    businessId?: SortOrder;
  };

  export type UserBusinessMinOrderByAggregateInput = {
    userId?: SortOrder;
    businessId?: SortOrder;
  };

  export type EnumOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.OrderStatus[]
      | ListEnumOrderStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumOrderStatusFilter<$PrismaModel> | $Enums.OrderStatus;
  };

  export type UserNullableRelationFilter = {
    is?: UserWhereInput | null;
    isNot?: UserWhereInput | null;
  };

  export type BusinessNullableRelationFilter = {
    is?: BusinessWhereInput | null;
    isNot?: BusinessWhereInput | null;
  };

  export type OrderCountOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    productsDetails?: SortOrder;
    total?: SortOrder;
    status?: SortOrder;
    sentAt?: SortOrder;
    position?: SortOrder;
    businessId?: SortOrder;
    identifier?: SortOrder;
  };

  export type OrderAvgOrderByAggregateInput = {
    total?: SortOrder;
    position?: SortOrder;
  };

  export type OrderMaxOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    total?: SortOrder;
    status?: SortOrder;
    sentAt?: SortOrder;
    position?: SortOrder;
    businessId?: SortOrder;
    identifier?: SortOrder;
  };

  export type OrderMinOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    total?: SortOrder;
    status?: SortOrder;
    sentAt?: SortOrder;
    position?: SortOrder;
    businessId?: SortOrder;
    identifier?: SortOrder;
  };

  export type OrderSumOrderByAggregateInput = {
    total?: SortOrder;
    position?: SortOrder;
  };

  export type EnumOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.OrderStatus[]
      | ListEnumOrderStatusFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel>
      | $Enums.OrderStatus;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumOrderStatusFilter<$PrismaModel>;
    _max?: NestedEnumOrderStatusFilter<$PrismaModel>;
  };

  export type ProductRelationFilter = {
    is?: ProductWhereInput;
    isNot?: ProductWhereInput;
  };

  export type OrderRelationFilter = {
    is?: OrderWhereInput;
    isNot?: OrderWhereInput;
  };

  export type OrderProductProductIdOrderIdCompoundUniqueInput = {
    productId: string;
    orderId: string;
  };

  export type OrderProductCountOrderByAggregateInput = {
    productId?: SortOrder;
    orderId?: SortOrder;
    price?: SortOrder;
    position?: SortOrder;
    quantity?: SortOrder;
  };

  export type OrderProductAvgOrderByAggregateInput = {
    price?: SortOrder;
    position?: SortOrder;
    quantity?: SortOrder;
  };

  export type OrderProductMaxOrderByAggregateInput = {
    productId?: SortOrder;
    orderId?: SortOrder;
    price?: SortOrder;
    position?: SortOrder;
    quantity?: SortOrder;
  };

  export type OrderProductMinOrderByAggregateInput = {
    productId?: SortOrder;
    orderId?: SortOrder;
    price?: SortOrder;
    position?: SortOrder;
    quantity?: SortOrder;
  };

  export type OrderProductSumOrderByAggregateInput = {
    price?: SortOrder;
    position?: SortOrder;
    quantity?: SortOrder;
  };

  export type AccountProviderProviderAccountIdCompoundUniqueInput = {
    provider: string;
    providerAccountId: string;
  };

  export type AccountCountOrderByAggregateInput = {
    userId?: SortOrder;
    type?: SortOrder;
    provider?: SortOrder;
    providerAccountId?: SortOrder;
    refresh_token?: SortOrder;
    access_token?: SortOrder;
    expires_at?: SortOrder;
    token_type?: SortOrder;
    scope?: SortOrder;
    id_token?: SortOrder;
    session_state?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type AccountAvgOrderByAggregateInput = {
    expires_at?: SortOrder;
  };

  export type AccountMaxOrderByAggregateInput = {
    userId?: SortOrder;
    type?: SortOrder;
    provider?: SortOrder;
    providerAccountId?: SortOrder;
    refresh_token?: SortOrder;
    access_token?: SortOrder;
    expires_at?: SortOrder;
    token_type?: SortOrder;
    scope?: SortOrder;
    id_token?: SortOrder;
    session_state?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type AccountMinOrderByAggregateInput = {
    userId?: SortOrder;
    type?: SortOrder;
    provider?: SortOrder;
    providerAccountId?: SortOrder;
    refresh_token?: SortOrder;
    access_token?: SortOrder;
    expires_at?: SortOrder;
    token_type?: SortOrder;
    scope?: SortOrder;
    id_token?: SortOrder;
    session_state?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type AccountSumOrderByAggregateInput = {
    expires_at?: SortOrder;
  };

  export type SessionCountOrderByAggregateInput = {
    sessionToken?: SortOrder;
    userId?: SortOrder;
    expires?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type SessionMaxOrderByAggregateInput = {
    sessionToken?: SortOrder;
    userId?: SortOrder;
    expires?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type SessionMinOrderByAggregateInput = {
    sessionToken?: SortOrder;
    userId?: SortOrder;
    expires?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type VerificationTokenIdentifierTokenCompoundUniqueInput = {
    identifier: string;
    token: string;
  };

  export type VerificationTokenCountOrderByAggregateInput = {
    identifier?: SortOrder;
    token?: SortOrder;
    expires?: SortOrder;
  };

  export type VerificationTokenMaxOrderByAggregateInput = {
    identifier?: SortOrder;
    token?: SortOrder;
    expires?: SortOrder;
  };

  export type VerificationTokenMinOrderByAggregateInput = {
    identifier?: SortOrder;
    token?: SortOrder;
    expires?: SortOrder;
  };

  export type AuthenticatorUserIdCredentialIDCompoundUniqueInput = {
    userId: string;
    credentialID: string;
  };

  export type AuthenticatorCountOrderByAggregateInput = {
    credentialID?: SortOrder;
    userId?: SortOrder;
    providerAccountId?: SortOrder;
    credentialPublicKey?: SortOrder;
    counter?: SortOrder;
    credentialDeviceType?: SortOrder;
    credentialBackedUp?: SortOrder;
    transports?: SortOrder;
  };

  export type AuthenticatorAvgOrderByAggregateInput = {
    counter?: SortOrder;
  };

  export type AuthenticatorMaxOrderByAggregateInput = {
    credentialID?: SortOrder;
    userId?: SortOrder;
    providerAccountId?: SortOrder;
    credentialPublicKey?: SortOrder;
    counter?: SortOrder;
    credentialDeviceType?: SortOrder;
    credentialBackedUp?: SortOrder;
    transports?: SortOrder;
  };

  export type AuthenticatorMinOrderByAggregateInput = {
    credentialID?: SortOrder;
    userId?: SortOrder;
    providerAccountId?: SortOrder;
    credentialPublicKey?: SortOrder;
    counter?: SortOrder;
    credentialDeviceType?: SortOrder;
    credentialBackedUp?: SortOrder;
    transports?: SortOrder;
  };

  export type AuthenticatorSumOrderByAggregateInput = {
    counter?: SortOrder;
  };

  export type BusinessCreatecoordinatesInput = {
    set: number[];
  };

  export type CategoryCreateNestedManyWithoutBusinessInput = {
    create?:
      | XOR<
          CategoryCreateWithoutBusinessInput,
          CategoryUncheckedCreateWithoutBusinessInput
        >
      | CategoryCreateWithoutBusinessInput[]
      | CategoryUncheckedCreateWithoutBusinessInput[];
    connectOrCreate?:
      | CategoryCreateOrConnectWithoutBusinessInput
      | CategoryCreateOrConnectWithoutBusinessInput[];
    createMany?: CategoryCreateManyBusinessInputEnvelope;
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[];
  };

  export type ProductCreateNestedManyWithoutBusinessInput = {
    create?:
      | XOR<
          ProductCreateWithoutBusinessInput,
          ProductUncheckedCreateWithoutBusinessInput
        >
      | ProductCreateWithoutBusinessInput[]
      | ProductUncheckedCreateWithoutBusinessInput[];
    connectOrCreate?:
      | ProductCreateOrConnectWithoutBusinessInput
      | ProductCreateOrConnectWithoutBusinessInput[];
    createMany?: ProductCreateManyBusinessInputEnvelope;
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[];
  };

  export type OrderCreateNestedManyWithoutBusinessInput = {
    create?:
      | XOR<
          OrderCreateWithoutBusinessInput,
          OrderUncheckedCreateWithoutBusinessInput
        >
      | OrderCreateWithoutBusinessInput[]
      | OrderUncheckedCreateWithoutBusinessInput[];
    connectOrCreate?:
      | OrderCreateOrConnectWithoutBusinessInput
      | OrderCreateOrConnectWithoutBusinessInput[];
    createMany?: OrderCreateManyBusinessInputEnvelope;
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[];
  };

  export type UserBusinessCreateNestedManyWithoutBusinessInput = {
    create?:
      | XOR<
          UserBusinessCreateWithoutBusinessInput,
          UserBusinessUncheckedCreateWithoutBusinessInput
        >
      | UserBusinessCreateWithoutBusinessInput[]
      | UserBusinessUncheckedCreateWithoutBusinessInput[];
    connectOrCreate?:
      | UserBusinessCreateOrConnectWithoutBusinessInput
      | UserBusinessCreateOrConnectWithoutBusinessInput[];
    createMany?: UserBusinessCreateManyBusinessInputEnvelope;
    connect?: UserBusinessWhereUniqueInput | UserBusinessWhereUniqueInput[];
  };

  export type CategoryUncheckedCreateNestedManyWithoutBusinessInput = {
    create?:
      | XOR<
          CategoryCreateWithoutBusinessInput,
          CategoryUncheckedCreateWithoutBusinessInput
        >
      | CategoryCreateWithoutBusinessInput[]
      | CategoryUncheckedCreateWithoutBusinessInput[];
    connectOrCreate?:
      | CategoryCreateOrConnectWithoutBusinessInput
      | CategoryCreateOrConnectWithoutBusinessInput[];
    createMany?: CategoryCreateManyBusinessInputEnvelope;
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[];
  };

  export type ProductUncheckedCreateNestedManyWithoutBusinessInput = {
    create?:
      | XOR<
          ProductCreateWithoutBusinessInput,
          ProductUncheckedCreateWithoutBusinessInput
        >
      | ProductCreateWithoutBusinessInput[]
      | ProductUncheckedCreateWithoutBusinessInput[];
    connectOrCreate?:
      | ProductCreateOrConnectWithoutBusinessInput
      | ProductCreateOrConnectWithoutBusinessInput[];
    createMany?: ProductCreateManyBusinessInputEnvelope;
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[];
  };

  export type OrderUncheckedCreateNestedManyWithoutBusinessInput = {
    create?:
      | XOR<
          OrderCreateWithoutBusinessInput,
          OrderUncheckedCreateWithoutBusinessInput
        >
      | OrderCreateWithoutBusinessInput[]
      | OrderUncheckedCreateWithoutBusinessInput[];
    connectOrCreate?:
      | OrderCreateOrConnectWithoutBusinessInput
      | OrderCreateOrConnectWithoutBusinessInput[];
    createMany?: OrderCreateManyBusinessInputEnvelope;
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[];
  };

  export type UserBusinessUncheckedCreateNestedManyWithoutBusinessInput = {
    create?:
      | XOR<
          UserBusinessCreateWithoutBusinessInput,
          UserBusinessUncheckedCreateWithoutBusinessInput
        >
      | UserBusinessCreateWithoutBusinessInput[]
      | UserBusinessUncheckedCreateWithoutBusinessInput[];
    connectOrCreate?:
      | UserBusinessCreateOrConnectWithoutBusinessInput
      | UserBusinessCreateOrConnectWithoutBusinessInput[];
    createMany?: UserBusinessCreateManyBusinessInputEnvelope;
    connect?: UserBusinessWhereUniqueInput | UserBusinessWhereUniqueInput[];
  };

  export type StringFieldUpdateOperationsInput = {
    set?: string;
  };

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
  };

  export type BusinessUpdatecoordinatesInput = {
    set?: number[];
    push?: number | number[];
  };

  export type CategoryUpdateManyWithoutBusinessNestedInput = {
    create?:
      | XOR<
          CategoryCreateWithoutBusinessInput,
          CategoryUncheckedCreateWithoutBusinessInput
        >
      | CategoryCreateWithoutBusinessInput[]
      | CategoryUncheckedCreateWithoutBusinessInput[];
    connectOrCreate?:
      | CategoryCreateOrConnectWithoutBusinessInput
      | CategoryCreateOrConnectWithoutBusinessInput[];
    upsert?:
      | CategoryUpsertWithWhereUniqueWithoutBusinessInput
      | CategoryUpsertWithWhereUniqueWithoutBusinessInput[];
    createMany?: CategoryCreateManyBusinessInputEnvelope;
    set?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[];
    disconnect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[];
    delete?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[];
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[];
    update?:
      | CategoryUpdateWithWhereUniqueWithoutBusinessInput
      | CategoryUpdateWithWhereUniqueWithoutBusinessInput[];
    updateMany?:
      | CategoryUpdateManyWithWhereWithoutBusinessInput
      | CategoryUpdateManyWithWhereWithoutBusinessInput[];
    deleteMany?: CategoryScalarWhereInput | CategoryScalarWhereInput[];
  };

  export type ProductUpdateManyWithoutBusinessNestedInput = {
    create?:
      | XOR<
          ProductCreateWithoutBusinessInput,
          ProductUncheckedCreateWithoutBusinessInput
        >
      | ProductCreateWithoutBusinessInput[]
      | ProductUncheckedCreateWithoutBusinessInput[];
    connectOrCreate?:
      | ProductCreateOrConnectWithoutBusinessInput
      | ProductCreateOrConnectWithoutBusinessInput[];
    upsert?:
      | ProductUpsertWithWhereUniqueWithoutBusinessInput
      | ProductUpsertWithWhereUniqueWithoutBusinessInput[];
    createMany?: ProductCreateManyBusinessInputEnvelope;
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[];
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[];
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[];
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[];
    update?:
      | ProductUpdateWithWhereUniqueWithoutBusinessInput
      | ProductUpdateWithWhereUniqueWithoutBusinessInput[];
    updateMany?:
      | ProductUpdateManyWithWhereWithoutBusinessInput
      | ProductUpdateManyWithWhereWithoutBusinessInput[];
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[];
  };

  export type OrderUpdateManyWithoutBusinessNestedInput = {
    create?:
      | XOR<
          OrderCreateWithoutBusinessInput,
          OrderUncheckedCreateWithoutBusinessInput
        >
      | OrderCreateWithoutBusinessInput[]
      | OrderUncheckedCreateWithoutBusinessInput[];
    connectOrCreate?:
      | OrderCreateOrConnectWithoutBusinessInput
      | OrderCreateOrConnectWithoutBusinessInput[];
    upsert?:
      | OrderUpsertWithWhereUniqueWithoutBusinessInput
      | OrderUpsertWithWhereUniqueWithoutBusinessInput[];
    createMany?: OrderCreateManyBusinessInputEnvelope;
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[];
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[];
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[];
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[];
    update?:
      | OrderUpdateWithWhereUniqueWithoutBusinessInput
      | OrderUpdateWithWhereUniqueWithoutBusinessInput[];
    updateMany?:
      | OrderUpdateManyWithWhereWithoutBusinessInput
      | OrderUpdateManyWithWhereWithoutBusinessInput[];
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[];
  };

  export type UserBusinessUpdateManyWithoutBusinessNestedInput = {
    create?:
      | XOR<
          UserBusinessCreateWithoutBusinessInput,
          UserBusinessUncheckedCreateWithoutBusinessInput
        >
      | UserBusinessCreateWithoutBusinessInput[]
      | UserBusinessUncheckedCreateWithoutBusinessInput[];
    connectOrCreate?:
      | UserBusinessCreateOrConnectWithoutBusinessInput
      | UserBusinessCreateOrConnectWithoutBusinessInput[];
    upsert?:
      | UserBusinessUpsertWithWhereUniqueWithoutBusinessInput
      | UserBusinessUpsertWithWhereUniqueWithoutBusinessInput[];
    createMany?: UserBusinessCreateManyBusinessInputEnvelope;
    set?: UserBusinessWhereUniqueInput | UserBusinessWhereUniqueInput[];
    disconnect?: UserBusinessWhereUniqueInput | UserBusinessWhereUniqueInput[];
    delete?: UserBusinessWhereUniqueInput | UserBusinessWhereUniqueInput[];
    connect?: UserBusinessWhereUniqueInput | UserBusinessWhereUniqueInput[];
    update?:
      | UserBusinessUpdateWithWhereUniqueWithoutBusinessInput
      | UserBusinessUpdateWithWhereUniqueWithoutBusinessInput[];
    updateMany?:
      | UserBusinessUpdateManyWithWhereWithoutBusinessInput
      | UserBusinessUpdateManyWithWhereWithoutBusinessInput[];
    deleteMany?: UserBusinessScalarWhereInput | UserBusinessScalarWhereInput[];
  };

  export type CategoryUncheckedUpdateManyWithoutBusinessNestedInput = {
    create?:
      | XOR<
          CategoryCreateWithoutBusinessInput,
          CategoryUncheckedCreateWithoutBusinessInput
        >
      | CategoryCreateWithoutBusinessInput[]
      | CategoryUncheckedCreateWithoutBusinessInput[];
    connectOrCreate?:
      | CategoryCreateOrConnectWithoutBusinessInput
      | CategoryCreateOrConnectWithoutBusinessInput[];
    upsert?:
      | CategoryUpsertWithWhereUniqueWithoutBusinessInput
      | CategoryUpsertWithWhereUniqueWithoutBusinessInput[];
    createMany?: CategoryCreateManyBusinessInputEnvelope;
    set?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[];
    disconnect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[];
    delete?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[];
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[];
    update?:
      | CategoryUpdateWithWhereUniqueWithoutBusinessInput
      | CategoryUpdateWithWhereUniqueWithoutBusinessInput[];
    updateMany?:
      | CategoryUpdateManyWithWhereWithoutBusinessInput
      | CategoryUpdateManyWithWhereWithoutBusinessInput[];
    deleteMany?: CategoryScalarWhereInput | CategoryScalarWhereInput[];
  };

  export type ProductUncheckedUpdateManyWithoutBusinessNestedInput = {
    create?:
      | XOR<
          ProductCreateWithoutBusinessInput,
          ProductUncheckedCreateWithoutBusinessInput
        >
      | ProductCreateWithoutBusinessInput[]
      | ProductUncheckedCreateWithoutBusinessInput[];
    connectOrCreate?:
      | ProductCreateOrConnectWithoutBusinessInput
      | ProductCreateOrConnectWithoutBusinessInput[];
    upsert?:
      | ProductUpsertWithWhereUniqueWithoutBusinessInput
      | ProductUpsertWithWhereUniqueWithoutBusinessInput[];
    createMany?: ProductCreateManyBusinessInputEnvelope;
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[];
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[];
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[];
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[];
    update?:
      | ProductUpdateWithWhereUniqueWithoutBusinessInput
      | ProductUpdateWithWhereUniqueWithoutBusinessInput[];
    updateMany?:
      | ProductUpdateManyWithWhereWithoutBusinessInput
      | ProductUpdateManyWithWhereWithoutBusinessInput[];
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[];
  };

  export type OrderUncheckedUpdateManyWithoutBusinessNestedInput = {
    create?:
      | XOR<
          OrderCreateWithoutBusinessInput,
          OrderUncheckedCreateWithoutBusinessInput
        >
      | OrderCreateWithoutBusinessInput[]
      | OrderUncheckedCreateWithoutBusinessInput[];
    connectOrCreate?:
      | OrderCreateOrConnectWithoutBusinessInput
      | OrderCreateOrConnectWithoutBusinessInput[];
    upsert?:
      | OrderUpsertWithWhereUniqueWithoutBusinessInput
      | OrderUpsertWithWhereUniqueWithoutBusinessInput[];
    createMany?: OrderCreateManyBusinessInputEnvelope;
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[];
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[];
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[];
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[];
    update?:
      | OrderUpdateWithWhereUniqueWithoutBusinessInput
      | OrderUpdateWithWhereUniqueWithoutBusinessInput[];
    updateMany?:
      | OrderUpdateManyWithWhereWithoutBusinessInput
      | OrderUpdateManyWithWhereWithoutBusinessInput[];
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[];
  };

  export type UserBusinessUncheckedUpdateManyWithoutBusinessNestedInput = {
    create?:
      | XOR<
          UserBusinessCreateWithoutBusinessInput,
          UserBusinessUncheckedCreateWithoutBusinessInput
        >
      | UserBusinessCreateWithoutBusinessInput[]
      | UserBusinessUncheckedCreateWithoutBusinessInput[];
    connectOrCreate?:
      | UserBusinessCreateOrConnectWithoutBusinessInput
      | UserBusinessCreateOrConnectWithoutBusinessInput[];
    upsert?:
      | UserBusinessUpsertWithWhereUniqueWithoutBusinessInput
      | UserBusinessUpsertWithWhereUniqueWithoutBusinessInput[];
    createMany?: UserBusinessCreateManyBusinessInputEnvelope;
    set?: UserBusinessWhereUniqueInput | UserBusinessWhereUniqueInput[];
    disconnect?: UserBusinessWhereUniqueInput | UserBusinessWhereUniqueInput[];
    delete?: UserBusinessWhereUniqueInput | UserBusinessWhereUniqueInput[];
    connect?: UserBusinessWhereUniqueInput | UserBusinessWhereUniqueInput[];
    update?:
      | UserBusinessUpdateWithWhereUniqueWithoutBusinessInput
      | UserBusinessUpdateWithWhereUniqueWithoutBusinessInput[];
    updateMany?:
      | UserBusinessUpdateManyWithWhereWithoutBusinessInput
      | UserBusinessUpdateManyWithWhereWithoutBusinessInput[];
    deleteMany?: UserBusinessScalarWhereInput | UserBusinessScalarWhereInput[];
  };

  export type ProductCreateNestedManyWithoutCategoryInput = {
    create?:
      | XOR<
          ProductCreateWithoutCategoryInput,
          ProductUncheckedCreateWithoutCategoryInput
        >
      | ProductCreateWithoutCategoryInput[]
      | ProductUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?:
      | ProductCreateOrConnectWithoutCategoryInput
      | ProductCreateOrConnectWithoutCategoryInput[];
    createMany?: ProductCreateManyCategoryInputEnvelope;
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[];
  };

  export type BusinessCreateNestedOneWithoutCategoriesInput = {
    create?: XOR<
      BusinessCreateWithoutCategoriesInput,
      BusinessUncheckedCreateWithoutCategoriesInput
    >;
    connectOrCreate?: BusinessCreateOrConnectWithoutCategoriesInput;
    connect?: BusinessWhereUniqueInput;
  };

  export type ProductUncheckedCreateNestedManyWithoutCategoryInput = {
    create?:
      | XOR<
          ProductCreateWithoutCategoryInput,
          ProductUncheckedCreateWithoutCategoryInput
        >
      | ProductCreateWithoutCategoryInput[]
      | ProductUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?:
      | ProductCreateOrConnectWithoutCategoryInput
      | ProductCreateOrConnectWithoutCategoryInput[];
    createMany?: ProductCreateManyCategoryInputEnvelope;
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[];
  };

  export type ProductUpdateManyWithoutCategoryNestedInput = {
    create?:
      | XOR<
          ProductCreateWithoutCategoryInput,
          ProductUncheckedCreateWithoutCategoryInput
        >
      | ProductCreateWithoutCategoryInput[]
      | ProductUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?:
      | ProductCreateOrConnectWithoutCategoryInput
      | ProductCreateOrConnectWithoutCategoryInput[];
    upsert?:
      | ProductUpsertWithWhereUniqueWithoutCategoryInput
      | ProductUpsertWithWhereUniqueWithoutCategoryInput[];
    createMany?: ProductCreateManyCategoryInputEnvelope;
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[];
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[];
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[];
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[];
    update?:
      | ProductUpdateWithWhereUniqueWithoutCategoryInput
      | ProductUpdateWithWhereUniqueWithoutCategoryInput[];
    updateMany?:
      | ProductUpdateManyWithWhereWithoutCategoryInput
      | ProductUpdateManyWithWhereWithoutCategoryInput[];
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[];
  };

  export type BusinessUpdateOneRequiredWithoutCategoriesNestedInput = {
    create?: XOR<
      BusinessCreateWithoutCategoriesInput,
      BusinessUncheckedCreateWithoutCategoriesInput
    >;
    connectOrCreate?: BusinessCreateOrConnectWithoutCategoriesInput;
    upsert?: BusinessUpsertWithoutCategoriesInput;
    connect?: BusinessWhereUniqueInput;
    update?: XOR<
      XOR<
        BusinessUpdateToOneWithWhereWithoutCategoriesInput,
        BusinessUpdateWithoutCategoriesInput
      >,
      BusinessUncheckedUpdateWithoutCategoriesInput
    >;
  };

  export type ProductUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?:
      | XOR<
          ProductCreateWithoutCategoryInput,
          ProductUncheckedCreateWithoutCategoryInput
        >
      | ProductCreateWithoutCategoryInput[]
      | ProductUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?:
      | ProductCreateOrConnectWithoutCategoryInput
      | ProductCreateOrConnectWithoutCategoryInput[];
    upsert?:
      | ProductUpsertWithWhereUniqueWithoutCategoryInput
      | ProductUpsertWithWhereUniqueWithoutCategoryInput[];
    createMany?: ProductCreateManyCategoryInputEnvelope;
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[];
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[];
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[];
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[];
    update?:
      | ProductUpdateWithWhereUniqueWithoutCategoryInput
      | ProductUpdateWithWhereUniqueWithoutCategoryInput[];
    updateMany?:
      | ProductUpdateManyWithWhereWithoutCategoryInput
      | ProductUpdateManyWithWhereWithoutCategoryInput[];
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[];
  };

  export type ProductCreateimagesInput = {
    set: InputJsonValue[];
  };

  export type BusinessCreateNestedOneWithoutProductsInput = {
    create?: XOR<
      BusinessCreateWithoutProductsInput,
      BusinessUncheckedCreateWithoutProductsInput
    >;
    connectOrCreate?: BusinessCreateOrConnectWithoutProductsInput;
    connect?: BusinessWhereUniqueInput;
  };

  export type CategoryCreateNestedOneWithoutProductsInput = {
    create?: XOR<
      CategoryCreateWithoutProductsInput,
      CategoryUncheckedCreateWithoutProductsInput
    >;
    connectOrCreate?: CategoryCreateOrConnectWithoutProductsInput;
    connect?: CategoryWhereUniqueInput;
  };

  export type OrderProductCreateNestedManyWithoutProductInput = {
    create?:
      | XOR<
          OrderProductCreateWithoutProductInput,
          OrderProductUncheckedCreateWithoutProductInput
        >
      | OrderProductCreateWithoutProductInput[]
      | OrderProductUncheckedCreateWithoutProductInput[];
    connectOrCreate?:
      | OrderProductCreateOrConnectWithoutProductInput
      | OrderProductCreateOrConnectWithoutProductInput[];
    createMany?: OrderProductCreateManyProductInputEnvelope;
    connect?: OrderProductWhereUniqueInput | OrderProductWhereUniqueInput[];
  };

  export type OrderProductUncheckedCreateNestedManyWithoutProductInput = {
    create?:
      | XOR<
          OrderProductCreateWithoutProductInput,
          OrderProductUncheckedCreateWithoutProductInput
        >
      | OrderProductCreateWithoutProductInput[]
      | OrderProductUncheckedCreateWithoutProductInput[];
    connectOrCreate?:
      | OrderProductCreateOrConnectWithoutProductInput
      | OrderProductCreateOrConnectWithoutProductInput[];
    createMany?: OrderProductCreateManyProductInputEnvelope;
    connect?: OrderProductWhereUniqueInput | OrderProductWhereUniqueInput[];
  };

  export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
  };

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
  };

  export type ProductUpdateimagesInput = {
    set?: InputJsonValue[];
    push?: InputJsonValue | InputJsonValue[];
  };

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
  };

  export type BusinessUpdateOneRequiredWithoutProductsNestedInput = {
    create?: XOR<
      BusinessCreateWithoutProductsInput,
      BusinessUncheckedCreateWithoutProductsInput
    >;
    connectOrCreate?: BusinessCreateOrConnectWithoutProductsInput;
    upsert?: BusinessUpsertWithoutProductsInput;
    connect?: BusinessWhereUniqueInput;
    update?: XOR<
      XOR<
        BusinessUpdateToOneWithWhereWithoutProductsInput,
        BusinessUpdateWithoutProductsInput
      >,
      BusinessUncheckedUpdateWithoutProductsInput
    >;
  };

  export type CategoryUpdateOneRequiredWithoutProductsNestedInput = {
    create?: XOR<
      CategoryCreateWithoutProductsInput,
      CategoryUncheckedCreateWithoutProductsInput
    >;
    connectOrCreate?: CategoryCreateOrConnectWithoutProductsInput;
    upsert?: CategoryUpsertWithoutProductsInput;
    connect?: CategoryWhereUniqueInput;
    update?: XOR<
      XOR<
        CategoryUpdateToOneWithWhereWithoutProductsInput,
        CategoryUpdateWithoutProductsInput
      >,
      CategoryUncheckedUpdateWithoutProductsInput
    >;
  };

  export type OrderProductUpdateManyWithoutProductNestedInput = {
    create?:
      | XOR<
          OrderProductCreateWithoutProductInput,
          OrderProductUncheckedCreateWithoutProductInput
        >
      | OrderProductCreateWithoutProductInput[]
      | OrderProductUncheckedCreateWithoutProductInput[];
    connectOrCreate?:
      | OrderProductCreateOrConnectWithoutProductInput
      | OrderProductCreateOrConnectWithoutProductInput[];
    upsert?:
      | OrderProductUpsertWithWhereUniqueWithoutProductInput
      | OrderProductUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: OrderProductCreateManyProductInputEnvelope;
    set?: OrderProductWhereUniqueInput | OrderProductWhereUniqueInput[];
    disconnect?: OrderProductWhereUniqueInput | OrderProductWhereUniqueInput[];
    delete?: OrderProductWhereUniqueInput | OrderProductWhereUniqueInput[];
    connect?: OrderProductWhereUniqueInput | OrderProductWhereUniqueInput[];
    update?:
      | OrderProductUpdateWithWhereUniqueWithoutProductInput
      | OrderProductUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?:
      | OrderProductUpdateManyWithWhereWithoutProductInput
      | OrderProductUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: OrderProductScalarWhereInput | OrderProductScalarWhereInput[];
  };

  export type OrderProductUncheckedUpdateManyWithoutProductNestedInput = {
    create?:
      | XOR<
          OrderProductCreateWithoutProductInput,
          OrderProductUncheckedCreateWithoutProductInput
        >
      | OrderProductCreateWithoutProductInput[]
      | OrderProductUncheckedCreateWithoutProductInput[];
    connectOrCreate?:
      | OrderProductCreateOrConnectWithoutProductInput
      | OrderProductCreateOrConnectWithoutProductInput[];
    upsert?:
      | OrderProductUpsertWithWhereUniqueWithoutProductInput
      | OrderProductUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: OrderProductCreateManyProductInputEnvelope;
    set?: OrderProductWhereUniqueInput | OrderProductWhereUniqueInput[];
    disconnect?: OrderProductWhereUniqueInput | OrderProductWhereUniqueInput[];
    delete?: OrderProductWhereUniqueInput | OrderProductWhereUniqueInput[];
    connect?: OrderProductWhereUniqueInput | OrderProductWhereUniqueInput[];
    update?:
      | OrderProductUpdateWithWhereUniqueWithoutProductInput
      | OrderProductUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?:
      | OrderProductUpdateManyWithWhereWithoutProductInput
      | OrderProductUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: OrderProductScalarWhereInput | OrderProductScalarWhereInput[];
  };

  export type OrderCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput>
      | OrderCreateWithoutUserInput[]
      | OrderUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | OrderCreateOrConnectWithoutUserInput
      | OrderCreateOrConnectWithoutUserInput[];
    createMany?: OrderCreateManyUserInputEnvelope;
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[];
  };

  export type AccountCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          AccountCreateWithoutUserInput,
          AccountUncheckedCreateWithoutUserInput
        >
      | AccountCreateWithoutUserInput[]
      | AccountUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | AccountCreateOrConnectWithoutUserInput
      | AccountCreateOrConnectWithoutUserInput[];
    createMany?: AccountCreateManyUserInputEnvelope;
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
  };

  export type SessionCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          SessionCreateWithoutUserInput,
          SessionUncheckedCreateWithoutUserInput
        >
      | SessionCreateWithoutUserInput[]
      | SessionUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | SessionCreateOrConnectWithoutUserInput
      | SessionCreateOrConnectWithoutUserInput[];
    createMany?: SessionCreateManyUserInputEnvelope;
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
  };

  export type AuthenticatorCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          AuthenticatorCreateWithoutUserInput,
          AuthenticatorUncheckedCreateWithoutUserInput
        >
      | AuthenticatorCreateWithoutUserInput[]
      | AuthenticatorUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | AuthenticatorCreateOrConnectWithoutUserInput
      | AuthenticatorCreateOrConnectWithoutUserInput[];
    createMany?: AuthenticatorCreateManyUserInputEnvelope;
    connect?: AuthenticatorWhereUniqueInput | AuthenticatorWhereUniqueInput[];
  };

  export type UserBusinessCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          UserBusinessCreateWithoutUserInput,
          UserBusinessUncheckedCreateWithoutUserInput
        >
      | UserBusinessCreateWithoutUserInput[]
      | UserBusinessUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | UserBusinessCreateOrConnectWithoutUserInput
      | UserBusinessCreateOrConnectWithoutUserInput[];
    createMany?: UserBusinessCreateManyUserInputEnvelope;
    connect?: UserBusinessWhereUniqueInput | UserBusinessWhereUniqueInput[];
  };

  export type OrderUncheckedCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput>
      | OrderCreateWithoutUserInput[]
      | OrderUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | OrderCreateOrConnectWithoutUserInput
      | OrderCreateOrConnectWithoutUserInput[];
    createMany?: OrderCreateManyUserInputEnvelope;
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[];
  };

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          AccountCreateWithoutUserInput,
          AccountUncheckedCreateWithoutUserInput
        >
      | AccountCreateWithoutUserInput[]
      | AccountUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | AccountCreateOrConnectWithoutUserInput
      | AccountCreateOrConnectWithoutUserInput[];
    createMany?: AccountCreateManyUserInputEnvelope;
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
  };

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          SessionCreateWithoutUserInput,
          SessionUncheckedCreateWithoutUserInput
        >
      | SessionCreateWithoutUserInput[]
      | SessionUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | SessionCreateOrConnectWithoutUserInput
      | SessionCreateOrConnectWithoutUserInput[];
    createMany?: SessionCreateManyUserInputEnvelope;
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
  };

  export type AuthenticatorUncheckedCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          AuthenticatorCreateWithoutUserInput,
          AuthenticatorUncheckedCreateWithoutUserInput
        >
      | AuthenticatorCreateWithoutUserInput[]
      | AuthenticatorUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | AuthenticatorCreateOrConnectWithoutUserInput
      | AuthenticatorCreateOrConnectWithoutUserInput[];
    createMany?: AuthenticatorCreateManyUserInputEnvelope;
    connect?: AuthenticatorWhereUniqueInput | AuthenticatorWhereUniqueInput[];
  };

  export type UserBusinessUncheckedCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          UserBusinessCreateWithoutUserInput,
          UserBusinessUncheckedCreateWithoutUserInput
        >
      | UserBusinessCreateWithoutUserInput[]
      | UserBusinessUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | UserBusinessCreateOrConnectWithoutUserInput
      | UserBusinessCreateOrConnectWithoutUserInput[];
    createMany?: UserBusinessCreateManyUserInputEnvelope;
    connect?: UserBusinessWhereUniqueInput | UserBusinessWhereUniqueInput[];
  };

  export type EnumUserRolesFieldUpdateOperationsInput = {
    set?: $Enums.UserRoles;
  };

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
  };

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
  };

  export type OrderUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput>
      | OrderCreateWithoutUserInput[]
      | OrderUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | OrderCreateOrConnectWithoutUserInput
      | OrderCreateOrConnectWithoutUserInput[];
    upsert?:
      | OrderUpsertWithWhereUniqueWithoutUserInput
      | OrderUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: OrderCreateManyUserInputEnvelope;
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[];
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[];
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[];
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[];
    update?:
      | OrderUpdateWithWhereUniqueWithoutUserInput
      | OrderUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | OrderUpdateManyWithWhereWithoutUserInput
      | OrderUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[];
  };

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          AccountCreateWithoutUserInput,
          AccountUncheckedCreateWithoutUserInput
        >
      | AccountCreateWithoutUserInput[]
      | AccountUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | AccountCreateOrConnectWithoutUserInput
      | AccountCreateOrConnectWithoutUserInput[];
    upsert?:
      | AccountUpsertWithWhereUniqueWithoutUserInput
      | AccountUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: AccountCreateManyUserInputEnvelope;
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
    update?:
      | AccountUpdateWithWhereUniqueWithoutUserInput
      | AccountUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | AccountUpdateManyWithWhereWithoutUserInput
      | AccountUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[];
  };

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          SessionCreateWithoutUserInput,
          SessionUncheckedCreateWithoutUserInput
        >
      | SessionCreateWithoutUserInput[]
      | SessionUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | SessionCreateOrConnectWithoutUserInput
      | SessionCreateOrConnectWithoutUserInput[];
    upsert?:
      | SessionUpsertWithWhereUniqueWithoutUserInput
      | SessionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: SessionCreateManyUserInputEnvelope;
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    update?:
      | SessionUpdateWithWhereUniqueWithoutUserInput
      | SessionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | SessionUpdateManyWithWhereWithoutUserInput
      | SessionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[];
  };

  export type AuthenticatorUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          AuthenticatorCreateWithoutUserInput,
          AuthenticatorUncheckedCreateWithoutUserInput
        >
      | AuthenticatorCreateWithoutUserInput[]
      | AuthenticatorUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | AuthenticatorCreateOrConnectWithoutUserInput
      | AuthenticatorCreateOrConnectWithoutUserInput[];
    upsert?:
      | AuthenticatorUpsertWithWhereUniqueWithoutUserInput
      | AuthenticatorUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: AuthenticatorCreateManyUserInputEnvelope;
    set?: AuthenticatorWhereUniqueInput | AuthenticatorWhereUniqueInput[];
    disconnect?:
      | AuthenticatorWhereUniqueInput
      | AuthenticatorWhereUniqueInput[];
    delete?: AuthenticatorWhereUniqueInput | AuthenticatorWhereUniqueInput[];
    connect?: AuthenticatorWhereUniqueInput | AuthenticatorWhereUniqueInput[];
    update?:
      | AuthenticatorUpdateWithWhereUniqueWithoutUserInput
      | AuthenticatorUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | AuthenticatorUpdateManyWithWhereWithoutUserInput
      | AuthenticatorUpdateManyWithWhereWithoutUserInput[];
    deleteMany?:
      | AuthenticatorScalarWhereInput
      | AuthenticatorScalarWhereInput[];
  };

  export type UserBusinessUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          UserBusinessCreateWithoutUserInput,
          UserBusinessUncheckedCreateWithoutUserInput
        >
      | UserBusinessCreateWithoutUserInput[]
      | UserBusinessUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | UserBusinessCreateOrConnectWithoutUserInput
      | UserBusinessCreateOrConnectWithoutUserInput[];
    upsert?:
      | UserBusinessUpsertWithWhereUniqueWithoutUserInput
      | UserBusinessUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: UserBusinessCreateManyUserInputEnvelope;
    set?: UserBusinessWhereUniqueInput | UserBusinessWhereUniqueInput[];
    disconnect?: UserBusinessWhereUniqueInput | UserBusinessWhereUniqueInput[];
    delete?: UserBusinessWhereUniqueInput | UserBusinessWhereUniqueInput[];
    connect?: UserBusinessWhereUniqueInput | UserBusinessWhereUniqueInput[];
    update?:
      | UserBusinessUpdateWithWhereUniqueWithoutUserInput
      | UserBusinessUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | UserBusinessUpdateManyWithWhereWithoutUserInput
      | UserBusinessUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: UserBusinessScalarWhereInput | UserBusinessScalarWhereInput[];
  };

  export type OrderUncheckedUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput>
      | OrderCreateWithoutUserInput[]
      | OrderUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | OrderCreateOrConnectWithoutUserInput
      | OrderCreateOrConnectWithoutUserInput[];
    upsert?:
      | OrderUpsertWithWhereUniqueWithoutUserInput
      | OrderUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: OrderCreateManyUserInputEnvelope;
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[];
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[];
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[];
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[];
    update?:
      | OrderUpdateWithWhereUniqueWithoutUserInput
      | OrderUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | OrderUpdateManyWithWhereWithoutUserInput
      | OrderUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[];
  };

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          AccountCreateWithoutUserInput,
          AccountUncheckedCreateWithoutUserInput
        >
      | AccountCreateWithoutUserInput[]
      | AccountUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | AccountCreateOrConnectWithoutUserInput
      | AccountCreateOrConnectWithoutUserInput[];
    upsert?:
      | AccountUpsertWithWhereUniqueWithoutUserInput
      | AccountUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: AccountCreateManyUserInputEnvelope;
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
    update?:
      | AccountUpdateWithWhereUniqueWithoutUserInput
      | AccountUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | AccountUpdateManyWithWhereWithoutUserInput
      | AccountUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[];
  };

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          SessionCreateWithoutUserInput,
          SessionUncheckedCreateWithoutUserInput
        >
      | SessionCreateWithoutUserInput[]
      | SessionUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | SessionCreateOrConnectWithoutUserInput
      | SessionCreateOrConnectWithoutUserInput[];
    upsert?:
      | SessionUpsertWithWhereUniqueWithoutUserInput
      | SessionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: SessionCreateManyUserInputEnvelope;
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    update?:
      | SessionUpdateWithWhereUniqueWithoutUserInput
      | SessionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | SessionUpdateManyWithWhereWithoutUserInput
      | SessionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[];
  };

  export type AuthenticatorUncheckedUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          AuthenticatorCreateWithoutUserInput,
          AuthenticatorUncheckedCreateWithoutUserInput
        >
      | AuthenticatorCreateWithoutUserInput[]
      | AuthenticatorUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | AuthenticatorCreateOrConnectWithoutUserInput
      | AuthenticatorCreateOrConnectWithoutUserInput[];
    upsert?:
      | AuthenticatorUpsertWithWhereUniqueWithoutUserInput
      | AuthenticatorUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: AuthenticatorCreateManyUserInputEnvelope;
    set?: AuthenticatorWhereUniqueInput | AuthenticatorWhereUniqueInput[];
    disconnect?:
      | AuthenticatorWhereUniqueInput
      | AuthenticatorWhereUniqueInput[];
    delete?: AuthenticatorWhereUniqueInput | AuthenticatorWhereUniqueInput[];
    connect?: AuthenticatorWhereUniqueInput | AuthenticatorWhereUniqueInput[];
    update?:
      | AuthenticatorUpdateWithWhereUniqueWithoutUserInput
      | AuthenticatorUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | AuthenticatorUpdateManyWithWhereWithoutUserInput
      | AuthenticatorUpdateManyWithWhereWithoutUserInput[];
    deleteMany?:
      | AuthenticatorScalarWhereInput
      | AuthenticatorScalarWhereInput[];
  };

  export type UserBusinessUncheckedUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          UserBusinessCreateWithoutUserInput,
          UserBusinessUncheckedCreateWithoutUserInput
        >
      | UserBusinessCreateWithoutUserInput[]
      | UserBusinessUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | UserBusinessCreateOrConnectWithoutUserInput
      | UserBusinessCreateOrConnectWithoutUserInput[];
    upsert?:
      | UserBusinessUpsertWithWhereUniqueWithoutUserInput
      | UserBusinessUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: UserBusinessCreateManyUserInputEnvelope;
    set?: UserBusinessWhereUniqueInput | UserBusinessWhereUniqueInput[];
    disconnect?: UserBusinessWhereUniqueInput | UserBusinessWhereUniqueInput[];
    delete?: UserBusinessWhereUniqueInput | UserBusinessWhereUniqueInput[];
    connect?: UserBusinessWhereUniqueInput | UserBusinessWhereUniqueInput[];
    update?:
      | UserBusinessUpdateWithWhereUniqueWithoutUserInput
      | UserBusinessUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | UserBusinessUpdateManyWithWhereWithoutUserInput
      | UserBusinessUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: UserBusinessScalarWhereInput | UserBusinessScalarWhereInput[];
  };

  export type UserCreateNestedOneWithoutBusinessInput = {
    create?: XOR<
      UserCreateWithoutBusinessInput,
      UserUncheckedCreateWithoutBusinessInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutBusinessInput;
    connect?: UserWhereUniqueInput;
  };

  export type BusinessCreateNestedOneWithoutUsersInput = {
    create?: XOR<
      BusinessCreateWithoutUsersInput,
      BusinessUncheckedCreateWithoutUsersInput
    >;
    connectOrCreate?: BusinessCreateOrConnectWithoutUsersInput;
    connect?: BusinessWhereUniqueInput;
  };

  export type UserUpdateOneRequiredWithoutBusinessNestedInput = {
    create?: XOR<
      UserCreateWithoutBusinessInput,
      UserUncheckedCreateWithoutBusinessInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutBusinessInput;
    upsert?: UserUpsertWithoutBusinessInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutBusinessInput,
        UserUpdateWithoutBusinessInput
      >,
      UserUncheckedUpdateWithoutBusinessInput
    >;
  };

  export type BusinessUpdateOneRequiredWithoutUsersNestedInput = {
    create?: XOR<
      BusinessCreateWithoutUsersInput,
      BusinessUncheckedCreateWithoutUsersInput
    >;
    connectOrCreate?: BusinessCreateOrConnectWithoutUsersInput;
    upsert?: BusinessUpsertWithoutUsersInput;
    connect?: BusinessWhereUniqueInput;
    update?: XOR<
      XOR<
        BusinessUpdateToOneWithWhereWithoutUsersInput,
        BusinessUpdateWithoutUsersInput
      >,
      BusinessUncheckedUpdateWithoutUsersInput
    >;
  };

  export type UserCreateNestedOneWithoutOrdersInput = {
    create?: XOR<
      UserCreateWithoutOrdersInput,
      UserUncheckedCreateWithoutOrdersInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutOrdersInput;
    connect?: UserWhereUniqueInput;
  };

  export type OrderProductCreateNestedManyWithoutOrderInput = {
    create?:
      | XOR<
          OrderProductCreateWithoutOrderInput,
          OrderProductUncheckedCreateWithoutOrderInput
        >
      | OrderProductCreateWithoutOrderInput[]
      | OrderProductUncheckedCreateWithoutOrderInput[];
    connectOrCreate?:
      | OrderProductCreateOrConnectWithoutOrderInput
      | OrderProductCreateOrConnectWithoutOrderInput[];
    createMany?: OrderProductCreateManyOrderInputEnvelope;
    connect?: OrderProductWhereUniqueInput | OrderProductWhereUniqueInput[];
  };

  export type BusinessCreateNestedOneWithoutOrdersInput = {
    create?: XOR<
      BusinessCreateWithoutOrdersInput,
      BusinessUncheckedCreateWithoutOrdersInput
    >;
    connectOrCreate?: BusinessCreateOrConnectWithoutOrdersInput;
    connect?: BusinessWhereUniqueInput;
  };

  export type OrderProductUncheckedCreateNestedManyWithoutOrderInput = {
    create?:
      | XOR<
          OrderProductCreateWithoutOrderInput,
          OrderProductUncheckedCreateWithoutOrderInput
        >
      | OrderProductCreateWithoutOrderInput[]
      | OrderProductUncheckedCreateWithoutOrderInput[];
    connectOrCreate?:
      | OrderProductCreateOrConnectWithoutOrderInput
      | OrderProductCreateOrConnectWithoutOrderInput[];
    createMany?: OrderProductCreateManyOrderInputEnvelope;
    connect?: OrderProductWhereUniqueInput | OrderProductWhereUniqueInput[];
  };

  export type EnumOrderStatusFieldUpdateOperationsInput = {
    set?: $Enums.OrderStatus;
  };

  export type UserUpdateOneWithoutOrdersNestedInput = {
    create?: XOR<
      UserCreateWithoutOrdersInput,
      UserUncheckedCreateWithoutOrdersInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutOrdersInput;
    upsert?: UserUpsertWithoutOrdersInput;
    disconnect?: UserWhereInput | boolean;
    delete?: UserWhereInput | boolean;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutOrdersInput,
        UserUpdateWithoutOrdersInput
      >,
      UserUncheckedUpdateWithoutOrdersInput
    >;
  };

  export type OrderProductUpdateManyWithoutOrderNestedInput = {
    create?:
      | XOR<
          OrderProductCreateWithoutOrderInput,
          OrderProductUncheckedCreateWithoutOrderInput
        >
      | OrderProductCreateWithoutOrderInput[]
      | OrderProductUncheckedCreateWithoutOrderInput[];
    connectOrCreate?:
      | OrderProductCreateOrConnectWithoutOrderInput
      | OrderProductCreateOrConnectWithoutOrderInput[];
    upsert?:
      | OrderProductUpsertWithWhereUniqueWithoutOrderInput
      | OrderProductUpsertWithWhereUniqueWithoutOrderInput[];
    createMany?: OrderProductCreateManyOrderInputEnvelope;
    set?: OrderProductWhereUniqueInput | OrderProductWhereUniqueInput[];
    disconnect?: OrderProductWhereUniqueInput | OrderProductWhereUniqueInput[];
    delete?: OrderProductWhereUniqueInput | OrderProductWhereUniqueInput[];
    connect?: OrderProductWhereUniqueInput | OrderProductWhereUniqueInput[];
    update?:
      | OrderProductUpdateWithWhereUniqueWithoutOrderInput
      | OrderProductUpdateWithWhereUniqueWithoutOrderInput[];
    updateMany?:
      | OrderProductUpdateManyWithWhereWithoutOrderInput
      | OrderProductUpdateManyWithWhereWithoutOrderInput[];
    deleteMany?: OrderProductScalarWhereInput | OrderProductScalarWhereInput[];
  };

  export type BusinessUpdateOneWithoutOrdersNestedInput = {
    create?: XOR<
      BusinessCreateWithoutOrdersInput,
      BusinessUncheckedCreateWithoutOrdersInput
    >;
    connectOrCreate?: BusinessCreateOrConnectWithoutOrdersInput;
    upsert?: BusinessUpsertWithoutOrdersInput;
    disconnect?: BusinessWhereInput | boolean;
    delete?: BusinessWhereInput | boolean;
    connect?: BusinessWhereUniqueInput;
    update?: XOR<
      XOR<
        BusinessUpdateToOneWithWhereWithoutOrdersInput,
        BusinessUpdateWithoutOrdersInput
      >,
      BusinessUncheckedUpdateWithoutOrdersInput
    >;
  };

  export type OrderProductUncheckedUpdateManyWithoutOrderNestedInput = {
    create?:
      | XOR<
          OrderProductCreateWithoutOrderInput,
          OrderProductUncheckedCreateWithoutOrderInput
        >
      | OrderProductCreateWithoutOrderInput[]
      | OrderProductUncheckedCreateWithoutOrderInput[];
    connectOrCreate?:
      | OrderProductCreateOrConnectWithoutOrderInput
      | OrderProductCreateOrConnectWithoutOrderInput[];
    upsert?:
      | OrderProductUpsertWithWhereUniqueWithoutOrderInput
      | OrderProductUpsertWithWhereUniqueWithoutOrderInput[];
    createMany?: OrderProductCreateManyOrderInputEnvelope;
    set?: OrderProductWhereUniqueInput | OrderProductWhereUniqueInput[];
    disconnect?: OrderProductWhereUniqueInput | OrderProductWhereUniqueInput[];
    delete?: OrderProductWhereUniqueInput | OrderProductWhereUniqueInput[];
    connect?: OrderProductWhereUniqueInput | OrderProductWhereUniqueInput[];
    update?:
      | OrderProductUpdateWithWhereUniqueWithoutOrderInput
      | OrderProductUpdateWithWhereUniqueWithoutOrderInput[];
    updateMany?:
      | OrderProductUpdateManyWithWhereWithoutOrderInput
      | OrderProductUpdateManyWithWhereWithoutOrderInput[];
    deleteMany?: OrderProductScalarWhereInput | OrderProductScalarWhereInput[];
  };

  export type ProductCreateNestedOneWithoutOrderItemsInput = {
    create?: XOR<
      ProductCreateWithoutOrderItemsInput,
      ProductUncheckedCreateWithoutOrderItemsInput
    >;
    connectOrCreate?: ProductCreateOrConnectWithoutOrderItemsInput;
    connect?: ProductWhereUniqueInput;
  };

  export type OrderCreateNestedOneWithoutItemsInput = {
    create?: XOR<
      OrderCreateWithoutItemsInput,
      OrderUncheckedCreateWithoutItemsInput
    >;
    connectOrCreate?: OrderCreateOrConnectWithoutItemsInput;
    connect?: OrderWhereUniqueInput;
  };

  export type ProductUpdateOneRequiredWithoutOrderItemsNestedInput = {
    create?: XOR<
      ProductCreateWithoutOrderItemsInput,
      ProductUncheckedCreateWithoutOrderItemsInput
    >;
    connectOrCreate?: ProductCreateOrConnectWithoutOrderItemsInput;
    upsert?: ProductUpsertWithoutOrderItemsInput;
    connect?: ProductWhereUniqueInput;
    update?: XOR<
      XOR<
        ProductUpdateToOneWithWhereWithoutOrderItemsInput,
        ProductUpdateWithoutOrderItemsInput
      >,
      ProductUncheckedUpdateWithoutOrderItemsInput
    >;
  };

  export type OrderUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<
      OrderCreateWithoutItemsInput,
      OrderUncheckedCreateWithoutItemsInput
    >;
    connectOrCreate?: OrderCreateOrConnectWithoutItemsInput;
    upsert?: OrderUpsertWithoutItemsInput;
    connect?: OrderWhereUniqueInput;
    update?: XOR<
      XOR<
        OrderUpdateToOneWithWhereWithoutItemsInput,
        OrderUpdateWithoutItemsInput
      >,
      OrderUncheckedUpdateWithoutItemsInput
    >;
  };

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<
      UserCreateWithoutAccountsInput,
      UserUncheckedCreateWithoutAccountsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput;
    connect?: UserWhereUniqueInput;
  };

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<
      UserCreateWithoutAccountsInput,
      UserUncheckedCreateWithoutAccountsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput;
    upsert?: UserUpsertWithoutAccountsInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutAccountsInput,
        UserUpdateWithoutAccountsInput
      >,
      UserUncheckedUpdateWithoutAccountsInput
    >;
  };

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<
      UserCreateWithoutSessionsInput,
      UserUncheckedCreateWithoutSessionsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput;
    connect?: UserWhereUniqueInput;
  };

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<
      UserCreateWithoutSessionsInput,
      UserUncheckedCreateWithoutSessionsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput;
    upsert?: UserUpsertWithoutSessionsInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutSessionsInput,
        UserUpdateWithoutSessionsInput
      >,
      UserUncheckedUpdateWithoutSessionsInput
    >;
  };

  export type UserCreateNestedOneWithoutAuthenticatorInput = {
    create?: XOR<
      UserCreateWithoutAuthenticatorInput,
      UserUncheckedCreateWithoutAuthenticatorInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutAuthenticatorInput;
    connect?: UserWhereUniqueInput;
  };

  export type UserUpdateOneRequiredWithoutAuthenticatorNestedInput = {
    create?: XOR<
      UserCreateWithoutAuthenticatorInput,
      UserUncheckedCreateWithoutAuthenticatorInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutAuthenticatorInput;
    upsert?: UserUpsertWithoutAuthenticatorInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutAuthenticatorInput,
        UserUpdateWithoutAuthenticatorInput
      >,
      UserUncheckedUpdateWithoutAuthenticatorInput
    >;
  };

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringFilter<$PrismaModel> | string;
  };

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringNullableFilter<$PrismaModel> | string | null;
  };

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntFilter<$PrismaModel> | number;
  };

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?:
      | NestedStringNullableWithAggregatesFilter<$PrismaModel>
      | string
      | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedStringNullableFilter<$PrismaModel>;
    _max?: NestedStringNullableFilter<$PrismaModel>;
  };

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableFilter<$PrismaModel> | number | null;
  };

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolFilter<$PrismaModel> | boolean;
  };
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<NestedJsonFilterBase<$PrismaModel>>,
          Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, "path">
        >,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, "path">>;

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?:
      | InputJsonValue
      | JsonFieldRefInput<$PrismaModel>
      | JsonNullValueFilter;
    path?: string[];
    string_contains?: string | StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    not?:
      | InputJsonValue
      | JsonFieldRefInput<$PrismaModel>
      | JsonNullValueFilter;
  };

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedIntFilter<$PrismaModel>;
    _min?: NestedIntFilter<$PrismaModel>;
    _max?: NestedIntFilter<$PrismaModel>;
  };

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatFilter<$PrismaModel> | number;
  };

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _avg?: NestedFloatNullableFilter<$PrismaModel>;
    _sum?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedIntNullableFilter<$PrismaModel>;
    _max?: NestedIntNullableFilter<$PrismaModel>;
  };

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null;
  };

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedBoolFilter<$PrismaModel>;
    _max?: NestedBoolFilter<$PrismaModel>;
  };

  export type NestedEnumUserRolesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRoles | EnumUserRolesFieldRefInput<$PrismaModel>;
    in?: $Enums.UserRoles[] | ListEnumUserRolesFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserRoles[] | ListEnumUserRolesFieldRefInput<$PrismaModel>;
    not?: NestedEnumUserRolesFilter<$PrismaModel> | $Enums.UserRoles;
  };

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
  };

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  };

  export type NestedEnumUserRolesWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRoles | EnumUserRolesFieldRefInput<$PrismaModel>;
    in?: $Enums.UserRoles[] | ListEnumUserRolesFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserRoles[] | ListEnumUserRolesFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumUserRolesWithAggregatesFilter<$PrismaModel>
      | $Enums.UserRoles;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumUserRolesFilter<$PrismaModel>;
    _max?: NestedEnumUserRolesFilter<$PrismaModel>;
  };

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> =
    {
      equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
      in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
      notIn?:
        | Date[]
        | string[]
        | ListDateTimeFieldRefInput<$PrismaModel>
        | null;
      lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
      lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
      gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
      gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
      not?:
        | NestedDateTimeNullableWithAggregatesFilter<$PrismaModel>
        | Date
        | string
        | null;
      _count?: NestedIntNullableFilter<$PrismaModel>;
      _min?: NestedDateTimeNullableFilter<$PrismaModel>;
      _max?: NestedDateTimeNullableFilter<$PrismaModel>;
    };

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  };

  export type NestedEnumOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.OrderStatus[]
      | ListEnumOrderStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumOrderStatusFilter<$PrismaModel> | $Enums.OrderStatus;
  };

  export type NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel = never> =
    {
      equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>;
      in?:
        | $Enums.OrderStatus[]
        | ListEnumOrderStatusFieldRefInput<$PrismaModel>;
      notIn?:
        | $Enums.OrderStatus[]
        | ListEnumOrderStatusFieldRefInput<$PrismaModel>;
      not?:
        | NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel>
        | $Enums.OrderStatus;
      _count?: NestedIntFilter<$PrismaModel>;
      _min?: NestedEnumOrderStatusFilter<$PrismaModel>;
      _max?: NestedEnumOrderStatusFilter<$PrismaModel>;
    };

  export type CategoryCreateWithoutBusinessInput = {
    id?: string;
    name: string;
    slug?: string | null;
    products?: ProductCreateNestedManyWithoutCategoryInput;
  };

  export type CategoryUncheckedCreateWithoutBusinessInput = {
    id?: string;
    name: string;
    slug?: string | null;
    products?: ProductUncheckedCreateNestedManyWithoutCategoryInput;
  };

  export type CategoryCreateOrConnectWithoutBusinessInput = {
    where: CategoryWhereUniqueInput;
    create: XOR<
      CategoryCreateWithoutBusinessInput,
      CategoryUncheckedCreateWithoutBusinessInput
    >;
  };

  export type CategoryCreateManyBusinessInputEnvelope = {
    data: CategoryCreateManyBusinessInput | CategoryCreateManyBusinessInput[];
    skipDuplicates?: boolean;
  };

  export type ProductCreateWithoutBusinessInput = {
    id?: string;
    name: string;
    slug?: string | null;
    image: JsonNullValueInput | InputJsonValue;
    description: string;
    price: number;
    offerPrice?: number | null;
    images?: ProductCreateimagesInput | InputJsonValue[];
    active?: boolean;
    category: CategoryCreateNestedOneWithoutProductsInput;
    orderItems?: OrderProductCreateNestedManyWithoutProductInput;
  };

  export type ProductUncheckedCreateWithoutBusinessInput = {
    id?: string;
    name: string;
    slug?: string | null;
    image: JsonNullValueInput | InputJsonValue;
    description: string;
    price: number;
    offerPrice?: number | null;
    images?: ProductCreateimagesInput | InputJsonValue[];
    active?: boolean;
    categoryId: string;
    orderItems?: OrderProductUncheckedCreateNestedManyWithoutProductInput;
  };

  export type ProductCreateOrConnectWithoutBusinessInput = {
    where: ProductWhereUniqueInput;
    create: XOR<
      ProductCreateWithoutBusinessInput,
      ProductUncheckedCreateWithoutBusinessInput
    >;
  };

  export type ProductCreateManyBusinessInputEnvelope = {
    data: ProductCreateManyBusinessInput | ProductCreateManyBusinessInput[];
    skipDuplicates?: boolean;
  };

  export type OrderCreateWithoutBusinessInput = {
    id?: string;
    productsDetails: JsonNullValueInput | InputJsonValue;
    total?: number;
    status?: $Enums.OrderStatus;
    sentAt?: Date | string | null;
    position?: number | null;
    identifier?: string | null;
    user?: UserCreateNestedOneWithoutOrdersInput;
    items?: OrderProductCreateNestedManyWithoutOrderInput;
  };

  export type OrderUncheckedCreateWithoutBusinessInput = {
    id?: string;
    userId?: string | null;
    productsDetails: JsonNullValueInput | InputJsonValue;
    total?: number;
    status?: $Enums.OrderStatus;
    sentAt?: Date | string | null;
    position?: number | null;
    identifier?: string | null;
    items?: OrderProductUncheckedCreateNestedManyWithoutOrderInput;
  };

  export type OrderCreateOrConnectWithoutBusinessInput = {
    where: OrderWhereUniqueInput;
    create: XOR<
      OrderCreateWithoutBusinessInput,
      OrderUncheckedCreateWithoutBusinessInput
    >;
  };

  export type OrderCreateManyBusinessInputEnvelope = {
    data: OrderCreateManyBusinessInput | OrderCreateManyBusinessInput[];
    skipDuplicates?: boolean;
  };

  export type UserBusinessCreateWithoutBusinessInput = {
    user: UserCreateNestedOneWithoutBusinessInput;
  };

  export type UserBusinessUncheckedCreateWithoutBusinessInput = {
    userId: string;
  };

  export type UserBusinessCreateOrConnectWithoutBusinessInput = {
    where: UserBusinessWhereUniqueInput;
    create: XOR<
      UserBusinessCreateWithoutBusinessInput,
      UserBusinessUncheckedCreateWithoutBusinessInput
    >;
  };

  export type UserBusinessCreateManyBusinessInputEnvelope = {
    data:
      | UserBusinessCreateManyBusinessInput
      | UserBusinessCreateManyBusinessInput[];
    skipDuplicates?: boolean;
  };

  export type CategoryUpsertWithWhereUniqueWithoutBusinessInput = {
    where: CategoryWhereUniqueInput;
    update: XOR<
      CategoryUpdateWithoutBusinessInput,
      CategoryUncheckedUpdateWithoutBusinessInput
    >;
    create: XOR<
      CategoryCreateWithoutBusinessInput,
      CategoryUncheckedCreateWithoutBusinessInput
    >;
  };

  export type CategoryUpdateWithWhereUniqueWithoutBusinessInput = {
    where: CategoryWhereUniqueInput;
    data: XOR<
      CategoryUpdateWithoutBusinessInput,
      CategoryUncheckedUpdateWithoutBusinessInput
    >;
  };

  export type CategoryUpdateManyWithWhereWithoutBusinessInput = {
    where: CategoryScalarWhereInput;
    data: XOR<
      CategoryUpdateManyMutationInput,
      CategoryUncheckedUpdateManyWithoutBusinessInput
    >;
  };

  export type CategoryScalarWhereInput = {
    AND?: CategoryScalarWhereInput | CategoryScalarWhereInput[];
    OR?: CategoryScalarWhereInput[];
    NOT?: CategoryScalarWhereInput | CategoryScalarWhereInput[];
    id?: StringFilter<"Category"> | string;
    name?: StringFilter<"Category"> | string;
    slug?: StringNullableFilter<"Category"> | string | null;
    businessId?: StringFilter<"Category"> | string;
  };

  export type ProductUpsertWithWhereUniqueWithoutBusinessInput = {
    where: ProductWhereUniqueInput;
    update: XOR<
      ProductUpdateWithoutBusinessInput,
      ProductUncheckedUpdateWithoutBusinessInput
    >;
    create: XOR<
      ProductCreateWithoutBusinessInput,
      ProductUncheckedCreateWithoutBusinessInput
    >;
  };

  export type ProductUpdateWithWhereUniqueWithoutBusinessInput = {
    where: ProductWhereUniqueInput;
    data: XOR<
      ProductUpdateWithoutBusinessInput,
      ProductUncheckedUpdateWithoutBusinessInput
    >;
  };

  export type ProductUpdateManyWithWhereWithoutBusinessInput = {
    where: ProductScalarWhereInput;
    data: XOR<
      ProductUpdateManyMutationInput,
      ProductUncheckedUpdateManyWithoutBusinessInput
    >;
  };

  export type ProductScalarWhereInput = {
    AND?: ProductScalarWhereInput | ProductScalarWhereInput[];
    OR?: ProductScalarWhereInput[];
    NOT?: ProductScalarWhereInput | ProductScalarWhereInput[];
    id?: StringFilter<"Product"> | string;
    name?: StringFilter<"Product"> | string;
    slug?: StringNullableFilter<"Product"> | string | null;
    image?: JsonFilter<"Product">;
    description?: StringFilter<"Product"> | string;
    price?: IntFilter<"Product"> | number;
    offerPrice?: IntNullableFilter<"Product"> | number | null;
    images?: JsonNullableListFilter<"Product">;
    active?: BoolFilter<"Product"> | boolean;
    businessId?: StringFilter<"Product"> | string;
    categoryId?: StringFilter<"Product"> | string;
  };

  export type OrderUpsertWithWhereUniqueWithoutBusinessInput = {
    where: OrderWhereUniqueInput;
    update: XOR<
      OrderUpdateWithoutBusinessInput,
      OrderUncheckedUpdateWithoutBusinessInput
    >;
    create: XOR<
      OrderCreateWithoutBusinessInput,
      OrderUncheckedCreateWithoutBusinessInput
    >;
  };

  export type OrderUpdateWithWhereUniqueWithoutBusinessInput = {
    where: OrderWhereUniqueInput;
    data: XOR<
      OrderUpdateWithoutBusinessInput,
      OrderUncheckedUpdateWithoutBusinessInput
    >;
  };

  export type OrderUpdateManyWithWhereWithoutBusinessInput = {
    where: OrderScalarWhereInput;
    data: XOR<
      OrderUpdateManyMutationInput,
      OrderUncheckedUpdateManyWithoutBusinessInput
    >;
  };

  export type OrderScalarWhereInput = {
    AND?: OrderScalarWhereInput | OrderScalarWhereInput[];
    OR?: OrderScalarWhereInput[];
    NOT?: OrderScalarWhereInput | OrderScalarWhereInput[];
    id?: StringFilter<"Order"> | string;
    userId?: StringNullableFilter<"Order"> | string | null;
    productsDetails?: JsonFilter<"Order">;
    total?: IntFilter<"Order"> | number;
    status?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus;
    sentAt?: DateTimeNullableFilter<"Order"> | Date | string | null;
    position?: IntNullableFilter<"Order"> | number | null;
    businessId?: StringNullableFilter<"Order"> | string | null;
    identifier?: StringNullableFilter<"Order"> | string | null;
  };

  export type UserBusinessUpsertWithWhereUniqueWithoutBusinessInput = {
    where: UserBusinessWhereUniqueInput;
    update: XOR<
      UserBusinessUpdateWithoutBusinessInput,
      UserBusinessUncheckedUpdateWithoutBusinessInput
    >;
    create: XOR<
      UserBusinessCreateWithoutBusinessInput,
      UserBusinessUncheckedCreateWithoutBusinessInput
    >;
  };

  export type UserBusinessUpdateWithWhereUniqueWithoutBusinessInput = {
    where: UserBusinessWhereUniqueInput;
    data: XOR<
      UserBusinessUpdateWithoutBusinessInput,
      UserBusinessUncheckedUpdateWithoutBusinessInput
    >;
  };

  export type UserBusinessUpdateManyWithWhereWithoutBusinessInput = {
    where: UserBusinessScalarWhereInput;
    data: XOR<
      UserBusinessUpdateManyMutationInput,
      UserBusinessUncheckedUpdateManyWithoutBusinessInput
    >;
  };

  export type UserBusinessScalarWhereInput = {
    AND?: UserBusinessScalarWhereInput | UserBusinessScalarWhereInput[];
    OR?: UserBusinessScalarWhereInput[];
    NOT?: UserBusinessScalarWhereInput | UserBusinessScalarWhereInput[];
    userId?: StringFilter<"UserBusiness"> | string;
    businessId?: StringFilter<"UserBusiness"> | string;
  };

  export type ProductCreateWithoutCategoryInput = {
    id?: string;
    name: string;
    slug?: string | null;
    image: JsonNullValueInput | InputJsonValue;
    description: string;
    price: number;
    offerPrice?: number | null;
    images?: ProductCreateimagesInput | InputJsonValue[];
    active?: boolean;
    business: BusinessCreateNestedOneWithoutProductsInput;
    orderItems?: OrderProductCreateNestedManyWithoutProductInput;
  };

  export type ProductUncheckedCreateWithoutCategoryInput = {
    id?: string;
    name: string;
    slug?: string | null;
    image: JsonNullValueInput | InputJsonValue;
    description: string;
    price: number;
    offerPrice?: number | null;
    images?: ProductCreateimagesInput | InputJsonValue[];
    active?: boolean;
    businessId: string;
    orderItems?: OrderProductUncheckedCreateNestedManyWithoutProductInput;
  };

  export type ProductCreateOrConnectWithoutCategoryInput = {
    where: ProductWhereUniqueInput;
    create: XOR<
      ProductCreateWithoutCategoryInput,
      ProductUncheckedCreateWithoutCategoryInput
    >;
  };

  export type ProductCreateManyCategoryInputEnvelope = {
    data: ProductCreateManyCategoryInput | ProductCreateManyCategoryInput[];
    skipDuplicates?: boolean;
  };

  export type BusinessCreateWithoutCategoriesInput = {
    id?: string;
    name: string;
    description?: string | null;
    address?: string | null;
    phone?: string | null;
    howToArrive?: string | null;
    coordinates?: BusinessCreatecoordinatesInput | number[];
    slug?: string | null;
    products?: ProductCreateNestedManyWithoutBusinessInput;
    orders?: OrderCreateNestedManyWithoutBusinessInput;
    users?: UserBusinessCreateNestedManyWithoutBusinessInput;
  };

  export type BusinessUncheckedCreateWithoutCategoriesInput = {
    id?: string;
    name: string;
    description?: string | null;
    address?: string | null;
    phone?: string | null;
    howToArrive?: string | null;
    coordinates?: BusinessCreatecoordinatesInput | number[];
    slug?: string | null;
    products?: ProductUncheckedCreateNestedManyWithoutBusinessInput;
    orders?: OrderUncheckedCreateNestedManyWithoutBusinessInput;
    users?: UserBusinessUncheckedCreateNestedManyWithoutBusinessInput;
  };

  export type BusinessCreateOrConnectWithoutCategoriesInput = {
    where: BusinessWhereUniqueInput;
    create: XOR<
      BusinessCreateWithoutCategoriesInput,
      BusinessUncheckedCreateWithoutCategoriesInput
    >;
  };

  export type ProductUpsertWithWhereUniqueWithoutCategoryInput = {
    where: ProductWhereUniqueInput;
    update: XOR<
      ProductUpdateWithoutCategoryInput,
      ProductUncheckedUpdateWithoutCategoryInput
    >;
    create: XOR<
      ProductCreateWithoutCategoryInput,
      ProductUncheckedCreateWithoutCategoryInput
    >;
  };

  export type ProductUpdateWithWhereUniqueWithoutCategoryInput = {
    where: ProductWhereUniqueInput;
    data: XOR<
      ProductUpdateWithoutCategoryInput,
      ProductUncheckedUpdateWithoutCategoryInput
    >;
  };

  export type ProductUpdateManyWithWhereWithoutCategoryInput = {
    where: ProductScalarWhereInput;
    data: XOR<
      ProductUpdateManyMutationInput,
      ProductUncheckedUpdateManyWithoutCategoryInput
    >;
  };

  export type BusinessUpsertWithoutCategoriesInput = {
    update: XOR<
      BusinessUpdateWithoutCategoriesInput,
      BusinessUncheckedUpdateWithoutCategoriesInput
    >;
    create: XOR<
      BusinessCreateWithoutCategoriesInput,
      BusinessUncheckedCreateWithoutCategoriesInput
    >;
    where?: BusinessWhereInput;
  };

  export type BusinessUpdateToOneWithWhereWithoutCategoriesInput = {
    where?: BusinessWhereInput;
    data: XOR<
      BusinessUpdateWithoutCategoriesInput,
      BusinessUncheckedUpdateWithoutCategoriesInput
    >;
  };

  export type BusinessUpdateWithoutCategoriesInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    address?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    howToArrive?: NullableStringFieldUpdateOperationsInput | string | null;
    coordinates?: BusinessUpdatecoordinatesInput | number[];
    slug?: NullableStringFieldUpdateOperationsInput | string | null;
    products?: ProductUpdateManyWithoutBusinessNestedInput;
    orders?: OrderUpdateManyWithoutBusinessNestedInput;
    users?: UserBusinessUpdateManyWithoutBusinessNestedInput;
  };

  export type BusinessUncheckedUpdateWithoutCategoriesInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    address?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    howToArrive?: NullableStringFieldUpdateOperationsInput | string | null;
    coordinates?: BusinessUpdatecoordinatesInput | number[];
    slug?: NullableStringFieldUpdateOperationsInput | string | null;
    products?: ProductUncheckedUpdateManyWithoutBusinessNestedInput;
    orders?: OrderUncheckedUpdateManyWithoutBusinessNestedInput;
    users?: UserBusinessUncheckedUpdateManyWithoutBusinessNestedInput;
  };

  export type BusinessCreateWithoutProductsInput = {
    id?: string;
    name: string;
    description?: string | null;
    address?: string | null;
    phone?: string | null;
    howToArrive?: string | null;
    coordinates?: BusinessCreatecoordinatesInput | number[];
    slug?: string | null;
    categories?: CategoryCreateNestedManyWithoutBusinessInput;
    orders?: OrderCreateNestedManyWithoutBusinessInput;
    users?: UserBusinessCreateNestedManyWithoutBusinessInput;
  };

  export type BusinessUncheckedCreateWithoutProductsInput = {
    id?: string;
    name: string;
    description?: string | null;
    address?: string | null;
    phone?: string | null;
    howToArrive?: string | null;
    coordinates?: BusinessCreatecoordinatesInput | number[];
    slug?: string | null;
    categories?: CategoryUncheckedCreateNestedManyWithoutBusinessInput;
    orders?: OrderUncheckedCreateNestedManyWithoutBusinessInput;
    users?: UserBusinessUncheckedCreateNestedManyWithoutBusinessInput;
  };

  export type BusinessCreateOrConnectWithoutProductsInput = {
    where: BusinessWhereUniqueInput;
    create: XOR<
      BusinessCreateWithoutProductsInput,
      BusinessUncheckedCreateWithoutProductsInput
    >;
  };

  export type CategoryCreateWithoutProductsInput = {
    id?: string;
    name: string;
    slug?: string | null;
    business: BusinessCreateNestedOneWithoutCategoriesInput;
  };

  export type CategoryUncheckedCreateWithoutProductsInput = {
    id?: string;
    name: string;
    slug?: string | null;
    businessId: string;
  };

  export type CategoryCreateOrConnectWithoutProductsInput = {
    where: CategoryWhereUniqueInput;
    create: XOR<
      CategoryCreateWithoutProductsInput,
      CategoryUncheckedCreateWithoutProductsInput
    >;
  };

  export type OrderProductCreateWithoutProductInput = {
    price: number;
    position?: number;
    quantity: number;
    order: OrderCreateNestedOneWithoutItemsInput;
  };

  export type OrderProductUncheckedCreateWithoutProductInput = {
    orderId: string;
    price: number;
    position?: number;
    quantity: number;
  };

  export type OrderProductCreateOrConnectWithoutProductInput = {
    where: OrderProductWhereUniqueInput;
    create: XOR<
      OrderProductCreateWithoutProductInput,
      OrderProductUncheckedCreateWithoutProductInput
    >;
  };

  export type OrderProductCreateManyProductInputEnvelope = {
    data:
      | OrderProductCreateManyProductInput
      | OrderProductCreateManyProductInput[];
    skipDuplicates?: boolean;
  };

  export type BusinessUpsertWithoutProductsInput = {
    update: XOR<
      BusinessUpdateWithoutProductsInput,
      BusinessUncheckedUpdateWithoutProductsInput
    >;
    create: XOR<
      BusinessCreateWithoutProductsInput,
      BusinessUncheckedCreateWithoutProductsInput
    >;
    where?: BusinessWhereInput;
  };

  export type BusinessUpdateToOneWithWhereWithoutProductsInput = {
    where?: BusinessWhereInput;
    data: XOR<
      BusinessUpdateWithoutProductsInput,
      BusinessUncheckedUpdateWithoutProductsInput
    >;
  };

  export type BusinessUpdateWithoutProductsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    address?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    howToArrive?: NullableStringFieldUpdateOperationsInput | string | null;
    coordinates?: BusinessUpdatecoordinatesInput | number[];
    slug?: NullableStringFieldUpdateOperationsInput | string | null;
    categories?: CategoryUpdateManyWithoutBusinessNestedInput;
    orders?: OrderUpdateManyWithoutBusinessNestedInput;
    users?: UserBusinessUpdateManyWithoutBusinessNestedInput;
  };

  export type BusinessUncheckedUpdateWithoutProductsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    address?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    howToArrive?: NullableStringFieldUpdateOperationsInput | string | null;
    coordinates?: BusinessUpdatecoordinatesInput | number[];
    slug?: NullableStringFieldUpdateOperationsInput | string | null;
    categories?: CategoryUncheckedUpdateManyWithoutBusinessNestedInput;
    orders?: OrderUncheckedUpdateManyWithoutBusinessNestedInput;
    users?: UserBusinessUncheckedUpdateManyWithoutBusinessNestedInput;
  };

  export type CategoryUpsertWithoutProductsInput = {
    update: XOR<
      CategoryUpdateWithoutProductsInput,
      CategoryUncheckedUpdateWithoutProductsInput
    >;
    create: XOR<
      CategoryCreateWithoutProductsInput,
      CategoryUncheckedCreateWithoutProductsInput
    >;
    where?: CategoryWhereInput;
  };

  export type CategoryUpdateToOneWithWhereWithoutProductsInput = {
    where?: CategoryWhereInput;
    data: XOR<
      CategoryUpdateWithoutProductsInput,
      CategoryUncheckedUpdateWithoutProductsInput
    >;
  };

  export type CategoryUpdateWithoutProductsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    slug?: NullableStringFieldUpdateOperationsInput | string | null;
    business?: BusinessUpdateOneRequiredWithoutCategoriesNestedInput;
  };

  export type CategoryUncheckedUpdateWithoutProductsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    slug?: NullableStringFieldUpdateOperationsInput | string | null;
    businessId?: StringFieldUpdateOperationsInput | string;
  };

  export type OrderProductUpsertWithWhereUniqueWithoutProductInput = {
    where: OrderProductWhereUniqueInput;
    update: XOR<
      OrderProductUpdateWithoutProductInput,
      OrderProductUncheckedUpdateWithoutProductInput
    >;
    create: XOR<
      OrderProductCreateWithoutProductInput,
      OrderProductUncheckedCreateWithoutProductInput
    >;
  };

  export type OrderProductUpdateWithWhereUniqueWithoutProductInput = {
    where: OrderProductWhereUniqueInput;
    data: XOR<
      OrderProductUpdateWithoutProductInput,
      OrderProductUncheckedUpdateWithoutProductInput
    >;
  };

  export type OrderProductUpdateManyWithWhereWithoutProductInput = {
    where: OrderProductScalarWhereInput;
    data: XOR<
      OrderProductUpdateManyMutationInput,
      OrderProductUncheckedUpdateManyWithoutProductInput
    >;
  };

  export type OrderProductScalarWhereInput = {
    AND?: OrderProductScalarWhereInput | OrderProductScalarWhereInput[];
    OR?: OrderProductScalarWhereInput[];
    NOT?: OrderProductScalarWhereInput | OrderProductScalarWhereInput[];
    productId?: StringFilter<"OrderProduct"> | string;
    orderId?: StringFilter<"OrderProduct"> | string;
    price?: IntFilter<"OrderProduct"> | number;
    position?: IntFilter<"OrderProduct"> | number;
    quantity?: IntFilter<"OrderProduct"> | number;
  };

  export type OrderCreateWithoutUserInput = {
    id?: string;
    productsDetails: JsonNullValueInput | InputJsonValue;
    total?: number;
    status?: $Enums.OrderStatus;
    sentAt?: Date | string | null;
    position?: number | null;
    identifier?: string | null;
    items?: OrderProductCreateNestedManyWithoutOrderInput;
    business?: BusinessCreateNestedOneWithoutOrdersInput;
  };

  export type OrderUncheckedCreateWithoutUserInput = {
    id?: string;
    productsDetails: JsonNullValueInput | InputJsonValue;
    total?: number;
    status?: $Enums.OrderStatus;
    sentAt?: Date | string | null;
    position?: number | null;
    businessId?: string | null;
    identifier?: string | null;
    items?: OrderProductUncheckedCreateNestedManyWithoutOrderInput;
  };

  export type OrderCreateOrConnectWithoutUserInput = {
    where: OrderWhereUniqueInput;
    create: XOR<
      OrderCreateWithoutUserInput,
      OrderUncheckedCreateWithoutUserInput
    >;
  };

  export type OrderCreateManyUserInputEnvelope = {
    data: OrderCreateManyUserInput | OrderCreateManyUserInput[];
    skipDuplicates?: boolean;
  };

  export type AccountCreateWithoutUserInput = {
    type: string;
    provider: string;
    providerAccountId: string;
    refresh_token?: string | null;
    access_token?: string | null;
    expires_at?: number | null;
    token_type?: string | null;
    scope?: string | null;
    id_token?: string | null;
    session_state?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type AccountUncheckedCreateWithoutUserInput = {
    type: string;
    provider: string;
    providerAccountId: string;
    refresh_token?: string | null;
    access_token?: string | null;
    expires_at?: number | null;
    token_type?: string | null;
    scope?: string | null;
    id_token?: string | null;
    session_state?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type AccountCreateOrConnectWithoutUserInput = {
    where: AccountWhereUniqueInput;
    create: XOR<
      AccountCreateWithoutUserInput,
      AccountUncheckedCreateWithoutUserInput
    >;
  };

  export type AccountCreateManyUserInputEnvelope = {
    data: AccountCreateManyUserInput | AccountCreateManyUserInput[];
    skipDuplicates?: boolean;
  };

  export type SessionCreateWithoutUserInput = {
    sessionToken: string;
    expires: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type SessionUncheckedCreateWithoutUserInput = {
    sessionToken: string;
    expires: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput;
    create: XOR<
      SessionCreateWithoutUserInput,
      SessionUncheckedCreateWithoutUserInput
    >;
  };

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[];
    skipDuplicates?: boolean;
  };

  export type AuthenticatorCreateWithoutUserInput = {
    credentialID: string;
    providerAccountId: string;
    credentialPublicKey: string;
    counter: number;
    credentialDeviceType: string;
    credentialBackedUp: boolean;
    transports?: string | null;
  };

  export type AuthenticatorUncheckedCreateWithoutUserInput = {
    credentialID: string;
    providerAccountId: string;
    credentialPublicKey: string;
    counter: number;
    credentialDeviceType: string;
    credentialBackedUp: boolean;
    transports?: string | null;
  };

  export type AuthenticatorCreateOrConnectWithoutUserInput = {
    where: AuthenticatorWhereUniqueInput;
    create: XOR<
      AuthenticatorCreateWithoutUserInput,
      AuthenticatorUncheckedCreateWithoutUserInput
    >;
  };

  export type AuthenticatorCreateManyUserInputEnvelope = {
    data: AuthenticatorCreateManyUserInput | AuthenticatorCreateManyUserInput[];
    skipDuplicates?: boolean;
  };

  export type UserBusinessCreateWithoutUserInput = {
    business: BusinessCreateNestedOneWithoutUsersInput;
  };

  export type UserBusinessUncheckedCreateWithoutUserInput = {
    businessId: string;
  };

  export type UserBusinessCreateOrConnectWithoutUserInput = {
    where: UserBusinessWhereUniqueInput;
    create: XOR<
      UserBusinessCreateWithoutUserInput,
      UserBusinessUncheckedCreateWithoutUserInput
    >;
  };

  export type UserBusinessCreateManyUserInputEnvelope = {
    data: UserBusinessCreateManyUserInput | UserBusinessCreateManyUserInput[];
    skipDuplicates?: boolean;
  };

  export type OrderUpsertWithWhereUniqueWithoutUserInput = {
    where: OrderWhereUniqueInput;
    update: XOR<
      OrderUpdateWithoutUserInput,
      OrderUncheckedUpdateWithoutUserInput
    >;
    create: XOR<
      OrderCreateWithoutUserInput,
      OrderUncheckedCreateWithoutUserInput
    >;
  };

  export type OrderUpdateWithWhereUniqueWithoutUserInput = {
    where: OrderWhereUniqueInput;
    data: XOR<
      OrderUpdateWithoutUserInput,
      OrderUncheckedUpdateWithoutUserInput
    >;
  };

  export type OrderUpdateManyWithWhereWithoutUserInput = {
    where: OrderScalarWhereInput;
    data: XOR<
      OrderUpdateManyMutationInput,
      OrderUncheckedUpdateManyWithoutUserInput
    >;
  };

  export type AccountUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput;
    update: XOR<
      AccountUpdateWithoutUserInput,
      AccountUncheckedUpdateWithoutUserInput
    >;
    create: XOR<
      AccountCreateWithoutUserInput,
      AccountUncheckedCreateWithoutUserInput
    >;
  };

  export type AccountUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput;
    data: XOR<
      AccountUpdateWithoutUserInput,
      AccountUncheckedUpdateWithoutUserInput
    >;
  };

  export type AccountUpdateManyWithWhereWithoutUserInput = {
    where: AccountScalarWhereInput;
    data: XOR<
      AccountUpdateManyMutationInput,
      AccountUncheckedUpdateManyWithoutUserInput
    >;
  };

  export type AccountScalarWhereInput = {
    AND?: AccountScalarWhereInput | AccountScalarWhereInput[];
    OR?: AccountScalarWhereInput[];
    NOT?: AccountScalarWhereInput | AccountScalarWhereInput[];
    userId?: StringFilter<"Account"> | string;
    type?: StringFilter<"Account"> | string;
    provider?: StringFilter<"Account"> | string;
    providerAccountId?: StringFilter<"Account"> | string;
    refresh_token?: StringNullableFilter<"Account"> | string | null;
    access_token?: StringNullableFilter<"Account"> | string | null;
    expires_at?: IntNullableFilter<"Account"> | number | null;
    token_type?: StringNullableFilter<"Account"> | string | null;
    scope?: StringNullableFilter<"Account"> | string | null;
    id_token?: StringNullableFilter<"Account"> | string | null;
    session_state?: StringNullableFilter<"Account"> | string | null;
    createdAt?: DateTimeFilter<"Account"> | Date | string;
    updatedAt?: DateTimeFilter<"Account"> | Date | string;
  };

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput;
    update: XOR<
      SessionUpdateWithoutUserInput,
      SessionUncheckedUpdateWithoutUserInput
    >;
    create: XOR<
      SessionCreateWithoutUserInput,
      SessionUncheckedCreateWithoutUserInput
    >;
  };

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput;
    data: XOR<
      SessionUpdateWithoutUserInput,
      SessionUncheckedUpdateWithoutUserInput
    >;
  };

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput;
    data: XOR<
      SessionUpdateManyMutationInput,
      SessionUncheckedUpdateManyWithoutUserInput
    >;
  };

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[];
    OR?: SessionScalarWhereInput[];
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[];
    sessionToken?: StringFilter<"Session"> | string;
    userId?: StringFilter<"Session"> | string;
    expires?: DateTimeFilter<"Session"> | Date | string;
    createdAt?: DateTimeFilter<"Session"> | Date | string;
    updatedAt?: DateTimeFilter<"Session"> | Date | string;
  };

  export type AuthenticatorUpsertWithWhereUniqueWithoutUserInput = {
    where: AuthenticatorWhereUniqueInput;
    update: XOR<
      AuthenticatorUpdateWithoutUserInput,
      AuthenticatorUncheckedUpdateWithoutUserInput
    >;
    create: XOR<
      AuthenticatorCreateWithoutUserInput,
      AuthenticatorUncheckedCreateWithoutUserInput
    >;
  };

  export type AuthenticatorUpdateWithWhereUniqueWithoutUserInput = {
    where: AuthenticatorWhereUniqueInput;
    data: XOR<
      AuthenticatorUpdateWithoutUserInput,
      AuthenticatorUncheckedUpdateWithoutUserInput
    >;
  };

  export type AuthenticatorUpdateManyWithWhereWithoutUserInput = {
    where: AuthenticatorScalarWhereInput;
    data: XOR<
      AuthenticatorUpdateManyMutationInput,
      AuthenticatorUncheckedUpdateManyWithoutUserInput
    >;
  };

  export type AuthenticatorScalarWhereInput = {
    AND?: AuthenticatorScalarWhereInput | AuthenticatorScalarWhereInput[];
    OR?: AuthenticatorScalarWhereInput[];
    NOT?: AuthenticatorScalarWhereInput | AuthenticatorScalarWhereInput[];
    credentialID?: StringFilter<"Authenticator"> | string;
    userId?: StringFilter<"Authenticator"> | string;
    providerAccountId?: StringFilter<"Authenticator"> | string;
    credentialPublicKey?: StringFilter<"Authenticator"> | string;
    counter?: IntFilter<"Authenticator"> | number;
    credentialDeviceType?: StringFilter<"Authenticator"> | string;
    credentialBackedUp?: BoolFilter<"Authenticator"> | boolean;
    transports?: StringNullableFilter<"Authenticator"> | string | null;
  };

  export type UserBusinessUpsertWithWhereUniqueWithoutUserInput = {
    where: UserBusinessWhereUniqueInput;
    update: XOR<
      UserBusinessUpdateWithoutUserInput,
      UserBusinessUncheckedUpdateWithoutUserInput
    >;
    create: XOR<
      UserBusinessCreateWithoutUserInput,
      UserBusinessUncheckedCreateWithoutUserInput
    >;
  };

  export type UserBusinessUpdateWithWhereUniqueWithoutUserInput = {
    where: UserBusinessWhereUniqueInput;
    data: XOR<
      UserBusinessUpdateWithoutUserInput,
      UserBusinessUncheckedUpdateWithoutUserInput
    >;
  };

  export type UserBusinessUpdateManyWithWhereWithoutUserInput = {
    where: UserBusinessScalarWhereInput;
    data: XOR<
      UserBusinessUpdateManyMutationInput,
      UserBusinessUncheckedUpdateManyWithoutUserInput
    >;
  };

  export type UserCreateWithoutBusinessInput = {
    id?: string;
    role?: $Enums.UserRoles;
    name?: string | null;
    phone?: string | null;
    email: string;
    emailVerified?: Date | string | null;
    image?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    orders?: OrderCreateNestedManyWithoutUserInput;
    accounts?: AccountCreateNestedManyWithoutUserInput;
    sessions?: SessionCreateNestedManyWithoutUserInput;
    Authenticator?: AuthenticatorCreateNestedManyWithoutUserInput;
  };

  export type UserUncheckedCreateWithoutBusinessInput = {
    id?: string;
    role?: $Enums.UserRoles;
    name?: string | null;
    phone?: string | null;
    email: string;
    emailVerified?: Date | string | null;
    image?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    orders?: OrderUncheckedCreateNestedManyWithoutUserInput;
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput;
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput;
    Authenticator?: AuthenticatorUncheckedCreateNestedManyWithoutUserInput;
  };

  export type UserCreateOrConnectWithoutBusinessInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutBusinessInput,
      UserUncheckedCreateWithoutBusinessInput
    >;
  };

  export type BusinessCreateWithoutUsersInput = {
    id?: string;
    name: string;
    description?: string | null;
    address?: string | null;
    phone?: string | null;
    howToArrive?: string | null;
    coordinates?: BusinessCreatecoordinatesInput | number[];
    slug?: string | null;
    categories?: CategoryCreateNestedManyWithoutBusinessInput;
    products?: ProductCreateNestedManyWithoutBusinessInput;
    orders?: OrderCreateNestedManyWithoutBusinessInput;
  };

  export type BusinessUncheckedCreateWithoutUsersInput = {
    id?: string;
    name: string;
    description?: string | null;
    address?: string | null;
    phone?: string | null;
    howToArrive?: string | null;
    coordinates?: BusinessCreatecoordinatesInput | number[];
    slug?: string | null;
    categories?: CategoryUncheckedCreateNestedManyWithoutBusinessInput;
    products?: ProductUncheckedCreateNestedManyWithoutBusinessInput;
    orders?: OrderUncheckedCreateNestedManyWithoutBusinessInput;
  };

  export type BusinessCreateOrConnectWithoutUsersInput = {
    where: BusinessWhereUniqueInput;
    create: XOR<
      BusinessCreateWithoutUsersInput,
      BusinessUncheckedCreateWithoutUsersInput
    >;
  };

  export type UserUpsertWithoutBusinessInput = {
    update: XOR<
      UserUpdateWithoutBusinessInput,
      UserUncheckedUpdateWithoutBusinessInput
    >;
    create: XOR<
      UserCreateWithoutBusinessInput,
      UserUncheckedCreateWithoutBusinessInput
    >;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutBusinessInput = {
    where?: UserWhereInput;
    data: XOR<
      UserUpdateWithoutBusinessInput,
      UserUncheckedUpdateWithoutBusinessInput
    >;
  };

  export type UserUpdateWithoutBusinessInput = {
    id?: StringFieldUpdateOperationsInput | string;
    role?: EnumUserRolesFieldUpdateOperationsInput | $Enums.UserRoles;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: StringFieldUpdateOperationsInput | string;
    emailVerified?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    orders?: OrderUpdateManyWithoutUserNestedInput;
    accounts?: AccountUpdateManyWithoutUserNestedInput;
    sessions?: SessionUpdateManyWithoutUserNestedInput;
    Authenticator?: AuthenticatorUpdateManyWithoutUserNestedInput;
  };

  export type UserUncheckedUpdateWithoutBusinessInput = {
    id?: StringFieldUpdateOperationsInput | string;
    role?: EnumUserRolesFieldUpdateOperationsInput | $Enums.UserRoles;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: StringFieldUpdateOperationsInput | string;
    emailVerified?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    orders?: OrderUncheckedUpdateManyWithoutUserNestedInput;
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput;
    Authenticator?: AuthenticatorUncheckedUpdateManyWithoutUserNestedInput;
  };

  export type BusinessUpsertWithoutUsersInput = {
    update: XOR<
      BusinessUpdateWithoutUsersInput,
      BusinessUncheckedUpdateWithoutUsersInput
    >;
    create: XOR<
      BusinessCreateWithoutUsersInput,
      BusinessUncheckedCreateWithoutUsersInput
    >;
    where?: BusinessWhereInput;
  };

  export type BusinessUpdateToOneWithWhereWithoutUsersInput = {
    where?: BusinessWhereInput;
    data: XOR<
      BusinessUpdateWithoutUsersInput,
      BusinessUncheckedUpdateWithoutUsersInput
    >;
  };

  export type BusinessUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    address?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    howToArrive?: NullableStringFieldUpdateOperationsInput | string | null;
    coordinates?: BusinessUpdatecoordinatesInput | number[];
    slug?: NullableStringFieldUpdateOperationsInput | string | null;
    categories?: CategoryUpdateManyWithoutBusinessNestedInput;
    products?: ProductUpdateManyWithoutBusinessNestedInput;
    orders?: OrderUpdateManyWithoutBusinessNestedInput;
  };

  export type BusinessUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    address?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    howToArrive?: NullableStringFieldUpdateOperationsInput | string | null;
    coordinates?: BusinessUpdatecoordinatesInput | number[];
    slug?: NullableStringFieldUpdateOperationsInput | string | null;
    categories?: CategoryUncheckedUpdateManyWithoutBusinessNestedInput;
    products?: ProductUncheckedUpdateManyWithoutBusinessNestedInput;
    orders?: OrderUncheckedUpdateManyWithoutBusinessNestedInput;
  };

  export type UserCreateWithoutOrdersInput = {
    id?: string;
    role?: $Enums.UserRoles;
    name?: string | null;
    phone?: string | null;
    email: string;
    emailVerified?: Date | string | null;
    image?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    accounts?: AccountCreateNestedManyWithoutUserInput;
    sessions?: SessionCreateNestedManyWithoutUserInput;
    Authenticator?: AuthenticatorCreateNestedManyWithoutUserInput;
    business?: UserBusinessCreateNestedManyWithoutUserInput;
  };

  export type UserUncheckedCreateWithoutOrdersInput = {
    id?: string;
    role?: $Enums.UserRoles;
    name?: string | null;
    phone?: string | null;
    email: string;
    emailVerified?: Date | string | null;
    image?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput;
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput;
    Authenticator?: AuthenticatorUncheckedCreateNestedManyWithoutUserInput;
    business?: UserBusinessUncheckedCreateNestedManyWithoutUserInput;
  };

  export type UserCreateOrConnectWithoutOrdersInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutOrdersInput,
      UserUncheckedCreateWithoutOrdersInput
    >;
  };

  export type OrderProductCreateWithoutOrderInput = {
    price: number;
    position?: number;
    quantity: number;
    product: ProductCreateNestedOneWithoutOrderItemsInput;
  };

  export type OrderProductUncheckedCreateWithoutOrderInput = {
    productId: string;
    price: number;
    position?: number;
    quantity: number;
  };

  export type OrderProductCreateOrConnectWithoutOrderInput = {
    where: OrderProductWhereUniqueInput;
    create: XOR<
      OrderProductCreateWithoutOrderInput,
      OrderProductUncheckedCreateWithoutOrderInput
    >;
  };

  export type OrderProductCreateManyOrderInputEnvelope = {
    data: OrderProductCreateManyOrderInput | OrderProductCreateManyOrderInput[];
    skipDuplicates?: boolean;
  };

  export type BusinessCreateWithoutOrdersInput = {
    id?: string;
    name: string;
    description?: string | null;
    address?: string | null;
    phone?: string | null;
    howToArrive?: string | null;
    coordinates?: BusinessCreatecoordinatesInput | number[];
    slug?: string | null;
    categories?: CategoryCreateNestedManyWithoutBusinessInput;
    products?: ProductCreateNestedManyWithoutBusinessInput;
    users?: UserBusinessCreateNestedManyWithoutBusinessInput;
  };

  export type BusinessUncheckedCreateWithoutOrdersInput = {
    id?: string;
    name: string;
    description?: string | null;
    address?: string | null;
    phone?: string | null;
    howToArrive?: string | null;
    coordinates?: BusinessCreatecoordinatesInput | number[];
    slug?: string | null;
    categories?: CategoryUncheckedCreateNestedManyWithoutBusinessInput;
    products?: ProductUncheckedCreateNestedManyWithoutBusinessInput;
    users?: UserBusinessUncheckedCreateNestedManyWithoutBusinessInput;
  };

  export type BusinessCreateOrConnectWithoutOrdersInput = {
    where: BusinessWhereUniqueInput;
    create: XOR<
      BusinessCreateWithoutOrdersInput,
      BusinessUncheckedCreateWithoutOrdersInput
    >;
  };

  export type UserUpsertWithoutOrdersInput = {
    update: XOR<
      UserUpdateWithoutOrdersInput,
      UserUncheckedUpdateWithoutOrdersInput
    >;
    create: XOR<
      UserCreateWithoutOrdersInput,
      UserUncheckedCreateWithoutOrdersInput
    >;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutOrdersInput = {
    where?: UserWhereInput;
    data: XOR<
      UserUpdateWithoutOrdersInput,
      UserUncheckedUpdateWithoutOrdersInput
    >;
  };

  export type UserUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string;
    role?: EnumUserRolesFieldUpdateOperationsInput | $Enums.UserRoles;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: StringFieldUpdateOperationsInput | string;
    emailVerified?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    accounts?: AccountUpdateManyWithoutUserNestedInput;
    sessions?: SessionUpdateManyWithoutUserNestedInput;
    Authenticator?: AuthenticatorUpdateManyWithoutUserNestedInput;
    business?: UserBusinessUpdateManyWithoutUserNestedInput;
  };

  export type UserUncheckedUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string;
    role?: EnumUserRolesFieldUpdateOperationsInput | $Enums.UserRoles;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: StringFieldUpdateOperationsInput | string;
    emailVerified?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput;
    Authenticator?: AuthenticatorUncheckedUpdateManyWithoutUserNestedInput;
    business?: UserBusinessUncheckedUpdateManyWithoutUserNestedInput;
  };

  export type OrderProductUpsertWithWhereUniqueWithoutOrderInput = {
    where: OrderProductWhereUniqueInput;
    update: XOR<
      OrderProductUpdateWithoutOrderInput,
      OrderProductUncheckedUpdateWithoutOrderInput
    >;
    create: XOR<
      OrderProductCreateWithoutOrderInput,
      OrderProductUncheckedCreateWithoutOrderInput
    >;
  };

  export type OrderProductUpdateWithWhereUniqueWithoutOrderInput = {
    where: OrderProductWhereUniqueInput;
    data: XOR<
      OrderProductUpdateWithoutOrderInput,
      OrderProductUncheckedUpdateWithoutOrderInput
    >;
  };

  export type OrderProductUpdateManyWithWhereWithoutOrderInput = {
    where: OrderProductScalarWhereInput;
    data: XOR<
      OrderProductUpdateManyMutationInput,
      OrderProductUncheckedUpdateManyWithoutOrderInput
    >;
  };

  export type BusinessUpsertWithoutOrdersInput = {
    update: XOR<
      BusinessUpdateWithoutOrdersInput,
      BusinessUncheckedUpdateWithoutOrdersInput
    >;
    create: XOR<
      BusinessCreateWithoutOrdersInput,
      BusinessUncheckedCreateWithoutOrdersInput
    >;
    where?: BusinessWhereInput;
  };

  export type BusinessUpdateToOneWithWhereWithoutOrdersInput = {
    where?: BusinessWhereInput;
    data: XOR<
      BusinessUpdateWithoutOrdersInput,
      BusinessUncheckedUpdateWithoutOrdersInput
    >;
  };

  export type BusinessUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    address?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    howToArrive?: NullableStringFieldUpdateOperationsInput | string | null;
    coordinates?: BusinessUpdatecoordinatesInput | number[];
    slug?: NullableStringFieldUpdateOperationsInput | string | null;
    categories?: CategoryUpdateManyWithoutBusinessNestedInput;
    products?: ProductUpdateManyWithoutBusinessNestedInput;
    users?: UserBusinessUpdateManyWithoutBusinessNestedInput;
  };

  export type BusinessUncheckedUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    address?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    howToArrive?: NullableStringFieldUpdateOperationsInput | string | null;
    coordinates?: BusinessUpdatecoordinatesInput | number[];
    slug?: NullableStringFieldUpdateOperationsInput | string | null;
    categories?: CategoryUncheckedUpdateManyWithoutBusinessNestedInput;
    products?: ProductUncheckedUpdateManyWithoutBusinessNestedInput;
    users?: UserBusinessUncheckedUpdateManyWithoutBusinessNestedInput;
  };

  export type ProductCreateWithoutOrderItemsInput = {
    id?: string;
    name: string;
    slug?: string | null;
    image: JsonNullValueInput | InputJsonValue;
    description: string;
    price: number;
    offerPrice?: number | null;
    images?: ProductCreateimagesInput | InputJsonValue[];
    active?: boolean;
    business: BusinessCreateNestedOneWithoutProductsInput;
    category: CategoryCreateNestedOneWithoutProductsInput;
  };

  export type ProductUncheckedCreateWithoutOrderItemsInput = {
    id?: string;
    name: string;
    slug?: string | null;
    image: JsonNullValueInput | InputJsonValue;
    description: string;
    price: number;
    offerPrice?: number | null;
    images?: ProductCreateimagesInput | InputJsonValue[];
    active?: boolean;
    businessId: string;
    categoryId: string;
  };

  export type ProductCreateOrConnectWithoutOrderItemsInput = {
    where: ProductWhereUniqueInput;
    create: XOR<
      ProductCreateWithoutOrderItemsInput,
      ProductUncheckedCreateWithoutOrderItemsInput
    >;
  };

  export type OrderCreateWithoutItemsInput = {
    id?: string;
    productsDetails: JsonNullValueInput | InputJsonValue;
    total?: number;
    status?: $Enums.OrderStatus;
    sentAt?: Date | string | null;
    position?: number | null;
    identifier?: string | null;
    user?: UserCreateNestedOneWithoutOrdersInput;
    business?: BusinessCreateNestedOneWithoutOrdersInput;
  };

  export type OrderUncheckedCreateWithoutItemsInput = {
    id?: string;
    userId?: string | null;
    productsDetails: JsonNullValueInput | InputJsonValue;
    total?: number;
    status?: $Enums.OrderStatus;
    sentAt?: Date | string | null;
    position?: number | null;
    businessId?: string | null;
    identifier?: string | null;
  };

  export type OrderCreateOrConnectWithoutItemsInput = {
    where: OrderWhereUniqueInput;
    create: XOR<
      OrderCreateWithoutItemsInput,
      OrderUncheckedCreateWithoutItemsInput
    >;
  };

  export type ProductUpsertWithoutOrderItemsInput = {
    update: XOR<
      ProductUpdateWithoutOrderItemsInput,
      ProductUncheckedUpdateWithoutOrderItemsInput
    >;
    create: XOR<
      ProductCreateWithoutOrderItemsInput,
      ProductUncheckedCreateWithoutOrderItemsInput
    >;
    where?: ProductWhereInput;
  };

  export type ProductUpdateToOneWithWhereWithoutOrderItemsInput = {
    where?: ProductWhereInput;
    data: XOR<
      ProductUpdateWithoutOrderItemsInput,
      ProductUncheckedUpdateWithoutOrderItemsInput
    >;
  };

  export type ProductUpdateWithoutOrderItemsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    slug?: NullableStringFieldUpdateOperationsInput | string | null;
    image?: JsonNullValueInput | InputJsonValue;
    description?: StringFieldUpdateOperationsInput | string;
    price?: IntFieldUpdateOperationsInput | number;
    offerPrice?: NullableIntFieldUpdateOperationsInput | number | null;
    images?: ProductUpdateimagesInput | InputJsonValue[];
    active?: BoolFieldUpdateOperationsInput | boolean;
    business?: BusinessUpdateOneRequiredWithoutProductsNestedInput;
    category?: CategoryUpdateOneRequiredWithoutProductsNestedInput;
  };

  export type ProductUncheckedUpdateWithoutOrderItemsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    slug?: NullableStringFieldUpdateOperationsInput | string | null;
    image?: JsonNullValueInput | InputJsonValue;
    description?: StringFieldUpdateOperationsInput | string;
    price?: IntFieldUpdateOperationsInput | number;
    offerPrice?: NullableIntFieldUpdateOperationsInput | number | null;
    images?: ProductUpdateimagesInput | InputJsonValue[];
    active?: BoolFieldUpdateOperationsInput | boolean;
    businessId?: StringFieldUpdateOperationsInput | string;
    categoryId?: StringFieldUpdateOperationsInput | string;
  };

  export type OrderUpsertWithoutItemsInput = {
    update: XOR<
      OrderUpdateWithoutItemsInput,
      OrderUncheckedUpdateWithoutItemsInput
    >;
    create: XOR<
      OrderCreateWithoutItemsInput,
      OrderUncheckedCreateWithoutItemsInput
    >;
    where?: OrderWhereInput;
  };

  export type OrderUpdateToOneWithWhereWithoutItemsInput = {
    where?: OrderWhereInput;
    data: XOR<
      OrderUpdateWithoutItemsInput,
      OrderUncheckedUpdateWithoutItemsInput
    >;
  };

  export type OrderUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    productsDetails?: JsonNullValueInput | InputJsonValue;
    total?: IntFieldUpdateOperationsInput | number;
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    position?: NullableIntFieldUpdateOperationsInput | number | null;
    identifier?: NullableStringFieldUpdateOperationsInput | string | null;
    user?: UserUpdateOneWithoutOrdersNestedInput;
    business?: BusinessUpdateOneWithoutOrdersNestedInput;
  };

  export type OrderUncheckedUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: NullableStringFieldUpdateOperationsInput | string | null;
    productsDetails?: JsonNullValueInput | InputJsonValue;
    total?: IntFieldUpdateOperationsInput | number;
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    position?: NullableIntFieldUpdateOperationsInput | number | null;
    businessId?: NullableStringFieldUpdateOperationsInput | string | null;
    identifier?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type UserCreateWithoutAccountsInput = {
    id?: string;
    role?: $Enums.UserRoles;
    name?: string | null;
    phone?: string | null;
    email: string;
    emailVerified?: Date | string | null;
    image?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    orders?: OrderCreateNestedManyWithoutUserInput;
    sessions?: SessionCreateNestedManyWithoutUserInput;
    Authenticator?: AuthenticatorCreateNestedManyWithoutUserInput;
    business?: UserBusinessCreateNestedManyWithoutUserInput;
  };

  export type UserUncheckedCreateWithoutAccountsInput = {
    id?: string;
    role?: $Enums.UserRoles;
    name?: string | null;
    phone?: string | null;
    email: string;
    emailVerified?: Date | string | null;
    image?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    orders?: OrderUncheckedCreateNestedManyWithoutUserInput;
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput;
    Authenticator?: AuthenticatorUncheckedCreateNestedManyWithoutUserInput;
    business?: UserBusinessUncheckedCreateNestedManyWithoutUserInput;
  };

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutAccountsInput,
      UserUncheckedCreateWithoutAccountsInput
    >;
  };

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<
      UserUpdateWithoutAccountsInput,
      UserUncheckedUpdateWithoutAccountsInput
    >;
    create: XOR<
      UserCreateWithoutAccountsInput,
      UserUncheckedCreateWithoutAccountsInput
    >;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutAccountsInput = {
    where?: UserWhereInput;
    data: XOR<
      UserUpdateWithoutAccountsInput,
      UserUncheckedUpdateWithoutAccountsInput
    >;
  };

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    role?: EnumUserRolesFieldUpdateOperationsInput | $Enums.UserRoles;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: StringFieldUpdateOperationsInput | string;
    emailVerified?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    orders?: OrderUpdateManyWithoutUserNestedInput;
    sessions?: SessionUpdateManyWithoutUserNestedInput;
    Authenticator?: AuthenticatorUpdateManyWithoutUserNestedInput;
    business?: UserBusinessUpdateManyWithoutUserNestedInput;
  };

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    role?: EnumUserRolesFieldUpdateOperationsInput | $Enums.UserRoles;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: StringFieldUpdateOperationsInput | string;
    emailVerified?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    orders?: OrderUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput;
    Authenticator?: AuthenticatorUncheckedUpdateManyWithoutUserNestedInput;
    business?: UserBusinessUncheckedUpdateManyWithoutUserNestedInput;
  };

  export type UserCreateWithoutSessionsInput = {
    id?: string;
    role?: $Enums.UserRoles;
    name?: string | null;
    phone?: string | null;
    email: string;
    emailVerified?: Date | string | null;
    image?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    orders?: OrderCreateNestedManyWithoutUserInput;
    accounts?: AccountCreateNestedManyWithoutUserInput;
    Authenticator?: AuthenticatorCreateNestedManyWithoutUserInput;
    business?: UserBusinessCreateNestedManyWithoutUserInput;
  };

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string;
    role?: $Enums.UserRoles;
    name?: string | null;
    phone?: string | null;
    email: string;
    emailVerified?: Date | string | null;
    image?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    orders?: OrderUncheckedCreateNestedManyWithoutUserInput;
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput;
    Authenticator?: AuthenticatorUncheckedCreateNestedManyWithoutUserInput;
    business?: UserBusinessUncheckedCreateNestedManyWithoutUserInput;
  };

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutSessionsInput,
      UserUncheckedCreateWithoutSessionsInput
    >;
  };

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<
      UserUpdateWithoutSessionsInput,
      UserUncheckedUpdateWithoutSessionsInput
    >;
    create: XOR<
      UserCreateWithoutSessionsInput,
      UserUncheckedCreateWithoutSessionsInput
    >;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput;
    data: XOR<
      UserUpdateWithoutSessionsInput,
      UserUncheckedUpdateWithoutSessionsInput
    >;
  };

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    role?: EnumUserRolesFieldUpdateOperationsInput | $Enums.UserRoles;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: StringFieldUpdateOperationsInput | string;
    emailVerified?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    orders?: OrderUpdateManyWithoutUserNestedInput;
    accounts?: AccountUpdateManyWithoutUserNestedInput;
    Authenticator?: AuthenticatorUpdateManyWithoutUserNestedInput;
    business?: UserBusinessUpdateManyWithoutUserNestedInput;
  };

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    role?: EnumUserRolesFieldUpdateOperationsInput | $Enums.UserRoles;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: StringFieldUpdateOperationsInput | string;
    emailVerified?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    orders?: OrderUncheckedUpdateManyWithoutUserNestedInput;
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput;
    Authenticator?: AuthenticatorUncheckedUpdateManyWithoutUserNestedInput;
    business?: UserBusinessUncheckedUpdateManyWithoutUserNestedInput;
  };

  export type UserCreateWithoutAuthenticatorInput = {
    id?: string;
    role?: $Enums.UserRoles;
    name?: string | null;
    phone?: string | null;
    email: string;
    emailVerified?: Date | string | null;
    image?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    orders?: OrderCreateNestedManyWithoutUserInput;
    accounts?: AccountCreateNestedManyWithoutUserInput;
    sessions?: SessionCreateNestedManyWithoutUserInput;
    business?: UserBusinessCreateNestedManyWithoutUserInput;
  };

  export type UserUncheckedCreateWithoutAuthenticatorInput = {
    id?: string;
    role?: $Enums.UserRoles;
    name?: string | null;
    phone?: string | null;
    email: string;
    emailVerified?: Date | string | null;
    image?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    orders?: OrderUncheckedCreateNestedManyWithoutUserInput;
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput;
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput;
    business?: UserBusinessUncheckedCreateNestedManyWithoutUserInput;
  };

  export type UserCreateOrConnectWithoutAuthenticatorInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutAuthenticatorInput,
      UserUncheckedCreateWithoutAuthenticatorInput
    >;
  };

  export type UserUpsertWithoutAuthenticatorInput = {
    update: XOR<
      UserUpdateWithoutAuthenticatorInput,
      UserUncheckedUpdateWithoutAuthenticatorInput
    >;
    create: XOR<
      UserCreateWithoutAuthenticatorInput,
      UserUncheckedCreateWithoutAuthenticatorInput
    >;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutAuthenticatorInput = {
    where?: UserWhereInput;
    data: XOR<
      UserUpdateWithoutAuthenticatorInput,
      UserUncheckedUpdateWithoutAuthenticatorInput
    >;
  };

  export type UserUpdateWithoutAuthenticatorInput = {
    id?: StringFieldUpdateOperationsInput | string;
    role?: EnumUserRolesFieldUpdateOperationsInput | $Enums.UserRoles;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: StringFieldUpdateOperationsInput | string;
    emailVerified?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    orders?: OrderUpdateManyWithoutUserNestedInput;
    accounts?: AccountUpdateManyWithoutUserNestedInput;
    sessions?: SessionUpdateManyWithoutUserNestedInput;
    business?: UserBusinessUpdateManyWithoutUserNestedInput;
  };

  export type UserUncheckedUpdateWithoutAuthenticatorInput = {
    id?: StringFieldUpdateOperationsInput | string;
    role?: EnumUserRolesFieldUpdateOperationsInput | $Enums.UserRoles;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: StringFieldUpdateOperationsInput | string;
    emailVerified?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    orders?: OrderUncheckedUpdateManyWithoutUserNestedInput;
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput;
    business?: UserBusinessUncheckedUpdateManyWithoutUserNestedInput;
  };

  export type CategoryCreateManyBusinessInput = {
    id?: string;
    name: string;
    slug?: string | null;
  };

  export type ProductCreateManyBusinessInput = {
    id?: string;
    name: string;
    slug?: string | null;
    image: JsonNullValueInput | InputJsonValue;
    description: string;
    price: number;
    offerPrice?: number | null;
    images?: ProductCreateimagesInput | InputJsonValue[];
    active?: boolean;
    categoryId: string;
  };

  export type OrderCreateManyBusinessInput = {
    id?: string;
    userId?: string | null;
    productsDetails: JsonNullValueInput | InputJsonValue;
    total?: number;
    status?: $Enums.OrderStatus;
    sentAt?: Date | string | null;
    position?: number | null;
    identifier?: string | null;
  };

  export type UserBusinessCreateManyBusinessInput = {
    userId: string;
  };

  export type CategoryUpdateWithoutBusinessInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    slug?: NullableStringFieldUpdateOperationsInput | string | null;
    products?: ProductUpdateManyWithoutCategoryNestedInput;
  };

  export type CategoryUncheckedUpdateWithoutBusinessInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    slug?: NullableStringFieldUpdateOperationsInput | string | null;
    products?: ProductUncheckedUpdateManyWithoutCategoryNestedInput;
  };

  export type CategoryUncheckedUpdateManyWithoutBusinessInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    slug?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type ProductUpdateWithoutBusinessInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    slug?: NullableStringFieldUpdateOperationsInput | string | null;
    image?: JsonNullValueInput | InputJsonValue;
    description?: StringFieldUpdateOperationsInput | string;
    price?: IntFieldUpdateOperationsInput | number;
    offerPrice?: NullableIntFieldUpdateOperationsInput | number | null;
    images?: ProductUpdateimagesInput | InputJsonValue[];
    active?: BoolFieldUpdateOperationsInput | boolean;
    category?: CategoryUpdateOneRequiredWithoutProductsNestedInput;
    orderItems?: OrderProductUpdateManyWithoutProductNestedInput;
  };

  export type ProductUncheckedUpdateWithoutBusinessInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    slug?: NullableStringFieldUpdateOperationsInput | string | null;
    image?: JsonNullValueInput | InputJsonValue;
    description?: StringFieldUpdateOperationsInput | string;
    price?: IntFieldUpdateOperationsInput | number;
    offerPrice?: NullableIntFieldUpdateOperationsInput | number | null;
    images?: ProductUpdateimagesInput | InputJsonValue[];
    active?: BoolFieldUpdateOperationsInput | boolean;
    categoryId?: StringFieldUpdateOperationsInput | string;
    orderItems?: OrderProductUncheckedUpdateManyWithoutProductNestedInput;
  };

  export type ProductUncheckedUpdateManyWithoutBusinessInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    slug?: NullableStringFieldUpdateOperationsInput | string | null;
    image?: JsonNullValueInput | InputJsonValue;
    description?: StringFieldUpdateOperationsInput | string;
    price?: IntFieldUpdateOperationsInput | number;
    offerPrice?: NullableIntFieldUpdateOperationsInput | number | null;
    images?: ProductUpdateimagesInput | InputJsonValue[];
    active?: BoolFieldUpdateOperationsInput | boolean;
    categoryId?: StringFieldUpdateOperationsInput | string;
  };

  export type OrderUpdateWithoutBusinessInput = {
    id?: StringFieldUpdateOperationsInput | string;
    productsDetails?: JsonNullValueInput | InputJsonValue;
    total?: IntFieldUpdateOperationsInput | number;
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    position?: NullableIntFieldUpdateOperationsInput | number | null;
    identifier?: NullableStringFieldUpdateOperationsInput | string | null;
    user?: UserUpdateOneWithoutOrdersNestedInput;
    items?: OrderProductUpdateManyWithoutOrderNestedInput;
  };

  export type OrderUncheckedUpdateWithoutBusinessInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: NullableStringFieldUpdateOperationsInput | string | null;
    productsDetails?: JsonNullValueInput | InputJsonValue;
    total?: IntFieldUpdateOperationsInput | number;
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    position?: NullableIntFieldUpdateOperationsInput | number | null;
    identifier?: NullableStringFieldUpdateOperationsInput | string | null;
    items?: OrderProductUncheckedUpdateManyWithoutOrderNestedInput;
  };

  export type OrderUncheckedUpdateManyWithoutBusinessInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: NullableStringFieldUpdateOperationsInput | string | null;
    productsDetails?: JsonNullValueInput | InputJsonValue;
    total?: IntFieldUpdateOperationsInput | number;
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    position?: NullableIntFieldUpdateOperationsInput | number | null;
    identifier?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type UserBusinessUpdateWithoutBusinessInput = {
    user?: UserUpdateOneRequiredWithoutBusinessNestedInput;
  };

  export type UserBusinessUncheckedUpdateWithoutBusinessInput = {
    userId?: StringFieldUpdateOperationsInput | string;
  };

  export type UserBusinessUncheckedUpdateManyWithoutBusinessInput = {
    userId?: StringFieldUpdateOperationsInput | string;
  };

  export type ProductCreateManyCategoryInput = {
    id?: string;
    name: string;
    slug?: string | null;
    image: JsonNullValueInput | InputJsonValue;
    description: string;
    price: number;
    offerPrice?: number | null;
    images?: ProductCreateimagesInput | InputJsonValue[];
    active?: boolean;
    businessId: string;
  };

  export type ProductUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    slug?: NullableStringFieldUpdateOperationsInput | string | null;
    image?: JsonNullValueInput | InputJsonValue;
    description?: StringFieldUpdateOperationsInput | string;
    price?: IntFieldUpdateOperationsInput | number;
    offerPrice?: NullableIntFieldUpdateOperationsInput | number | null;
    images?: ProductUpdateimagesInput | InputJsonValue[];
    active?: BoolFieldUpdateOperationsInput | boolean;
    business?: BusinessUpdateOneRequiredWithoutProductsNestedInput;
    orderItems?: OrderProductUpdateManyWithoutProductNestedInput;
  };

  export type ProductUncheckedUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    slug?: NullableStringFieldUpdateOperationsInput | string | null;
    image?: JsonNullValueInput | InputJsonValue;
    description?: StringFieldUpdateOperationsInput | string;
    price?: IntFieldUpdateOperationsInput | number;
    offerPrice?: NullableIntFieldUpdateOperationsInput | number | null;
    images?: ProductUpdateimagesInput | InputJsonValue[];
    active?: BoolFieldUpdateOperationsInput | boolean;
    businessId?: StringFieldUpdateOperationsInput | string;
    orderItems?: OrderProductUncheckedUpdateManyWithoutProductNestedInput;
  };

  export type ProductUncheckedUpdateManyWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    slug?: NullableStringFieldUpdateOperationsInput | string | null;
    image?: JsonNullValueInput | InputJsonValue;
    description?: StringFieldUpdateOperationsInput | string;
    price?: IntFieldUpdateOperationsInput | number;
    offerPrice?: NullableIntFieldUpdateOperationsInput | number | null;
    images?: ProductUpdateimagesInput | InputJsonValue[];
    active?: BoolFieldUpdateOperationsInput | boolean;
    businessId?: StringFieldUpdateOperationsInput | string;
  };

  export type OrderProductCreateManyProductInput = {
    orderId: string;
    price: number;
    position?: number;
    quantity: number;
  };

  export type OrderProductUpdateWithoutProductInput = {
    price?: IntFieldUpdateOperationsInput | number;
    position?: IntFieldUpdateOperationsInput | number;
    quantity?: IntFieldUpdateOperationsInput | number;
    order?: OrderUpdateOneRequiredWithoutItemsNestedInput;
  };

  export type OrderProductUncheckedUpdateWithoutProductInput = {
    orderId?: StringFieldUpdateOperationsInput | string;
    price?: IntFieldUpdateOperationsInput | number;
    position?: IntFieldUpdateOperationsInput | number;
    quantity?: IntFieldUpdateOperationsInput | number;
  };

  export type OrderProductUncheckedUpdateManyWithoutProductInput = {
    orderId?: StringFieldUpdateOperationsInput | string;
    price?: IntFieldUpdateOperationsInput | number;
    position?: IntFieldUpdateOperationsInput | number;
    quantity?: IntFieldUpdateOperationsInput | number;
  };

  export type OrderCreateManyUserInput = {
    id?: string;
    productsDetails: JsonNullValueInput | InputJsonValue;
    total?: number;
    status?: $Enums.OrderStatus;
    sentAt?: Date | string | null;
    position?: number | null;
    businessId?: string | null;
    identifier?: string | null;
  };

  export type AccountCreateManyUserInput = {
    type: string;
    provider: string;
    providerAccountId: string;
    refresh_token?: string | null;
    access_token?: string | null;
    expires_at?: number | null;
    token_type?: string | null;
    scope?: string | null;
    id_token?: string | null;
    session_state?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type SessionCreateManyUserInput = {
    sessionToken: string;
    expires: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type AuthenticatorCreateManyUserInput = {
    credentialID: string;
    providerAccountId: string;
    credentialPublicKey: string;
    counter: number;
    credentialDeviceType: string;
    credentialBackedUp: boolean;
    transports?: string | null;
  };

  export type UserBusinessCreateManyUserInput = {
    businessId: string;
  };

  export type OrderUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    productsDetails?: JsonNullValueInput | InputJsonValue;
    total?: IntFieldUpdateOperationsInput | number;
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    position?: NullableIntFieldUpdateOperationsInput | number | null;
    identifier?: NullableStringFieldUpdateOperationsInput | string | null;
    items?: OrderProductUpdateManyWithoutOrderNestedInput;
    business?: BusinessUpdateOneWithoutOrdersNestedInput;
  };

  export type OrderUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    productsDetails?: JsonNullValueInput | InputJsonValue;
    total?: IntFieldUpdateOperationsInput | number;
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    position?: NullableIntFieldUpdateOperationsInput | number | null;
    businessId?: NullableStringFieldUpdateOperationsInput | string | null;
    identifier?: NullableStringFieldUpdateOperationsInput | string | null;
    items?: OrderProductUncheckedUpdateManyWithoutOrderNestedInput;
  };

  export type OrderUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    productsDetails?: JsonNullValueInput | InputJsonValue;
    total?: IntFieldUpdateOperationsInput | number;
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    position?: NullableIntFieldUpdateOperationsInput | number | null;
    businessId?: NullableStringFieldUpdateOperationsInput | string | null;
    identifier?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type AccountUpdateWithoutUserInput = {
    type?: StringFieldUpdateOperationsInput | string;
    provider?: StringFieldUpdateOperationsInput | string;
    providerAccountId?: StringFieldUpdateOperationsInput | string;
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null;
    access_token?: NullableStringFieldUpdateOperationsInput | string | null;
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null;
    token_type?: NullableStringFieldUpdateOperationsInput | string | null;
    scope?: NullableStringFieldUpdateOperationsInput | string | null;
    id_token?: NullableStringFieldUpdateOperationsInput | string | null;
    session_state?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AccountUncheckedUpdateWithoutUserInput = {
    type?: StringFieldUpdateOperationsInput | string;
    provider?: StringFieldUpdateOperationsInput | string;
    providerAccountId?: StringFieldUpdateOperationsInput | string;
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null;
    access_token?: NullableStringFieldUpdateOperationsInput | string | null;
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null;
    token_type?: NullableStringFieldUpdateOperationsInput | string | null;
    scope?: NullableStringFieldUpdateOperationsInput | string | null;
    id_token?: NullableStringFieldUpdateOperationsInput | string | null;
    session_state?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AccountUncheckedUpdateManyWithoutUserInput = {
    type?: StringFieldUpdateOperationsInput | string;
    provider?: StringFieldUpdateOperationsInput | string;
    providerAccountId?: StringFieldUpdateOperationsInput | string;
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null;
    access_token?: NullableStringFieldUpdateOperationsInput | string | null;
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null;
    token_type?: NullableStringFieldUpdateOperationsInput | string | null;
    scope?: NullableStringFieldUpdateOperationsInput | string | null;
    id_token?: NullableStringFieldUpdateOperationsInput | string | null;
    session_state?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SessionUpdateWithoutUserInput = {
    sessionToken?: StringFieldUpdateOperationsInput | string;
    expires?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SessionUncheckedUpdateWithoutUserInput = {
    sessionToken?: StringFieldUpdateOperationsInput | string;
    expires?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    sessionToken?: StringFieldUpdateOperationsInput | string;
    expires?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AuthenticatorUpdateWithoutUserInput = {
    credentialID?: StringFieldUpdateOperationsInput | string;
    providerAccountId?: StringFieldUpdateOperationsInput | string;
    credentialPublicKey?: StringFieldUpdateOperationsInput | string;
    counter?: IntFieldUpdateOperationsInput | number;
    credentialDeviceType?: StringFieldUpdateOperationsInput | string;
    credentialBackedUp?: BoolFieldUpdateOperationsInput | boolean;
    transports?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type AuthenticatorUncheckedUpdateWithoutUserInput = {
    credentialID?: StringFieldUpdateOperationsInput | string;
    providerAccountId?: StringFieldUpdateOperationsInput | string;
    credentialPublicKey?: StringFieldUpdateOperationsInput | string;
    counter?: IntFieldUpdateOperationsInput | number;
    credentialDeviceType?: StringFieldUpdateOperationsInput | string;
    credentialBackedUp?: BoolFieldUpdateOperationsInput | boolean;
    transports?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type AuthenticatorUncheckedUpdateManyWithoutUserInput = {
    credentialID?: StringFieldUpdateOperationsInput | string;
    providerAccountId?: StringFieldUpdateOperationsInput | string;
    credentialPublicKey?: StringFieldUpdateOperationsInput | string;
    counter?: IntFieldUpdateOperationsInput | number;
    credentialDeviceType?: StringFieldUpdateOperationsInput | string;
    credentialBackedUp?: BoolFieldUpdateOperationsInput | boolean;
    transports?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type UserBusinessUpdateWithoutUserInput = {
    business?: BusinessUpdateOneRequiredWithoutUsersNestedInput;
  };

  export type UserBusinessUncheckedUpdateWithoutUserInput = {
    businessId?: StringFieldUpdateOperationsInput | string;
  };

  export type UserBusinessUncheckedUpdateManyWithoutUserInput = {
    businessId?: StringFieldUpdateOperationsInput | string;
  };

  export type OrderProductCreateManyOrderInput = {
    productId: string;
    price: number;
    position?: number;
    quantity: number;
  };

  export type OrderProductUpdateWithoutOrderInput = {
    price?: IntFieldUpdateOperationsInput | number;
    position?: IntFieldUpdateOperationsInput | number;
    quantity?: IntFieldUpdateOperationsInput | number;
    product?: ProductUpdateOneRequiredWithoutOrderItemsNestedInput;
  };

  export type OrderProductUncheckedUpdateWithoutOrderInput = {
    productId?: StringFieldUpdateOperationsInput | string;
    price?: IntFieldUpdateOperationsInput | number;
    position?: IntFieldUpdateOperationsInput | number;
    quantity?: IntFieldUpdateOperationsInput | number;
  };

  export type OrderProductUncheckedUpdateManyWithoutOrderInput = {
    productId?: StringFieldUpdateOperationsInput | string;
    price?: IntFieldUpdateOperationsInput | number;
    position?: IntFieldUpdateOperationsInput | number;
    quantity?: IntFieldUpdateOperationsInput | number;
  };

  /**
   * Aliases for legacy arg types
   */
  /**
   * @deprecated Use BusinessCountOutputTypeDefaultArgs instead
   */
  export type BusinessCountOutputTypeArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = BusinessCountOutputTypeDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use CategoryCountOutputTypeDefaultArgs instead
   */
  export type CategoryCountOutputTypeArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = CategoryCountOutputTypeDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use ProductCountOutputTypeDefaultArgs instead
   */
  export type ProductCountOutputTypeArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = ProductCountOutputTypeDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use UserCountOutputTypeDefaultArgs instead
   */
  export type UserCountOutputTypeArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = UserCountOutputTypeDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use OrderCountOutputTypeDefaultArgs instead
   */
  export type OrderCountOutputTypeArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = OrderCountOutputTypeDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use BusinessDefaultArgs instead
   */
  export type BusinessArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = BusinessDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use CategoryDefaultArgs instead
   */
  export type CategoryArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = CategoryDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use ProductDefaultArgs instead
   */
  export type ProductArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = ProductDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use UserDefaultArgs instead
   */
  export type UserArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = UserDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use UserBusinessDefaultArgs instead
   */
  export type UserBusinessArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = UserBusinessDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use OrderDefaultArgs instead
   */
  export type OrderArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = OrderDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use OrderProductDefaultArgs instead
   */
  export type OrderProductArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = OrderProductDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use AccountDefaultArgs instead
   */
  export type AccountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = AccountDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use SessionDefaultArgs instead
   */
  export type SessionArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = SessionDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use VerificationTokenDefaultArgs instead
   */
  export type VerificationTokenArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = VerificationTokenDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use AuthenticatorDefaultArgs instead
   */
  export type AuthenticatorArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = AuthenticatorDefaultArgs<ExtArgs>;

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number;
  };

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF;
}
