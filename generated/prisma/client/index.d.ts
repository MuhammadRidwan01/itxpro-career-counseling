
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Siswa
 * 
 */
export type Siswa = $Result.DefaultSelection<Prisma.$SiswaPayload>
/**
 * Model HasilKonseling
 * 
 */
export type HasilKonseling = $Result.DefaultSelection<Prisma.$HasilKonselingPayload>
/**
 * Model TujuanKarir
 * 
 */
export type TujuanKarir = $Result.DefaultSelection<Prisma.$TujuanKarirPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  ADMIN: 'ADMIN',
  STUDENT: 'STUDENT'
};

export type Role = (typeof Role)[keyof typeof Role]


export const Status: {
  AKTIF: 'AKTIF',
  ALUMNI: 'ALUMNI',
  PINDAH: 'PINDAH',
  TINGGAL_KELAS: 'TINGGAL_KELAS'
};

export type Status = (typeof Status)[keyof typeof Status]


export const StatusKonseling: {
  SUDAH: 'SUDAH',
  BELUM: 'BELUM',
  PROSES: 'PROSES'
};

export type StatusKonseling = (typeof StatusKonseling)[keyof typeof StatusKonseling]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type Status = $Enums.Status

export const Status: typeof $Enums.Status

export type StatusKonseling = $Enums.StatusKonseling

export const StatusKonseling: typeof $Enums.StatusKonseling

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

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
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

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
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

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
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


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
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.siswa`: Exposes CRUD operations for the **Siswa** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Siswas
    * const siswas = await prisma.siswa.findMany()
    * ```
    */
  get siswa(): Prisma.SiswaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.hasilKonseling`: Exposes CRUD operations for the **HasilKonseling** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more HasilKonselings
    * const hasilKonselings = await prisma.hasilKonseling.findMany()
    * ```
    */
  get hasilKonseling(): Prisma.HasilKonselingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tujuanKarir`: Exposes CRUD operations for the **TujuanKarir** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TujuanKarirs
    * const tujuanKarirs = await prisma.tujuanKarir.findMany()
    * ```
    */
  get tujuanKarir(): Prisma.TujuanKarirDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.13.0
   * Query Engine version: 361e86d0ea4987e9f53a565309b3eed797a6bcbd
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

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
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

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
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
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
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Siswa: 'Siswa',
    HasilKonseling: 'HasilKonseling',
    TujuanKarir: 'TujuanKarir'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "siswa" | "hasilKonseling" | "tujuanKarir"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Siswa: {
        payload: Prisma.$SiswaPayload<ExtArgs>
        fields: Prisma.SiswaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SiswaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiswaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SiswaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiswaPayload>
          }
          findFirst: {
            args: Prisma.SiswaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiswaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SiswaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiswaPayload>
          }
          findMany: {
            args: Prisma.SiswaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiswaPayload>[]
          }
          create: {
            args: Prisma.SiswaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiswaPayload>
          }
          createMany: {
            args: Prisma.SiswaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SiswaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiswaPayload>[]
          }
          delete: {
            args: Prisma.SiswaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiswaPayload>
          }
          update: {
            args: Prisma.SiswaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiswaPayload>
          }
          deleteMany: {
            args: Prisma.SiswaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SiswaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SiswaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiswaPayload>[]
          }
          upsert: {
            args: Prisma.SiswaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiswaPayload>
          }
          aggregate: {
            args: Prisma.SiswaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSiswa>
          }
          groupBy: {
            args: Prisma.SiswaGroupByArgs<ExtArgs>
            result: $Utils.Optional<SiswaGroupByOutputType>[]
          }
          count: {
            args: Prisma.SiswaCountArgs<ExtArgs>
            result: $Utils.Optional<SiswaCountAggregateOutputType> | number
          }
        }
      }
      HasilKonseling: {
        payload: Prisma.$HasilKonselingPayload<ExtArgs>
        fields: Prisma.HasilKonselingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HasilKonselingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HasilKonselingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HasilKonselingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HasilKonselingPayload>
          }
          findFirst: {
            args: Prisma.HasilKonselingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HasilKonselingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HasilKonselingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HasilKonselingPayload>
          }
          findMany: {
            args: Prisma.HasilKonselingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HasilKonselingPayload>[]
          }
          create: {
            args: Prisma.HasilKonselingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HasilKonselingPayload>
          }
          createMany: {
            args: Prisma.HasilKonselingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.HasilKonselingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HasilKonselingPayload>[]
          }
          delete: {
            args: Prisma.HasilKonselingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HasilKonselingPayload>
          }
          update: {
            args: Prisma.HasilKonselingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HasilKonselingPayload>
          }
          deleteMany: {
            args: Prisma.HasilKonselingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HasilKonselingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.HasilKonselingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HasilKonselingPayload>[]
          }
          upsert: {
            args: Prisma.HasilKonselingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HasilKonselingPayload>
          }
          aggregate: {
            args: Prisma.HasilKonselingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHasilKonseling>
          }
          groupBy: {
            args: Prisma.HasilKonselingGroupByArgs<ExtArgs>
            result: $Utils.Optional<HasilKonselingGroupByOutputType>[]
          }
          count: {
            args: Prisma.HasilKonselingCountArgs<ExtArgs>
            result: $Utils.Optional<HasilKonselingCountAggregateOutputType> | number
          }
        }
      }
      TujuanKarir: {
        payload: Prisma.$TujuanKarirPayload<ExtArgs>
        fields: Prisma.TujuanKarirFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TujuanKarirFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TujuanKarirPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TujuanKarirFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TujuanKarirPayload>
          }
          findFirst: {
            args: Prisma.TujuanKarirFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TujuanKarirPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TujuanKarirFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TujuanKarirPayload>
          }
          findMany: {
            args: Prisma.TujuanKarirFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TujuanKarirPayload>[]
          }
          create: {
            args: Prisma.TujuanKarirCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TujuanKarirPayload>
          }
          createMany: {
            args: Prisma.TujuanKarirCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TujuanKarirCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TujuanKarirPayload>[]
          }
          delete: {
            args: Prisma.TujuanKarirDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TujuanKarirPayload>
          }
          update: {
            args: Prisma.TujuanKarirUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TujuanKarirPayload>
          }
          deleteMany: {
            args: Prisma.TujuanKarirDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TujuanKarirUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TujuanKarirUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TujuanKarirPayload>[]
          }
          upsert: {
            args: Prisma.TujuanKarirUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TujuanKarirPayload>
          }
          aggregate: {
            args: Prisma.TujuanKarirAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTujuanKarir>
          }
          groupBy: {
            args: Prisma.TujuanKarirGroupByArgs<ExtArgs>
            result: $Utils.Optional<TujuanKarirGroupByOutputType>[]
          }
          count: {
            args: Prisma.TujuanKarirCountArgs<ExtArgs>
            result: $Utils.Optional<TujuanKarirCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    siswa?: SiswaOmit
    hasilKonseling?: HasilKonselingOmit
    tujuanKarir?: TujuanKarirOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type SiswaCountOutputType
   */

  export type SiswaCountOutputType = {
    hasilKonseling: number
  }

  export type SiswaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    hasilKonseling?: boolean | SiswaCountOutputTypeCountHasilKonselingArgs
  }

  // Custom InputTypes
  /**
   * SiswaCountOutputType without action
   */
  export type SiswaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiswaCountOutputType
     */
    select?: SiswaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SiswaCountOutputType without action
   */
  export type SiswaCountOutputTypeCountHasilKonselingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HasilKonselingWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    role: $Enums.Role | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    role: $Enums.Role | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    role: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    password: string
    role: $Enums.Role
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    siswa?: boolean | User$siswaArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "role" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    siswa?: boolean | User$siswaArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      siswa: Prisma.$SiswaPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      role: $Enums.Role
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
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
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

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
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

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
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

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
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

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
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

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
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

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
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

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
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


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
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

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
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
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
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
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
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    siswa<T extends User$siswaArgs<ExtArgs> = {}>(args?: Subset<T, User$siswaArgs<ExtArgs>>): Prisma__SiswaClient<$Result.GetResult<Prisma.$SiswaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.siswa
   */
  export type User$siswaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Siswa
     */
    select?: SiswaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Siswa
     */
    omit?: SiswaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiswaInclude<ExtArgs> | null
    where?: SiswaWhereInput
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Siswa
   */

  export type AggregateSiswa = {
    _count: SiswaCountAggregateOutputType | null
    _avg: SiswaAvgAggregateOutputType | null
    _sum: SiswaSumAggregateOutputType | null
    _min: SiswaMinAggregateOutputType | null
    _max: SiswaMaxAggregateOutputType | null
  }

  export type SiswaAvgAggregateOutputType = {
    angkatan: number | null
    tahunLulusTarget: number | null
  }

  export type SiswaSumAggregateOutputType = {
    angkatan: number | null
    tahunLulusTarget: number | null
  }

  export type SiswaMinAggregateOutputType = {
    nis: string | null
    nama: string | null
    email: string | null
    kelasSaatIni: string | null
    angkatan: number | null
    jurusan: string | null
    status: $Enums.Status | null
    tahunLulusTarget: number | null
    tujuanKarirSubmitted: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SiswaMaxAggregateOutputType = {
    nis: string | null
    nama: string | null
    email: string | null
    kelasSaatIni: string | null
    angkatan: number | null
    jurusan: string | null
    status: $Enums.Status | null
    tahunLulusTarget: number | null
    tujuanKarirSubmitted: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SiswaCountAggregateOutputType = {
    nis: number
    nama: number
    email: number
    kelasSaatIni: number
    angkatan: number
    jurusan: number
    status: number
    tahunLulusTarget: number
    tujuanKarirSubmitted: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SiswaAvgAggregateInputType = {
    angkatan?: true
    tahunLulusTarget?: true
  }

  export type SiswaSumAggregateInputType = {
    angkatan?: true
    tahunLulusTarget?: true
  }

  export type SiswaMinAggregateInputType = {
    nis?: true
    nama?: true
    email?: true
    kelasSaatIni?: true
    angkatan?: true
    jurusan?: true
    status?: true
    tahunLulusTarget?: true
    tujuanKarirSubmitted?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SiswaMaxAggregateInputType = {
    nis?: true
    nama?: true
    email?: true
    kelasSaatIni?: true
    angkatan?: true
    jurusan?: true
    status?: true
    tahunLulusTarget?: true
    tujuanKarirSubmitted?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SiswaCountAggregateInputType = {
    nis?: true
    nama?: true
    email?: true
    kelasSaatIni?: true
    angkatan?: true
    jurusan?: true
    status?: true
    tahunLulusTarget?: true
    tujuanKarirSubmitted?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SiswaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Siswa to aggregate.
     */
    where?: SiswaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Siswas to fetch.
     */
    orderBy?: SiswaOrderByWithRelationInput | SiswaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SiswaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Siswas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Siswas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Siswas
    **/
    _count?: true | SiswaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SiswaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SiswaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SiswaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SiswaMaxAggregateInputType
  }

  export type GetSiswaAggregateType<T extends SiswaAggregateArgs> = {
        [P in keyof T & keyof AggregateSiswa]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSiswa[P]>
      : GetScalarType<T[P], AggregateSiswa[P]>
  }




  export type SiswaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SiswaWhereInput
    orderBy?: SiswaOrderByWithAggregationInput | SiswaOrderByWithAggregationInput[]
    by: SiswaScalarFieldEnum[] | SiswaScalarFieldEnum
    having?: SiswaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SiswaCountAggregateInputType | true
    _avg?: SiswaAvgAggregateInputType
    _sum?: SiswaSumAggregateInputType
    _min?: SiswaMinAggregateInputType
    _max?: SiswaMaxAggregateInputType
  }

  export type SiswaGroupByOutputType = {
    nis: string
    nama: string
    email: string | null
    kelasSaatIni: string | null
    angkatan: number
    jurusan: string | null
    status: $Enums.Status
    tahunLulusTarget: number | null
    tujuanKarirSubmitted: boolean
    createdAt: Date
    updatedAt: Date
    _count: SiswaCountAggregateOutputType | null
    _avg: SiswaAvgAggregateOutputType | null
    _sum: SiswaSumAggregateOutputType | null
    _min: SiswaMinAggregateOutputType | null
    _max: SiswaMaxAggregateOutputType | null
  }

  type GetSiswaGroupByPayload<T extends SiswaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SiswaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SiswaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SiswaGroupByOutputType[P]>
            : GetScalarType<T[P], SiswaGroupByOutputType[P]>
        }
      >
    >


  export type SiswaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    nis?: boolean
    nama?: boolean
    email?: boolean
    kelasSaatIni?: boolean
    angkatan?: boolean
    jurusan?: boolean
    status?: boolean
    tahunLulusTarget?: boolean
    tujuanKarirSubmitted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    hasilKonseling?: boolean | Siswa$hasilKonselingArgs<ExtArgs>
    user?: boolean | Siswa$userArgs<ExtArgs>
    tujuanKarir?: boolean | Siswa$tujuanKarirArgs<ExtArgs>
    _count?: boolean | SiswaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["siswa"]>

  export type SiswaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    nis?: boolean
    nama?: boolean
    email?: boolean
    kelasSaatIni?: boolean
    angkatan?: boolean
    jurusan?: boolean
    status?: boolean
    tahunLulusTarget?: boolean
    tujuanKarirSubmitted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | Siswa$userArgs<ExtArgs>
  }, ExtArgs["result"]["siswa"]>

  export type SiswaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    nis?: boolean
    nama?: boolean
    email?: boolean
    kelasSaatIni?: boolean
    angkatan?: boolean
    jurusan?: boolean
    status?: boolean
    tahunLulusTarget?: boolean
    tujuanKarirSubmitted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | Siswa$userArgs<ExtArgs>
  }, ExtArgs["result"]["siswa"]>

  export type SiswaSelectScalar = {
    nis?: boolean
    nama?: boolean
    email?: boolean
    kelasSaatIni?: boolean
    angkatan?: boolean
    jurusan?: boolean
    status?: boolean
    tahunLulusTarget?: boolean
    tujuanKarirSubmitted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SiswaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"nis" | "nama" | "email" | "kelasSaatIni" | "angkatan" | "jurusan" | "status" | "tahunLulusTarget" | "tujuanKarirSubmitted" | "createdAt" | "updatedAt", ExtArgs["result"]["siswa"]>
  export type SiswaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    hasilKonseling?: boolean | Siswa$hasilKonselingArgs<ExtArgs>
    user?: boolean | Siswa$userArgs<ExtArgs>
    tujuanKarir?: boolean | Siswa$tujuanKarirArgs<ExtArgs>
    _count?: boolean | SiswaCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SiswaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Siswa$userArgs<ExtArgs>
  }
  export type SiswaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Siswa$userArgs<ExtArgs>
  }

  export type $SiswaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Siswa"
    objects: {
      hasilKonseling: Prisma.$HasilKonselingPayload<ExtArgs>[]
      user: Prisma.$UserPayload<ExtArgs> | null
      tujuanKarir: Prisma.$TujuanKarirPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      nis: string
      nama: string
      email: string | null
      kelasSaatIni: string | null
      angkatan: number
      jurusan: string | null
      status: $Enums.Status
      tahunLulusTarget: number | null
      tujuanKarirSubmitted: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["siswa"]>
    composites: {}
  }

  type SiswaGetPayload<S extends boolean | null | undefined | SiswaDefaultArgs> = $Result.GetResult<Prisma.$SiswaPayload, S>

  type SiswaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SiswaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SiswaCountAggregateInputType | true
    }

  export interface SiswaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Siswa'], meta: { name: 'Siswa' } }
    /**
     * Find zero or one Siswa that matches the filter.
     * @param {SiswaFindUniqueArgs} args - Arguments to find a Siswa
     * @example
     * // Get one Siswa
     * const siswa = await prisma.siswa.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SiswaFindUniqueArgs>(args: SelectSubset<T, SiswaFindUniqueArgs<ExtArgs>>): Prisma__SiswaClient<$Result.GetResult<Prisma.$SiswaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Siswa that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SiswaFindUniqueOrThrowArgs} args - Arguments to find a Siswa
     * @example
     * // Get one Siswa
     * const siswa = await prisma.siswa.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SiswaFindUniqueOrThrowArgs>(args: SelectSubset<T, SiswaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SiswaClient<$Result.GetResult<Prisma.$SiswaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Siswa that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiswaFindFirstArgs} args - Arguments to find a Siswa
     * @example
     * // Get one Siswa
     * const siswa = await prisma.siswa.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SiswaFindFirstArgs>(args?: SelectSubset<T, SiswaFindFirstArgs<ExtArgs>>): Prisma__SiswaClient<$Result.GetResult<Prisma.$SiswaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Siswa that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiswaFindFirstOrThrowArgs} args - Arguments to find a Siswa
     * @example
     * // Get one Siswa
     * const siswa = await prisma.siswa.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SiswaFindFirstOrThrowArgs>(args?: SelectSubset<T, SiswaFindFirstOrThrowArgs<ExtArgs>>): Prisma__SiswaClient<$Result.GetResult<Prisma.$SiswaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Siswas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiswaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Siswas
     * const siswas = await prisma.siswa.findMany()
     * 
     * // Get first 10 Siswas
     * const siswas = await prisma.siswa.findMany({ take: 10 })
     * 
     * // Only select the `nis`
     * const siswaWithNisOnly = await prisma.siswa.findMany({ select: { nis: true } })
     * 
     */
    findMany<T extends SiswaFindManyArgs>(args?: SelectSubset<T, SiswaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SiswaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Siswa.
     * @param {SiswaCreateArgs} args - Arguments to create a Siswa.
     * @example
     * // Create one Siswa
     * const Siswa = await prisma.siswa.create({
     *   data: {
     *     // ... data to create a Siswa
     *   }
     * })
     * 
     */
    create<T extends SiswaCreateArgs>(args: SelectSubset<T, SiswaCreateArgs<ExtArgs>>): Prisma__SiswaClient<$Result.GetResult<Prisma.$SiswaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Siswas.
     * @param {SiswaCreateManyArgs} args - Arguments to create many Siswas.
     * @example
     * // Create many Siswas
     * const siswa = await prisma.siswa.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SiswaCreateManyArgs>(args?: SelectSubset<T, SiswaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Siswas and returns the data saved in the database.
     * @param {SiswaCreateManyAndReturnArgs} args - Arguments to create many Siswas.
     * @example
     * // Create many Siswas
     * const siswa = await prisma.siswa.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Siswas and only return the `nis`
     * const siswaWithNisOnly = await prisma.siswa.createManyAndReturn({
     *   select: { nis: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SiswaCreateManyAndReturnArgs>(args?: SelectSubset<T, SiswaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SiswaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Siswa.
     * @param {SiswaDeleteArgs} args - Arguments to delete one Siswa.
     * @example
     * // Delete one Siswa
     * const Siswa = await prisma.siswa.delete({
     *   where: {
     *     // ... filter to delete one Siswa
     *   }
     * })
     * 
     */
    delete<T extends SiswaDeleteArgs>(args: SelectSubset<T, SiswaDeleteArgs<ExtArgs>>): Prisma__SiswaClient<$Result.GetResult<Prisma.$SiswaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Siswa.
     * @param {SiswaUpdateArgs} args - Arguments to update one Siswa.
     * @example
     * // Update one Siswa
     * const siswa = await prisma.siswa.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SiswaUpdateArgs>(args: SelectSubset<T, SiswaUpdateArgs<ExtArgs>>): Prisma__SiswaClient<$Result.GetResult<Prisma.$SiswaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Siswas.
     * @param {SiswaDeleteManyArgs} args - Arguments to filter Siswas to delete.
     * @example
     * // Delete a few Siswas
     * const { count } = await prisma.siswa.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SiswaDeleteManyArgs>(args?: SelectSubset<T, SiswaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Siswas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiswaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Siswas
     * const siswa = await prisma.siswa.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SiswaUpdateManyArgs>(args: SelectSubset<T, SiswaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Siswas and returns the data updated in the database.
     * @param {SiswaUpdateManyAndReturnArgs} args - Arguments to update many Siswas.
     * @example
     * // Update many Siswas
     * const siswa = await prisma.siswa.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Siswas and only return the `nis`
     * const siswaWithNisOnly = await prisma.siswa.updateManyAndReturn({
     *   select: { nis: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SiswaUpdateManyAndReturnArgs>(args: SelectSubset<T, SiswaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SiswaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Siswa.
     * @param {SiswaUpsertArgs} args - Arguments to update or create a Siswa.
     * @example
     * // Update or create a Siswa
     * const siswa = await prisma.siswa.upsert({
     *   create: {
     *     // ... data to create a Siswa
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Siswa we want to update
     *   }
     * })
     */
    upsert<T extends SiswaUpsertArgs>(args: SelectSubset<T, SiswaUpsertArgs<ExtArgs>>): Prisma__SiswaClient<$Result.GetResult<Prisma.$SiswaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Siswas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiswaCountArgs} args - Arguments to filter Siswas to count.
     * @example
     * // Count the number of Siswas
     * const count = await prisma.siswa.count({
     *   where: {
     *     // ... the filter for the Siswas we want to count
     *   }
     * })
    **/
    count<T extends SiswaCountArgs>(
      args?: Subset<T, SiswaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SiswaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Siswa.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiswaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SiswaAggregateArgs>(args: Subset<T, SiswaAggregateArgs>): Prisma.PrismaPromise<GetSiswaAggregateType<T>>

    /**
     * Group by Siswa.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiswaGroupByArgs} args - Group by arguments.
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
      T extends SiswaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SiswaGroupByArgs['orderBy'] }
        : { orderBy?: SiswaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
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
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SiswaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSiswaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Siswa model
   */
  readonly fields: SiswaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Siswa.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SiswaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    hasilKonseling<T extends Siswa$hasilKonselingArgs<ExtArgs> = {}>(args?: Subset<T, Siswa$hasilKonselingArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HasilKonselingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    user<T extends Siswa$userArgs<ExtArgs> = {}>(args?: Subset<T, Siswa$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    tujuanKarir<T extends Siswa$tujuanKarirArgs<ExtArgs> = {}>(args?: Subset<T, Siswa$tujuanKarirArgs<ExtArgs>>): Prisma__TujuanKarirClient<$Result.GetResult<Prisma.$TujuanKarirPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Siswa model
   */
  interface SiswaFieldRefs {
    readonly nis: FieldRef<"Siswa", 'String'>
    readonly nama: FieldRef<"Siswa", 'String'>
    readonly email: FieldRef<"Siswa", 'String'>
    readonly kelasSaatIni: FieldRef<"Siswa", 'String'>
    readonly angkatan: FieldRef<"Siswa", 'Int'>
    readonly jurusan: FieldRef<"Siswa", 'String'>
    readonly status: FieldRef<"Siswa", 'Status'>
    readonly tahunLulusTarget: FieldRef<"Siswa", 'Int'>
    readonly tujuanKarirSubmitted: FieldRef<"Siswa", 'Boolean'>
    readonly createdAt: FieldRef<"Siswa", 'DateTime'>
    readonly updatedAt: FieldRef<"Siswa", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Siswa findUnique
   */
  export type SiswaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Siswa
     */
    select?: SiswaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Siswa
     */
    omit?: SiswaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiswaInclude<ExtArgs> | null
    /**
     * Filter, which Siswa to fetch.
     */
    where: SiswaWhereUniqueInput
  }

  /**
   * Siswa findUniqueOrThrow
   */
  export type SiswaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Siswa
     */
    select?: SiswaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Siswa
     */
    omit?: SiswaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiswaInclude<ExtArgs> | null
    /**
     * Filter, which Siswa to fetch.
     */
    where: SiswaWhereUniqueInput
  }

  /**
   * Siswa findFirst
   */
  export type SiswaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Siswa
     */
    select?: SiswaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Siswa
     */
    omit?: SiswaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiswaInclude<ExtArgs> | null
    /**
     * Filter, which Siswa to fetch.
     */
    where?: SiswaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Siswas to fetch.
     */
    orderBy?: SiswaOrderByWithRelationInput | SiswaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Siswas.
     */
    cursor?: SiswaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Siswas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Siswas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Siswas.
     */
    distinct?: SiswaScalarFieldEnum | SiswaScalarFieldEnum[]
  }

  /**
   * Siswa findFirstOrThrow
   */
  export type SiswaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Siswa
     */
    select?: SiswaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Siswa
     */
    omit?: SiswaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiswaInclude<ExtArgs> | null
    /**
     * Filter, which Siswa to fetch.
     */
    where?: SiswaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Siswas to fetch.
     */
    orderBy?: SiswaOrderByWithRelationInput | SiswaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Siswas.
     */
    cursor?: SiswaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Siswas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Siswas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Siswas.
     */
    distinct?: SiswaScalarFieldEnum | SiswaScalarFieldEnum[]
  }

  /**
   * Siswa findMany
   */
  export type SiswaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Siswa
     */
    select?: SiswaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Siswa
     */
    omit?: SiswaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiswaInclude<ExtArgs> | null
    /**
     * Filter, which Siswas to fetch.
     */
    where?: SiswaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Siswas to fetch.
     */
    orderBy?: SiswaOrderByWithRelationInput | SiswaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Siswas.
     */
    cursor?: SiswaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Siswas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Siswas.
     */
    skip?: number
    distinct?: SiswaScalarFieldEnum | SiswaScalarFieldEnum[]
  }

  /**
   * Siswa create
   */
  export type SiswaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Siswa
     */
    select?: SiswaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Siswa
     */
    omit?: SiswaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiswaInclude<ExtArgs> | null
    /**
     * The data needed to create a Siswa.
     */
    data: XOR<SiswaCreateInput, SiswaUncheckedCreateInput>
  }

  /**
   * Siswa createMany
   */
  export type SiswaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Siswas.
     */
    data: SiswaCreateManyInput | SiswaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Siswa createManyAndReturn
   */
  export type SiswaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Siswa
     */
    select?: SiswaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Siswa
     */
    omit?: SiswaOmit<ExtArgs> | null
    /**
     * The data used to create many Siswas.
     */
    data: SiswaCreateManyInput | SiswaCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiswaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Siswa update
   */
  export type SiswaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Siswa
     */
    select?: SiswaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Siswa
     */
    omit?: SiswaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiswaInclude<ExtArgs> | null
    /**
     * The data needed to update a Siswa.
     */
    data: XOR<SiswaUpdateInput, SiswaUncheckedUpdateInput>
    /**
     * Choose, which Siswa to update.
     */
    where: SiswaWhereUniqueInput
  }

  /**
   * Siswa updateMany
   */
  export type SiswaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Siswas.
     */
    data: XOR<SiswaUpdateManyMutationInput, SiswaUncheckedUpdateManyInput>
    /**
     * Filter which Siswas to update
     */
    where?: SiswaWhereInput
    /**
     * Limit how many Siswas to update.
     */
    limit?: number
  }

  /**
   * Siswa updateManyAndReturn
   */
  export type SiswaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Siswa
     */
    select?: SiswaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Siswa
     */
    omit?: SiswaOmit<ExtArgs> | null
    /**
     * The data used to update Siswas.
     */
    data: XOR<SiswaUpdateManyMutationInput, SiswaUncheckedUpdateManyInput>
    /**
     * Filter which Siswas to update
     */
    where?: SiswaWhereInput
    /**
     * Limit how many Siswas to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiswaIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Siswa upsert
   */
  export type SiswaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Siswa
     */
    select?: SiswaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Siswa
     */
    omit?: SiswaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiswaInclude<ExtArgs> | null
    /**
     * The filter to search for the Siswa to update in case it exists.
     */
    where: SiswaWhereUniqueInput
    /**
     * In case the Siswa found by the `where` argument doesn't exist, create a new Siswa with this data.
     */
    create: XOR<SiswaCreateInput, SiswaUncheckedCreateInput>
    /**
     * In case the Siswa was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SiswaUpdateInput, SiswaUncheckedUpdateInput>
  }

  /**
   * Siswa delete
   */
  export type SiswaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Siswa
     */
    select?: SiswaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Siswa
     */
    omit?: SiswaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiswaInclude<ExtArgs> | null
    /**
     * Filter which Siswa to delete.
     */
    where: SiswaWhereUniqueInput
  }

  /**
   * Siswa deleteMany
   */
  export type SiswaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Siswas to delete
     */
    where?: SiswaWhereInput
    /**
     * Limit how many Siswas to delete.
     */
    limit?: number
  }

  /**
   * Siswa.hasilKonseling
   */
  export type Siswa$hasilKonselingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HasilKonseling
     */
    select?: HasilKonselingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HasilKonseling
     */
    omit?: HasilKonselingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HasilKonselingInclude<ExtArgs> | null
    where?: HasilKonselingWhereInput
    orderBy?: HasilKonselingOrderByWithRelationInput | HasilKonselingOrderByWithRelationInput[]
    cursor?: HasilKonselingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: HasilKonselingScalarFieldEnum | HasilKonselingScalarFieldEnum[]
  }

  /**
   * Siswa.user
   */
  export type Siswa$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Siswa.tujuanKarir
   */
  export type Siswa$tujuanKarirArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TujuanKarir
     */
    select?: TujuanKarirSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TujuanKarir
     */
    omit?: TujuanKarirOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TujuanKarirInclude<ExtArgs> | null
    where?: TujuanKarirWhereInput
  }

  /**
   * Siswa without action
   */
  export type SiswaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Siswa
     */
    select?: SiswaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Siswa
     */
    omit?: SiswaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiswaInclude<ExtArgs> | null
  }


  /**
   * Model HasilKonseling
   */

  export type AggregateHasilKonseling = {
    _count: HasilKonselingCountAggregateOutputType | null
    _min: HasilKonselingMinAggregateOutputType | null
    _max: HasilKonselingMaxAggregateOutputType | null
  }

  export type HasilKonselingMinAggregateOutputType = {
    id: string | null
    nisSiswa: string | null
    tanggalKonseling: Date | null
    hasilText: string | null
    deskripsi: string | null
    tindakLanjut: string | null
    status: $Enums.StatusKonseling | null
    kategori: string | null
    adminId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type HasilKonselingMaxAggregateOutputType = {
    id: string | null
    nisSiswa: string | null
    tanggalKonseling: Date | null
    hasilText: string | null
    deskripsi: string | null
    tindakLanjut: string | null
    status: $Enums.StatusKonseling | null
    kategori: string | null
    adminId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type HasilKonselingCountAggregateOutputType = {
    id: number
    nisSiswa: number
    tanggalKonseling: number
    hasilText: number
    deskripsi: number
    tindakLanjut: number
    status: number
    kategori: number
    adminId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type HasilKonselingMinAggregateInputType = {
    id?: true
    nisSiswa?: true
    tanggalKonseling?: true
    hasilText?: true
    deskripsi?: true
    tindakLanjut?: true
    status?: true
    kategori?: true
    adminId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type HasilKonselingMaxAggregateInputType = {
    id?: true
    nisSiswa?: true
    tanggalKonseling?: true
    hasilText?: true
    deskripsi?: true
    tindakLanjut?: true
    status?: true
    kategori?: true
    adminId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type HasilKonselingCountAggregateInputType = {
    id?: true
    nisSiswa?: true
    tanggalKonseling?: true
    hasilText?: true
    deskripsi?: true
    tindakLanjut?: true
    status?: true
    kategori?: true
    adminId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type HasilKonselingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HasilKonseling to aggregate.
     */
    where?: HasilKonselingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HasilKonselings to fetch.
     */
    orderBy?: HasilKonselingOrderByWithRelationInput | HasilKonselingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HasilKonselingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HasilKonselings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HasilKonselings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned HasilKonselings
    **/
    _count?: true | HasilKonselingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HasilKonselingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HasilKonselingMaxAggregateInputType
  }

  export type GetHasilKonselingAggregateType<T extends HasilKonselingAggregateArgs> = {
        [P in keyof T & keyof AggregateHasilKonseling]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHasilKonseling[P]>
      : GetScalarType<T[P], AggregateHasilKonseling[P]>
  }




  export type HasilKonselingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HasilKonselingWhereInput
    orderBy?: HasilKonselingOrderByWithAggregationInput | HasilKonselingOrderByWithAggregationInput[]
    by: HasilKonselingScalarFieldEnum[] | HasilKonselingScalarFieldEnum
    having?: HasilKonselingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HasilKonselingCountAggregateInputType | true
    _min?: HasilKonselingMinAggregateInputType
    _max?: HasilKonselingMaxAggregateInputType
  }

  export type HasilKonselingGroupByOutputType = {
    id: string
    nisSiswa: string
    tanggalKonseling: Date
    hasilText: string
    deskripsi: string | null
    tindakLanjut: string | null
    status: $Enums.StatusKonseling
    kategori: string | null
    adminId: string
    createdAt: Date
    updatedAt: Date
    _count: HasilKonselingCountAggregateOutputType | null
    _min: HasilKonselingMinAggregateOutputType | null
    _max: HasilKonselingMaxAggregateOutputType | null
  }

  type GetHasilKonselingGroupByPayload<T extends HasilKonselingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HasilKonselingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HasilKonselingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HasilKonselingGroupByOutputType[P]>
            : GetScalarType<T[P], HasilKonselingGroupByOutputType[P]>
        }
      >
    >


  export type HasilKonselingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nisSiswa?: boolean
    tanggalKonseling?: boolean
    hasilText?: boolean
    deskripsi?: boolean
    tindakLanjut?: boolean
    status?: boolean
    kategori?: boolean
    adminId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    siswa?: boolean | SiswaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["hasilKonseling"]>

  export type HasilKonselingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nisSiswa?: boolean
    tanggalKonseling?: boolean
    hasilText?: boolean
    deskripsi?: boolean
    tindakLanjut?: boolean
    status?: boolean
    kategori?: boolean
    adminId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    siswa?: boolean | SiswaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["hasilKonseling"]>

  export type HasilKonselingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nisSiswa?: boolean
    tanggalKonseling?: boolean
    hasilText?: boolean
    deskripsi?: boolean
    tindakLanjut?: boolean
    status?: boolean
    kategori?: boolean
    adminId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    siswa?: boolean | SiswaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["hasilKonseling"]>

  export type HasilKonselingSelectScalar = {
    id?: boolean
    nisSiswa?: boolean
    tanggalKonseling?: boolean
    hasilText?: boolean
    deskripsi?: boolean
    tindakLanjut?: boolean
    status?: boolean
    kategori?: boolean
    adminId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type HasilKonselingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nisSiswa" | "tanggalKonseling" | "hasilText" | "deskripsi" | "tindakLanjut" | "status" | "kategori" | "adminId" | "createdAt" | "updatedAt", ExtArgs["result"]["hasilKonseling"]>
  export type HasilKonselingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    siswa?: boolean | SiswaDefaultArgs<ExtArgs>
  }
  export type HasilKonselingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    siswa?: boolean | SiswaDefaultArgs<ExtArgs>
  }
  export type HasilKonselingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    siswa?: boolean | SiswaDefaultArgs<ExtArgs>
  }

  export type $HasilKonselingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "HasilKonseling"
    objects: {
      siswa: Prisma.$SiswaPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nisSiswa: string
      tanggalKonseling: Date
      hasilText: string
      deskripsi: string | null
      tindakLanjut: string | null
      status: $Enums.StatusKonseling
      kategori: string | null
      adminId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["hasilKonseling"]>
    composites: {}
  }

  type HasilKonselingGetPayload<S extends boolean | null | undefined | HasilKonselingDefaultArgs> = $Result.GetResult<Prisma.$HasilKonselingPayload, S>

  type HasilKonselingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<HasilKonselingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: HasilKonselingCountAggregateInputType | true
    }

  export interface HasilKonselingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['HasilKonseling'], meta: { name: 'HasilKonseling' } }
    /**
     * Find zero or one HasilKonseling that matches the filter.
     * @param {HasilKonselingFindUniqueArgs} args - Arguments to find a HasilKonseling
     * @example
     * // Get one HasilKonseling
     * const hasilKonseling = await prisma.hasilKonseling.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HasilKonselingFindUniqueArgs>(args: SelectSubset<T, HasilKonselingFindUniqueArgs<ExtArgs>>): Prisma__HasilKonselingClient<$Result.GetResult<Prisma.$HasilKonselingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one HasilKonseling that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HasilKonselingFindUniqueOrThrowArgs} args - Arguments to find a HasilKonseling
     * @example
     * // Get one HasilKonseling
     * const hasilKonseling = await prisma.hasilKonseling.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HasilKonselingFindUniqueOrThrowArgs>(args: SelectSubset<T, HasilKonselingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HasilKonselingClient<$Result.GetResult<Prisma.$HasilKonselingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HasilKonseling that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HasilKonselingFindFirstArgs} args - Arguments to find a HasilKonseling
     * @example
     * // Get one HasilKonseling
     * const hasilKonseling = await prisma.hasilKonseling.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HasilKonselingFindFirstArgs>(args?: SelectSubset<T, HasilKonselingFindFirstArgs<ExtArgs>>): Prisma__HasilKonselingClient<$Result.GetResult<Prisma.$HasilKonselingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HasilKonseling that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HasilKonselingFindFirstOrThrowArgs} args - Arguments to find a HasilKonseling
     * @example
     * // Get one HasilKonseling
     * const hasilKonseling = await prisma.hasilKonseling.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HasilKonselingFindFirstOrThrowArgs>(args?: SelectSubset<T, HasilKonselingFindFirstOrThrowArgs<ExtArgs>>): Prisma__HasilKonselingClient<$Result.GetResult<Prisma.$HasilKonselingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more HasilKonselings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HasilKonselingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all HasilKonselings
     * const hasilKonselings = await prisma.hasilKonseling.findMany()
     * 
     * // Get first 10 HasilKonselings
     * const hasilKonselings = await prisma.hasilKonseling.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const hasilKonselingWithIdOnly = await prisma.hasilKonseling.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HasilKonselingFindManyArgs>(args?: SelectSubset<T, HasilKonselingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HasilKonselingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a HasilKonseling.
     * @param {HasilKonselingCreateArgs} args - Arguments to create a HasilKonseling.
     * @example
     * // Create one HasilKonseling
     * const HasilKonseling = await prisma.hasilKonseling.create({
     *   data: {
     *     // ... data to create a HasilKonseling
     *   }
     * })
     * 
     */
    create<T extends HasilKonselingCreateArgs>(args: SelectSubset<T, HasilKonselingCreateArgs<ExtArgs>>): Prisma__HasilKonselingClient<$Result.GetResult<Prisma.$HasilKonselingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many HasilKonselings.
     * @param {HasilKonselingCreateManyArgs} args - Arguments to create many HasilKonselings.
     * @example
     * // Create many HasilKonselings
     * const hasilKonseling = await prisma.hasilKonseling.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HasilKonselingCreateManyArgs>(args?: SelectSubset<T, HasilKonselingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many HasilKonselings and returns the data saved in the database.
     * @param {HasilKonselingCreateManyAndReturnArgs} args - Arguments to create many HasilKonselings.
     * @example
     * // Create many HasilKonselings
     * const hasilKonseling = await prisma.hasilKonseling.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many HasilKonselings and only return the `id`
     * const hasilKonselingWithIdOnly = await prisma.hasilKonseling.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends HasilKonselingCreateManyAndReturnArgs>(args?: SelectSubset<T, HasilKonselingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HasilKonselingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a HasilKonseling.
     * @param {HasilKonselingDeleteArgs} args - Arguments to delete one HasilKonseling.
     * @example
     * // Delete one HasilKonseling
     * const HasilKonseling = await prisma.hasilKonseling.delete({
     *   where: {
     *     // ... filter to delete one HasilKonseling
     *   }
     * })
     * 
     */
    delete<T extends HasilKonselingDeleteArgs>(args: SelectSubset<T, HasilKonselingDeleteArgs<ExtArgs>>): Prisma__HasilKonselingClient<$Result.GetResult<Prisma.$HasilKonselingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one HasilKonseling.
     * @param {HasilKonselingUpdateArgs} args - Arguments to update one HasilKonseling.
     * @example
     * // Update one HasilKonseling
     * const hasilKonseling = await prisma.hasilKonseling.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HasilKonselingUpdateArgs>(args: SelectSubset<T, HasilKonselingUpdateArgs<ExtArgs>>): Prisma__HasilKonselingClient<$Result.GetResult<Prisma.$HasilKonselingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more HasilKonselings.
     * @param {HasilKonselingDeleteManyArgs} args - Arguments to filter HasilKonselings to delete.
     * @example
     * // Delete a few HasilKonselings
     * const { count } = await prisma.hasilKonseling.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HasilKonselingDeleteManyArgs>(args?: SelectSubset<T, HasilKonselingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HasilKonselings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HasilKonselingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many HasilKonselings
     * const hasilKonseling = await prisma.hasilKonseling.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HasilKonselingUpdateManyArgs>(args: SelectSubset<T, HasilKonselingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HasilKonselings and returns the data updated in the database.
     * @param {HasilKonselingUpdateManyAndReturnArgs} args - Arguments to update many HasilKonselings.
     * @example
     * // Update many HasilKonselings
     * const hasilKonseling = await prisma.hasilKonseling.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more HasilKonselings and only return the `id`
     * const hasilKonselingWithIdOnly = await prisma.hasilKonseling.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends HasilKonselingUpdateManyAndReturnArgs>(args: SelectSubset<T, HasilKonselingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HasilKonselingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one HasilKonseling.
     * @param {HasilKonselingUpsertArgs} args - Arguments to update or create a HasilKonseling.
     * @example
     * // Update or create a HasilKonseling
     * const hasilKonseling = await prisma.hasilKonseling.upsert({
     *   create: {
     *     // ... data to create a HasilKonseling
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the HasilKonseling we want to update
     *   }
     * })
     */
    upsert<T extends HasilKonselingUpsertArgs>(args: SelectSubset<T, HasilKonselingUpsertArgs<ExtArgs>>): Prisma__HasilKonselingClient<$Result.GetResult<Prisma.$HasilKonselingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of HasilKonselings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HasilKonselingCountArgs} args - Arguments to filter HasilKonselings to count.
     * @example
     * // Count the number of HasilKonselings
     * const count = await prisma.hasilKonseling.count({
     *   where: {
     *     // ... the filter for the HasilKonselings we want to count
     *   }
     * })
    **/
    count<T extends HasilKonselingCountArgs>(
      args?: Subset<T, HasilKonselingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HasilKonselingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a HasilKonseling.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HasilKonselingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends HasilKonselingAggregateArgs>(args: Subset<T, HasilKonselingAggregateArgs>): Prisma.PrismaPromise<GetHasilKonselingAggregateType<T>>

    /**
     * Group by HasilKonseling.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HasilKonselingGroupByArgs} args - Group by arguments.
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
      T extends HasilKonselingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HasilKonselingGroupByArgs['orderBy'] }
        : { orderBy?: HasilKonselingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
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
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, HasilKonselingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHasilKonselingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the HasilKonseling model
   */
  readonly fields: HasilKonselingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for HasilKonseling.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HasilKonselingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    siswa<T extends SiswaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SiswaDefaultArgs<ExtArgs>>): Prisma__SiswaClient<$Result.GetResult<Prisma.$SiswaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the HasilKonseling model
   */
  interface HasilKonselingFieldRefs {
    readonly id: FieldRef<"HasilKonseling", 'String'>
    readonly nisSiswa: FieldRef<"HasilKonseling", 'String'>
    readonly tanggalKonseling: FieldRef<"HasilKonseling", 'DateTime'>
    readonly hasilText: FieldRef<"HasilKonseling", 'String'>
    readonly deskripsi: FieldRef<"HasilKonseling", 'String'>
    readonly tindakLanjut: FieldRef<"HasilKonseling", 'String'>
    readonly status: FieldRef<"HasilKonseling", 'StatusKonseling'>
    readonly kategori: FieldRef<"HasilKonseling", 'String'>
    readonly adminId: FieldRef<"HasilKonseling", 'String'>
    readonly createdAt: FieldRef<"HasilKonseling", 'DateTime'>
    readonly updatedAt: FieldRef<"HasilKonseling", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * HasilKonseling findUnique
   */
  export type HasilKonselingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HasilKonseling
     */
    select?: HasilKonselingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HasilKonseling
     */
    omit?: HasilKonselingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HasilKonselingInclude<ExtArgs> | null
    /**
     * Filter, which HasilKonseling to fetch.
     */
    where: HasilKonselingWhereUniqueInput
  }

  /**
   * HasilKonseling findUniqueOrThrow
   */
  export type HasilKonselingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HasilKonseling
     */
    select?: HasilKonselingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HasilKonseling
     */
    omit?: HasilKonselingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HasilKonselingInclude<ExtArgs> | null
    /**
     * Filter, which HasilKonseling to fetch.
     */
    where: HasilKonselingWhereUniqueInput
  }

  /**
   * HasilKonseling findFirst
   */
  export type HasilKonselingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HasilKonseling
     */
    select?: HasilKonselingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HasilKonseling
     */
    omit?: HasilKonselingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HasilKonselingInclude<ExtArgs> | null
    /**
     * Filter, which HasilKonseling to fetch.
     */
    where?: HasilKonselingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HasilKonselings to fetch.
     */
    orderBy?: HasilKonselingOrderByWithRelationInput | HasilKonselingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HasilKonselings.
     */
    cursor?: HasilKonselingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HasilKonselings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HasilKonselings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HasilKonselings.
     */
    distinct?: HasilKonselingScalarFieldEnum | HasilKonselingScalarFieldEnum[]
  }

  /**
   * HasilKonseling findFirstOrThrow
   */
  export type HasilKonselingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HasilKonseling
     */
    select?: HasilKonselingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HasilKonseling
     */
    omit?: HasilKonselingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HasilKonselingInclude<ExtArgs> | null
    /**
     * Filter, which HasilKonseling to fetch.
     */
    where?: HasilKonselingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HasilKonselings to fetch.
     */
    orderBy?: HasilKonselingOrderByWithRelationInput | HasilKonselingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HasilKonselings.
     */
    cursor?: HasilKonselingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HasilKonselings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HasilKonselings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HasilKonselings.
     */
    distinct?: HasilKonselingScalarFieldEnum | HasilKonselingScalarFieldEnum[]
  }

  /**
   * HasilKonseling findMany
   */
  export type HasilKonselingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HasilKonseling
     */
    select?: HasilKonselingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HasilKonseling
     */
    omit?: HasilKonselingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HasilKonselingInclude<ExtArgs> | null
    /**
     * Filter, which HasilKonselings to fetch.
     */
    where?: HasilKonselingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HasilKonselings to fetch.
     */
    orderBy?: HasilKonselingOrderByWithRelationInput | HasilKonselingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing HasilKonselings.
     */
    cursor?: HasilKonselingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HasilKonselings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HasilKonselings.
     */
    skip?: number
    distinct?: HasilKonselingScalarFieldEnum | HasilKonselingScalarFieldEnum[]
  }

  /**
   * HasilKonseling create
   */
  export type HasilKonselingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HasilKonseling
     */
    select?: HasilKonselingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HasilKonseling
     */
    omit?: HasilKonselingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HasilKonselingInclude<ExtArgs> | null
    /**
     * The data needed to create a HasilKonseling.
     */
    data: XOR<HasilKonselingCreateInput, HasilKonselingUncheckedCreateInput>
  }

  /**
   * HasilKonseling createMany
   */
  export type HasilKonselingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many HasilKonselings.
     */
    data: HasilKonselingCreateManyInput | HasilKonselingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * HasilKonseling createManyAndReturn
   */
  export type HasilKonselingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HasilKonseling
     */
    select?: HasilKonselingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HasilKonseling
     */
    omit?: HasilKonselingOmit<ExtArgs> | null
    /**
     * The data used to create many HasilKonselings.
     */
    data: HasilKonselingCreateManyInput | HasilKonselingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HasilKonselingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * HasilKonseling update
   */
  export type HasilKonselingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HasilKonseling
     */
    select?: HasilKonselingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HasilKonseling
     */
    omit?: HasilKonselingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HasilKonselingInclude<ExtArgs> | null
    /**
     * The data needed to update a HasilKonseling.
     */
    data: XOR<HasilKonselingUpdateInput, HasilKonselingUncheckedUpdateInput>
    /**
     * Choose, which HasilKonseling to update.
     */
    where: HasilKonselingWhereUniqueInput
  }

  /**
   * HasilKonseling updateMany
   */
  export type HasilKonselingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update HasilKonselings.
     */
    data: XOR<HasilKonselingUpdateManyMutationInput, HasilKonselingUncheckedUpdateManyInput>
    /**
     * Filter which HasilKonselings to update
     */
    where?: HasilKonselingWhereInput
    /**
     * Limit how many HasilKonselings to update.
     */
    limit?: number
  }

  /**
   * HasilKonseling updateManyAndReturn
   */
  export type HasilKonselingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HasilKonseling
     */
    select?: HasilKonselingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HasilKonseling
     */
    omit?: HasilKonselingOmit<ExtArgs> | null
    /**
     * The data used to update HasilKonselings.
     */
    data: XOR<HasilKonselingUpdateManyMutationInput, HasilKonselingUncheckedUpdateManyInput>
    /**
     * Filter which HasilKonselings to update
     */
    where?: HasilKonselingWhereInput
    /**
     * Limit how many HasilKonselings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HasilKonselingIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * HasilKonseling upsert
   */
  export type HasilKonselingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HasilKonseling
     */
    select?: HasilKonselingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HasilKonseling
     */
    omit?: HasilKonselingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HasilKonselingInclude<ExtArgs> | null
    /**
     * The filter to search for the HasilKonseling to update in case it exists.
     */
    where: HasilKonselingWhereUniqueInput
    /**
     * In case the HasilKonseling found by the `where` argument doesn't exist, create a new HasilKonseling with this data.
     */
    create: XOR<HasilKonselingCreateInput, HasilKonselingUncheckedCreateInput>
    /**
     * In case the HasilKonseling was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HasilKonselingUpdateInput, HasilKonselingUncheckedUpdateInput>
  }

  /**
   * HasilKonseling delete
   */
  export type HasilKonselingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HasilKonseling
     */
    select?: HasilKonselingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HasilKonseling
     */
    omit?: HasilKonselingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HasilKonselingInclude<ExtArgs> | null
    /**
     * Filter which HasilKonseling to delete.
     */
    where: HasilKonselingWhereUniqueInput
  }

  /**
   * HasilKonseling deleteMany
   */
  export type HasilKonselingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HasilKonselings to delete
     */
    where?: HasilKonselingWhereInput
    /**
     * Limit how many HasilKonselings to delete.
     */
    limit?: number
  }

  /**
   * HasilKonseling without action
   */
  export type HasilKonselingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HasilKonseling
     */
    select?: HasilKonselingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HasilKonseling
     */
    omit?: HasilKonselingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HasilKonselingInclude<ExtArgs> | null
  }


  /**
   * Model TujuanKarir
   */

  export type AggregateTujuanKarir = {
    _count: TujuanKarirCountAggregateOutputType | null
    _min: TujuanKarirMinAggregateOutputType | null
    _max: TujuanKarirMaxAggregateOutputType | null
  }

  export type TujuanKarirMinAggregateOutputType = {
    id: string | null
    nisSiswa: string | null
    kategoriUtama: string | null
    ptn1: string | null
    jurusan1: string | null
    ptn2: string | null
    jurusan2: string | null
    ptn3: string | null
    jurusan3: string | null
    detailBekerja: string | null
    detailWirausaha: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TujuanKarirMaxAggregateOutputType = {
    id: string | null
    nisSiswa: string | null
    kategoriUtama: string | null
    ptn1: string | null
    jurusan1: string | null
    ptn2: string | null
    jurusan2: string | null
    ptn3: string | null
    jurusan3: string | null
    detailBekerja: string | null
    detailWirausaha: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TujuanKarirCountAggregateOutputType = {
    id: number
    nisSiswa: number
    kategoriUtama: number
    ptn1: number
    jurusan1: number
    ptn2: number
    jurusan2: number
    ptn3: number
    jurusan3: number
    detailBekerja: number
    detailWirausaha: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TujuanKarirMinAggregateInputType = {
    id?: true
    nisSiswa?: true
    kategoriUtama?: true
    ptn1?: true
    jurusan1?: true
    ptn2?: true
    jurusan2?: true
    ptn3?: true
    jurusan3?: true
    detailBekerja?: true
    detailWirausaha?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TujuanKarirMaxAggregateInputType = {
    id?: true
    nisSiswa?: true
    kategoriUtama?: true
    ptn1?: true
    jurusan1?: true
    ptn2?: true
    jurusan2?: true
    ptn3?: true
    jurusan3?: true
    detailBekerja?: true
    detailWirausaha?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TujuanKarirCountAggregateInputType = {
    id?: true
    nisSiswa?: true
    kategoriUtama?: true
    ptn1?: true
    jurusan1?: true
    ptn2?: true
    jurusan2?: true
    ptn3?: true
    jurusan3?: true
    detailBekerja?: true
    detailWirausaha?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TujuanKarirAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TujuanKarir to aggregate.
     */
    where?: TujuanKarirWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TujuanKarirs to fetch.
     */
    orderBy?: TujuanKarirOrderByWithRelationInput | TujuanKarirOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TujuanKarirWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TujuanKarirs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TujuanKarirs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TujuanKarirs
    **/
    _count?: true | TujuanKarirCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TujuanKarirMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TujuanKarirMaxAggregateInputType
  }

  export type GetTujuanKarirAggregateType<T extends TujuanKarirAggregateArgs> = {
        [P in keyof T & keyof AggregateTujuanKarir]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTujuanKarir[P]>
      : GetScalarType<T[P], AggregateTujuanKarir[P]>
  }




  export type TujuanKarirGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TujuanKarirWhereInput
    orderBy?: TujuanKarirOrderByWithAggregationInput | TujuanKarirOrderByWithAggregationInput[]
    by: TujuanKarirScalarFieldEnum[] | TujuanKarirScalarFieldEnum
    having?: TujuanKarirScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TujuanKarirCountAggregateInputType | true
    _min?: TujuanKarirMinAggregateInputType
    _max?: TujuanKarirMaxAggregateInputType
  }

  export type TujuanKarirGroupByOutputType = {
    id: string
    nisSiswa: string
    kategoriUtama: string
    ptn1: string | null
    jurusan1: string | null
    ptn2: string | null
    jurusan2: string | null
    ptn3: string | null
    jurusan3: string | null
    detailBekerja: string | null
    detailWirausaha: string | null
    createdAt: Date
    updatedAt: Date
    _count: TujuanKarirCountAggregateOutputType | null
    _min: TujuanKarirMinAggregateOutputType | null
    _max: TujuanKarirMaxAggregateOutputType | null
  }

  type GetTujuanKarirGroupByPayload<T extends TujuanKarirGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TujuanKarirGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TujuanKarirGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TujuanKarirGroupByOutputType[P]>
            : GetScalarType<T[P], TujuanKarirGroupByOutputType[P]>
        }
      >
    >


  export type TujuanKarirSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nisSiswa?: boolean
    kategoriUtama?: boolean
    ptn1?: boolean
    jurusan1?: boolean
    ptn2?: boolean
    jurusan2?: boolean
    ptn3?: boolean
    jurusan3?: boolean
    detailBekerja?: boolean
    detailWirausaha?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    siswa?: boolean | SiswaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tujuanKarir"]>

  export type TujuanKarirSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nisSiswa?: boolean
    kategoriUtama?: boolean
    ptn1?: boolean
    jurusan1?: boolean
    ptn2?: boolean
    jurusan2?: boolean
    ptn3?: boolean
    jurusan3?: boolean
    detailBekerja?: boolean
    detailWirausaha?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    siswa?: boolean | SiswaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tujuanKarir"]>

  export type TujuanKarirSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nisSiswa?: boolean
    kategoriUtama?: boolean
    ptn1?: boolean
    jurusan1?: boolean
    ptn2?: boolean
    jurusan2?: boolean
    ptn3?: boolean
    jurusan3?: boolean
    detailBekerja?: boolean
    detailWirausaha?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    siswa?: boolean | SiswaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tujuanKarir"]>

  export type TujuanKarirSelectScalar = {
    id?: boolean
    nisSiswa?: boolean
    kategoriUtama?: boolean
    ptn1?: boolean
    jurusan1?: boolean
    ptn2?: boolean
    jurusan2?: boolean
    ptn3?: boolean
    jurusan3?: boolean
    detailBekerja?: boolean
    detailWirausaha?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TujuanKarirOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nisSiswa" | "kategoriUtama" | "ptn1" | "jurusan1" | "ptn2" | "jurusan2" | "ptn3" | "jurusan3" | "detailBekerja" | "detailWirausaha" | "createdAt" | "updatedAt", ExtArgs["result"]["tujuanKarir"]>
  export type TujuanKarirInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    siswa?: boolean | SiswaDefaultArgs<ExtArgs>
  }
  export type TujuanKarirIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    siswa?: boolean | SiswaDefaultArgs<ExtArgs>
  }
  export type TujuanKarirIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    siswa?: boolean | SiswaDefaultArgs<ExtArgs>
  }

  export type $TujuanKarirPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TujuanKarir"
    objects: {
      siswa: Prisma.$SiswaPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nisSiswa: string
      kategoriUtama: string
      ptn1: string | null
      jurusan1: string | null
      ptn2: string | null
      jurusan2: string | null
      ptn3: string | null
      jurusan3: string | null
      detailBekerja: string | null
      detailWirausaha: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["tujuanKarir"]>
    composites: {}
  }

  type TujuanKarirGetPayload<S extends boolean | null | undefined | TujuanKarirDefaultArgs> = $Result.GetResult<Prisma.$TujuanKarirPayload, S>

  type TujuanKarirCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TujuanKarirFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TujuanKarirCountAggregateInputType | true
    }

  export interface TujuanKarirDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TujuanKarir'], meta: { name: 'TujuanKarir' } }
    /**
     * Find zero or one TujuanKarir that matches the filter.
     * @param {TujuanKarirFindUniqueArgs} args - Arguments to find a TujuanKarir
     * @example
     * // Get one TujuanKarir
     * const tujuanKarir = await prisma.tujuanKarir.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TujuanKarirFindUniqueArgs>(args: SelectSubset<T, TujuanKarirFindUniqueArgs<ExtArgs>>): Prisma__TujuanKarirClient<$Result.GetResult<Prisma.$TujuanKarirPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TujuanKarir that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TujuanKarirFindUniqueOrThrowArgs} args - Arguments to find a TujuanKarir
     * @example
     * // Get one TujuanKarir
     * const tujuanKarir = await prisma.tujuanKarir.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TujuanKarirFindUniqueOrThrowArgs>(args: SelectSubset<T, TujuanKarirFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TujuanKarirClient<$Result.GetResult<Prisma.$TujuanKarirPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TujuanKarir that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TujuanKarirFindFirstArgs} args - Arguments to find a TujuanKarir
     * @example
     * // Get one TujuanKarir
     * const tujuanKarir = await prisma.tujuanKarir.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TujuanKarirFindFirstArgs>(args?: SelectSubset<T, TujuanKarirFindFirstArgs<ExtArgs>>): Prisma__TujuanKarirClient<$Result.GetResult<Prisma.$TujuanKarirPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TujuanKarir that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TujuanKarirFindFirstOrThrowArgs} args - Arguments to find a TujuanKarir
     * @example
     * // Get one TujuanKarir
     * const tujuanKarir = await prisma.tujuanKarir.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TujuanKarirFindFirstOrThrowArgs>(args?: SelectSubset<T, TujuanKarirFindFirstOrThrowArgs<ExtArgs>>): Prisma__TujuanKarirClient<$Result.GetResult<Prisma.$TujuanKarirPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TujuanKarirs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TujuanKarirFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TujuanKarirs
     * const tujuanKarirs = await prisma.tujuanKarir.findMany()
     * 
     * // Get first 10 TujuanKarirs
     * const tujuanKarirs = await prisma.tujuanKarir.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tujuanKarirWithIdOnly = await prisma.tujuanKarir.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TujuanKarirFindManyArgs>(args?: SelectSubset<T, TujuanKarirFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TujuanKarirPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TujuanKarir.
     * @param {TujuanKarirCreateArgs} args - Arguments to create a TujuanKarir.
     * @example
     * // Create one TujuanKarir
     * const TujuanKarir = await prisma.tujuanKarir.create({
     *   data: {
     *     // ... data to create a TujuanKarir
     *   }
     * })
     * 
     */
    create<T extends TujuanKarirCreateArgs>(args: SelectSubset<T, TujuanKarirCreateArgs<ExtArgs>>): Prisma__TujuanKarirClient<$Result.GetResult<Prisma.$TujuanKarirPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TujuanKarirs.
     * @param {TujuanKarirCreateManyArgs} args - Arguments to create many TujuanKarirs.
     * @example
     * // Create many TujuanKarirs
     * const tujuanKarir = await prisma.tujuanKarir.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TujuanKarirCreateManyArgs>(args?: SelectSubset<T, TujuanKarirCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TujuanKarirs and returns the data saved in the database.
     * @param {TujuanKarirCreateManyAndReturnArgs} args - Arguments to create many TujuanKarirs.
     * @example
     * // Create many TujuanKarirs
     * const tujuanKarir = await prisma.tujuanKarir.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TujuanKarirs and only return the `id`
     * const tujuanKarirWithIdOnly = await prisma.tujuanKarir.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TujuanKarirCreateManyAndReturnArgs>(args?: SelectSubset<T, TujuanKarirCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TujuanKarirPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TujuanKarir.
     * @param {TujuanKarirDeleteArgs} args - Arguments to delete one TujuanKarir.
     * @example
     * // Delete one TujuanKarir
     * const TujuanKarir = await prisma.tujuanKarir.delete({
     *   where: {
     *     // ... filter to delete one TujuanKarir
     *   }
     * })
     * 
     */
    delete<T extends TujuanKarirDeleteArgs>(args: SelectSubset<T, TujuanKarirDeleteArgs<ExtArgs>>): Prisma__TujuanKarirClient<$Result.GetResult<Prisma.$TujuanKarirPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TujuanKarir.
     * @param {TujuanKarirUpdateArgs} args - Arguments to update one TujuanKarir.
     * @example
     * // Update one TujuanKarir
     * const tujuanKarir = await prisma.tujuanKarir.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TujuanKarirUpdateArgs>(args: SelectSubset<T, TujuanKarirUpdateArgs<ExtArgs>>): Prisma__TujuanKarirClient<$Result.GetResult<Prisma.$TujuanKarirPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TujuanKarirs.
     * @param {TujuanKarirDeleteManyArgs} args - Arguments to filter TujuanKarirs to delete.
     * @example
     * // Delete a few TujuanKarirs
     * const { count } = await prisma.tujuanKarir.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TujuanKarirDeleteManyArgs>(args?: SelectSubset<T, TujuanKarirDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TujuanKarirs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TujuanKarirUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TujuanKarirs
     * const tujuanKarir = await prisma.tujuanKarir.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TujuanKarirUpdateManyArgs>(args: SelectSubset<T, TujuanKarirUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TujuanKarirs and returns the data updated in the database.
     * @param {TujuanKarirUpdateManyAndReturnArgs} args - Arguments to update many TujuanKarirs.
     * @example
     * // Update many TujuanKarirs
     * const tujuanKarir = await prisma.tujuanKarir.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TujuanKarirs and only return the `id`
     * const tujuanKarirWithIdOnly = await prisma.tujuanKarir.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TujuanKarirUpdateManyAndReturnArgs>(args: SelectSubset<T, TujuanKarirUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TujuanKarirPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TujuanKarir.
     * @param {TujuanKarirUpsertArgs} args - Arguments to update or create a TujuanKarir.
     * @example
     * // Update or create a TujuanKarir
     * const tujuanKarir = await prisma.tujuanKarir.upsert({
     *   create: {
     *     // ... data to create a TujuanKarir
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TujuanKarir we want to update
     *   }
     * })
     */
    upsert<T extends TujuanKarirUpsertArgs>(args: SelectSubset<T, TujuanKarirUpsertArgs<ExtArgs>>): Prisma__TujuanKarirClient<$Result.GetResult<Prisma.$TujuanKarirPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TujuanKarirs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TujuanKarirCountArgs} args - Arguments to filter TujuanKarirs to count.
     * @example
     * // Count the number of TujuanKarirs
     * const count = await prisma.tujuanKarir.count({
     *   where: {
     *     // ... the filter for the TujuanKarirs we want to count
     *   }
     * })
    **/
    count<T extends TujuanKarirCountArgs>(
      args?: Subset<T, TujuanKarirCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TujuanKarirCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TujuanKarir.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TujuanKarirAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TujuanKarirAggregateArgs>(args: Subset<T, TujuanKarirAggregateArgs>): Prisma.PrismaPromise<GetTujuanKarirAggregateType<T>>

    /**
     * Group by TujuanKarir.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TujuanKarirGroupByArgs} args - Group by arguments.
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
      T extends TujuanKarirGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TujuanKarirGroupByArgs['orderBy'] }
        : { orderBy?: TujuanKarirGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
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
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TujuanKarirGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTujuanKarirGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TujuanKarir model
   */
  readonly fields: TujuanKarirFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TujuanKarir.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TujuanKarirClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    siswa<T extends SiswaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SiswaDefaultArgs<ExtArgs>>): Prisma__SiswaClient<$Result.GetResult<Prisma.$SiswaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TujuanKarir model
   */
  interface TujuanKarirFieldRefs {
    readonly id: FieldRef<"TujuanKarir", 'String'>
    readonly nisSiswa: FieldRef<"TujuanKarir", 'String'>
    readonly kategoriUtama: FieldRef<"TujuanKarir", 'String'>
    readonly ptn1: FieldRef<"TujuanKarir", 'String'>
    readonly jurusan1: FieldRef<"TujuanKarir", 'String'>
    readonly ptn2: FieldRef<"TujuanKarir", 'String'>
    readonly jurusan2: FieldRef<"TujuanKarir", 'String'>
    readonly ptn3: FieldRef<"TujuanKarir", 'String'>
    readonly jurusan3: FieldRef<"TujuanKarir", 'String'>
    readonly detailBekerja: FieldRef<"TujuanKarir", 'String'>
    readonly detailWirausaha: FieldRef<"TujuanKarir", 'String'>
    readonly createdAt: FieldRef<"TujuanKarir", 'DateTime'>
    readonly updatedAt: FieldRef<"TujuanKarir", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TujuanKarir findUnique
   */
  export type TujuanKarirFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TujuanKarir
     */
    select?: TujuanKarirSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TujuanKarir
     */
    omit?: TujuanKarirOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TujuanKarirInclude<ExtArgs> | null
    /**
     * Filter, which TujuanKarir to fetch.
     */
    where: TujuanKarirWhereUniqueInput
  }

  /**
   * TujuanKarir findUniqueOrThrow
   */
  export type TujuanKarirFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TujuanKarir
     */
    select?: TujuanKarirSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TujuanKarir
     */
    omit?: TujuanKarirOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TujuanKarirInclude<ExtArgs> | null
    /**
     * Filter, which TujuanKarir to fetch.
     */
    where: TujuanKarirWhereUniqueInput
  }

  /**
   * TujuanKarir findFirst
   */
  export type TujuanKarirFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TujuanKarir
     */
    select?: TujuanKarirSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TujuanKarir
     */
    omit?: TujuanKarirOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TujuanKarirInclude<ExtArgs> | null
    /**
     * Filter, which TujuanKarir to fetch.
     */
    where?: TujuanKarirWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TujuanKarirs to fetch.
     */
    orderBy?: TujuanKarirOrderByWithRelationInput | TujuanKarirOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TujuanKarirs.
     */
    cursor?: TujuanKarirWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TujuanKarirs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TujuanKarirs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TujuanKarirs.
     */
    distinct?: TujuanKarirScalarFieldEnum | TujuanKarirScalarFieldEnum[]
  }

  /**
   * TujuanKarir findFirstOrThrow
   */
  export type TujuanKarirFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TujuanKarir
     */
    select?: TujuanKarirSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TujuanKarir
     */
    omit?: TujuanKarirOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TujuanKarirInclude<ExtArgs> | null
    /**
     * Filter, which TujuanKarir to fetch.
     */
    where?: TujuanKarirWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TujuanKarirs to fetch.
     */
    orderBy?: TujuanKarirOrderByWithRelationInput | TujuanKarirOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TujuanKarirs.
     */
    cursor?: TujuanKarirWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TujuanKarirs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TujuanKarirs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TujuanKarirs.
     */
    distinct?: TujuanKarirScalarFieldEnum | TujuanKarirScalarFieldEnum[]
  }

  /**
   * TujuanKarir findMany
   */
  export type TujuanKarirFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TujuanKarir
     */
    select?: TujuanKarirSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TujuanKarir
     */
    omit?: TujuanKarirOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TujuanKarirInclude<ExtArgs> | null
    /**
     * Filter, which TujuanKarirs to fetch.
     */
    where?: TujuanKarirWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TujuanKarirs to fetch.
     */
    orderBy?: TujuanKarirOrderByWithRelationInput | TujuanKarirOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TujuanKarirs.
     */
    cursor?: TujuanKarirWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TujuanKarirs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TujuanKarirs.
     */
    skip?: number
    distinct?: TujuanKarirScalarFieldEnum | TujuanKarirScalarFieldEnum[]
  }

  /**
   * TujuanKarir create
   */
  export type TujuanKarirCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TujuanKarir
     */
    select?: TujuanKarirSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TujuanKarir
     */
    omit?: TujuanKarirOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TujuanKarirInclude<ExtArgs> | null
    /**
     * The data needed to create a TujuanKarir.
     */
    data: XOR<TujuanKarirCreateInput, TujuanKarirUncheckedCreateInput>
  }

  /**
   * TujuanKarir createMany
   */
  export type TujuanKarirCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TujuanKarirs.
     */
    data: TujuanKarirCreateManyInput | TujuanKarirCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TujuanKarir createManyAndReturn
   */
  export type TujuanKarirCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TujuanKarir
     */
    select?: TujuanKarirSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TujuanKarir
     */
    omit?: TujuanKarirOmit<ExtArgs> | null
    /**
     * The data used to create many TujuanKarirs.
     */
    data: TujuanKarirCreateManyInput | TujuanKarirCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TujuanKarirIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TujuanKarir update
   */
  export type TujuanKarirUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TujuanKarir
     */
    select?: TujuanKarirSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TujuanKarir
     */
    omit?: TujuanKarirOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TujuanKarirInclude<ExtArgs> | null
    /**
     * The data needed to update a TujuanKarir.
     */
    data: XOR<TujuanKarirUpdateInput, TujuanKarirUncheckedUpdateInput>
    /**
     * Choose, which TujuanKarir to update.
     */
    where: TujuanKarirWhereUniqueInput
  }

  /**
   * TujuanKarir updateMany
   */
  export type TujuanKarirUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TujuanKarirs.
     */
    data: XOR<TujuanKarirUpdateManyMutationInput, TujuanKarirUncheckedUpdateManyInput>
    /**
     * Filter which TujuanKarirs to update
     */
    where?: TujuanKarirWhereInput
    /**
     * Limit how many TujuanKarirs to update.
     */
    limit?: number
  }

  /**
   * TujuanKarir updateManyAndReturn
   */
  export type TujuanKarirUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TujuanKarir
     */
    select?: TujuanKarirSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TujuanKarir
     */
    omit?: TujuanKarirOmit<ExtArgs> | null
    /**
     * The data used to update TujuanKarirs.
     */
    data: XOR<TujuanKarirUpdateManyMutationInput, TujuanKarirUncheckedUpdateManyInput>
    /**
     * Filter which TujuanKarirs to update
     */
    where?: TujuanKarirWhereInput
    /**
     * Limit how many TujuanKarirs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TujuanKarirIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TujuanKarir upsert
   */
  export type TujuanKarirUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TujuanKarir
     */
    select?: TujuanKarirSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TujuanKarir
     */
    omit?: TujuanKarirOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TujuanKarirInclude<ExtArgs> | null
    /**
     * The filter to search for the TujuanKarir to update in case it exists.
     */
    where: TujuanKarirWhereUniqueInput
    /**
     * In case the TujuanKarir found by the `where` argument doesn't exist, create a new TujuanKarir with this data.
     */
    create: XOR<TujuanKarirCreateInput, TujuanKarirUncheckedCreateInput>
    /**
     * In case the TujuanKarir was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TujuanKarirUpdateInput, TujuanKarirUncheckedUpdateInput>
  }

  /**
   * TujuanKarir delete
   */
  export type TujuanKarirDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TujuanKarir
     */
    select?: TujuanKarirSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TujuanKarir
     */
    omit?: TujuanKarirOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TujuanKarirInclude<ExtArgs> | null
    /**
     * Filter which TujuanKarir to delete.
     */
    where: TujuanKarirWhereUniqueInput
  }

  /**
   * TujuanKarir deleteMany
   */
  export type TujuanKarirDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TujuanKarirs to delete
     */
    where?: TujuanKarirWhereInput
    /**
     * Limit how many TujuanKarirs to delete.
     */
    limit?: number
  }

  /**
   * TujuanKarir without action
   */
  export type TujuanKarirDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TujuanKarir
     */
    select?: TujuanKarirSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TujuanKarir
     */
    omit?: TujuanKarirOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TujuanKarirInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SiswaScalarFieldEnum: {
    nis: 'nis',
    nama: 'nama',
    email: 'email',
    kelasSaatIni: 'kelasSaatIni',
    angkatan: 'angkatan',
    jurusan: 'jurusan',
    status: 'status',
    tahunLulusTarget: 'tahunLulusTarget',
    tujuanKarirSubmitted: 'tujuanKarirSubmitted',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SiswaScalarFieldEnum = (typeof SiswaScalarFieldEnum)[keyof typeof SiswaScalarFieldEnum]


  export const HasilKonselingScalarFieldEnum: {
    id: 'id',
    nisSiswa: 'nisSiswa',
    tanggalKonseling: 'tanggalKonseling',
    hasilText: 'hasilText',
    deskripsi: 'deskripsi',
    tindakLanjut: 'tindakLanjut',
    status: 'status',
    kategori: 'kategori',
    adminId: 'adminId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type HasilKonselingScalarFieldEnum = (typeof HasilKonselingScalarFieldEnum)[keyof typeof HasilKonselingScalarFieldEnum]


  export const TujuanKarirScalarFieldEnum: {
    id: 'id',
    nisSiswa: 'nisSiswa',
    kategoriUtama: 'kategoriUtama',
    ptn1: 'ptn1',
    jurusan1: 'jurusan1',
    ptn2: 'ptn2',
    jurusan2: 'jurusan2',
    ptn3: 'ptn3',
    jurusan3: 'jurusan3',
    detailBekerja: 'detailBekerja',
    detailWirausaha: 'detailWirausaha',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TujuanKarirScalarFieldEnum = (typeof TujuanKarirScalarFieldEnum)[keyof typeof TujuanKarirScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Status'
   */
  export type EnumStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Status'>
    


  /**
   * Reference to a field of type 'Status[]'
   */
  export type ListEnumStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Status[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'StatusKonseling'
   */
  export type EnumStatusKonselingFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatusKonseling'>
    


  /**
   * Reference to a field of type 'StatusKonseling[]'
   */
  export type ListEnumStatusKonselingFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatusKonseling[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    siswa?: XOR<SiswaNullableScalarRelationFilter, SiswaWhereInput> | null
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    siswa?: SiswaOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    siswa?: XOR<SiswaNullableScalarRelationFilter, SiswaWhereInput> | null
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type SiswaWhereInput = {
    AND?: SiswaWhereInput | SiswaWhereInput[]
    OR?: SiswaWhereInput[]
    NOT?: SiswaWhereInput | SiswaWhereInput[]
    nis?: StringFilter<"Siswa"> | string
    nama?: StringFilter<"Siswa"> | string
    email?: StringNullableFilter<"Siswa"> | string | null
    kelasSaatIni?: StringNullableFilter<"Siswa"> | string | null
    angkatan?: IntFilter<"Siswa"> | number
    jurusan?: StringNullableFilter<"Siswa"> | string | null
    status?: EnumStatusFilter<"Siswa"> | $Enums.Status
    tahunLulusTarget?: IntNullableFilter<"Siswa"> | number | null
    tujuanKarirSubmitted?: BoolFilter<"Siswa"> | boolean
    createdAt?: DateTimeFilter<"Siswa"> | Date | string
    updatedAt?: DateTimeFilter<"Siswa"> | Date | string
    hasilKonseling?: HasilKonselingListRelationFilter
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    tujuanKarir?: XOR<TujuanKarirNullableScalarRelationFilter, TujuanKarirWhereInput> | null
  }

  export type SiswaOrderByWithRelationInput = {
    nis?: SortOrder
    nama?: SortOrder
    email?: SortOrderInput | SortOrder
    kelasSaatIni?: SortOrderInput | SortOrder
    angkatan?: SortOrder
    jurusan?: SortOrderInput | SortOrder
    status?: SortOrder
    tahunLulusTarget?: SortOrderInput | SortOrder
    tujuanKarirSubmitted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    hasilKonseling?: HasilKonselingOrderByRelationAggregateInput
    user?: UserOrderByWithRelationInput
    tujuanKarir?: TujuanKarirOrderByWithRelationInput
  }

  export type SiswaWhereUniqueInput = Prisma.AtLeast<{
    nis?: string
    email?: string
    AND?: SiswaWhereInput | SiswaWhereInput[]
    OR?: SiswaWhereInput[]
    NOT?: SiswaWhereInput | SiswaWhereInput[]
    nama?: StringFilter<"Siswa"> | string
    kelasSaatIni?: StringNullableFilter<"Siswa"> | string | null
    angkatan?: IntFilter<"Siswa"> | number
    jurusan?: StringNullableFilter<"Siswa"> | string | null
    status?: EnumStatusFilter<"Siswa"> | $Enums.Status
    tahunLulusTarget?: IntNullableFilter<"Siswa"> | number | null
    tujuanKarirSubmitted?: BoolFilter<"Siswa"> | boolean
    createdAt?: DateTimeFilter<"Siswa"> | Date | string
    updatedAt?: DateTimeFilter<"Siswa"> | Date | string
    hasilKonseling?: HasilKonselingListRelationFilter
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    tujuanKarir?: XOR<TujuanKarirNullableScalarRelationFilter, TujuanKarirWhereInput> | null
  }, "nis" | "email">

  export type SiswaOrderByWithAggregationInput = {
    nis?: SortOrder
    nama?: SortOrder
    email?: SortOrderInput | SortOrder
    kelasSaatIni?: SortOrderInput | SortOrder
    angkatan?: SortOrder
    jurusan?: SortOrderInput | SortOrder
    status?: SortOrder
    tahunLulusTarget?: SortOrderInput | SortOrder
    tujuanKarirSubmitted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SiswaCountOrderByAggregateInput
    _avg?: SiswaAvgOrderByAggregateInput
    _max?: SiswaMaxOrderByAggregateInput
    _min?: SiswaMinOrderByAggregateInput
    _sum?: SiswaSumOrderByAggregateInput
  }

  export type SiswaScalarWhereWithAggregatesInput = {
    AND?: SiswaScalarWhereWithAggregatesInput | SiswaScalarWhereWithAggregatesInput[]
    OR?: SiswaScalarWhereWithAggregatesInput[]
    NOT?: SiswaScalarWhereWithAggregatesInput | SiswaScalarWhereWithAggregatesInput[]
    nis?: StringWithAggregatesFilter<"Siswa"> | string
    nama?: StringWithAggregatesFilter<"Siswa"> | string
    email?: StringNullableWithAggregatesFilter<"Siswa"> | string | null
    kelasSaatIni?: StringNullableWithAggregatesFilter<"Siswa"> | string | null
    angkatan?: IntWithAggregatesFilter<"Siswa"> | number
    jurusan?: StringNullableWithAggregatesFilter<"Siswa"> | string | null
    status?: EnumStatusWithAggregatesFilter<"Siswa"> | $Enums.Status
    tahunLulusTarget?: IntNullableWithAggregatesFilter<"Siswa"> | number | null
    tujuanKarirSubmitted?: BoolWithAggregatesFilter<"Siswa"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Siswa"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Siswa"> | Date | string
  }

  export type HasilKonselingWhereInput = {
    AND?: HasilKonselingWhereInput | HasilKonselingWhereInput[]
    OR?: HasilKonselingWhereInput[]
    NOT?: HasilKonselingWhereInput | HasilKonselingWhereInput[]
    id?: StringFilter<"HasilKonseling"> | string
    nisSiswa?: StringFilter<"HasilKonseling"> | string
    tanggalKonseling?: DateTimeFilter<"HasilKonseling"> | Date | string
    hasilText?: StringFilter<"HasilKonseling"> | string
    deskripsi?: StringNullableFilter<"HasilKonseling"> | string | null
    tindakLanjut?: StringNullableFilter<"HasilKonseling"> | string | null
    status?: EnumStatusKonselingFilter<"HasilKonseling"> | $Enums.StatusKonseling
    kategori?: StringNullableFilter<"HasilKonseling"> | string | null
    adminId?: StringFilter<"HasilKonseling"> | string
    createdAt?: DateTimeFilter<"HasilKonseling"> | Date | string
    updatedAt?: DateTimeFilter<"HasilKonseling"> | Date | string
    siswa?: XOR<SiswaScalarRelationFilter, SiswaWhereInput>
  }

  export type HasilKonselingOrderByWithRelationInput = {
    id?: SortOrder
    nisSiswa?: SortOrder
    tanggalKonseling?: SortOrder
    hasilText?: SortOrder
    deskripsi?: SortOrderInput | SortOrder
    tindakLanjut?: SortOrderInput | SortOrder
    status?: SortOrder
    kategori?: SortOrderInput | SortOrder
    adminId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    siswa?: SiswaOrderByWithRelationInput
  }

  export type HasilKonselingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: HasilKonselingWhereInput | HasilKonselingWhereInput[]
    OR?: HasilKonselingWhereInput[]
    NOT?: HasilKonselingWhereInput | HasilKonselingWhereInput[]
    nisSiswa?: StringFilter<"HasilKonseling"> | string
    tanggalKonseling?: DateTimeFilter<"HasilKonseling"> | Date | string
    hasilText?: StringFilter<"HasilKonseling"> | string
    deskripsi?: StringNullableFilter<"HasilKonseling"> | string | null
    tindakLanjut?: StringNullableFilter<"HasilKonseling"> | string | null
    status?: EnumStatusKonselingFilter<"HasilKonseling"> | $Enums.StatusKonseling
    kategori?: StringNullableFilter<"HasilKonseling"> | string | null
    adminId?: StringFilter<"HasilKonseling"> | string
    createdAt?: DateTimeFilter<"HasilKonseling"> | Date | string
    updatedAt?: DateTimeFilter<"HasilKonseling"> | Date | string
    siswa?: XOR<SiswaScalarRelationFilter, SiswaWhereInput>
  }, "id">

  export type HasilKonselingOrderByWithAggregationInput = {
    id?: SortOrder
    nisSiswa?: SortOrder
    tanggalKonseling?: SortOrder
    hasilText?: SortOrder
    deskripsi?: SortOrderInput | SortOrder
    tindakLanjut?: SortOrderInput | SortOrder
    status?: SortOrder
    kategori?: SortOrderInput | SortOrder
    adminId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: HasilKonselingCountOrderByAggregateInput
    _max?: HasilKonselingMaxOrderByAggregateInput
    _min?: HasilKonselingMinOrderByAggregateInput
  }

  export type HasilKonselingScalarWhereWithAggregatesInput = {
    AND?: HasilKonselingScalarWhereWithAggregatesInput | HasilKonselingScalarWhereWithAggregatesInput[]
    OR?: HasilKonselingScalarWhereWithAggregatesInput[]
    NOT?: HasilKonselingScalarWhereWithAggregatesInput | HasilKonselingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"HasilKonseling"> | string
    nisSiswa?: StringWithAggregatesFilter<"HasilKonseling"> | string
    tanggalKonseling?: DateTimeWithAggregatesFilter<"HasilKonseling"> | Date | string
    hasilText?: StringWithAggregatesFilter<"HasilKonseling"> | string
    deskripsi?: StringNullableWithAggregatesFilter<"HasilKonseling"> | string | null
    tindakLanjut?: StringNullableWithAggregatesFilter<"HasilKonseling"> | string | null
    status?: EnumStatusKonselingWithAggregatesFilter<"HasilKonseling"> | $Enums.StatusKonseling
    kategori?: StringNullableWithAggregatesFilter<"HasilKonseling"> | string | null
    adminId?: StringWithAggregatesFilter<"HasilKonseling"> | string
    createdAt?: DateTimeWithAggregatesFilter<"HasilKonseling"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"HasilKonseling"> | Date | string
  }

  export type TujuanKarirWhereInput = {
    AND?: TujuanKarirWhereInput | TujuanKarirWhereInput[]
    OR?: TujuanKarirWhereInput[]
    NOT?: TujuanKarirWhereInput | TujuanKarirWhereInput[]
    id?: StringFilter<"TujuanKarir"> | string
    nisSiswa?: StringFilter<"TujuanKarir"> | string
    kategoriUtama?: StringFilter<"TujuanKarir"> | string
    ptn1?: StringNullableFilter<"TujuanKarir"> | string | null
    jurusan1?: StringNullableFilter<"TujuanKarir"> | string | null
    ptn2?: StringNullableFilter<"TujuanKarir"> | string | null
    jurusan2?: StringNullableFilter<"TujuanKarir"> | string | null
    ptn3?: StringNullableFilter<"TujuanKarir"> | string | null
    jurusan3?: StringNullableFilter<"TujuanKarir"> | string | null
    detailBekerja?: StringNullableFilter<"TujuanKarir"> | string | null
    detailWirausaha?: StringNullableFilter<"TujuanKarir"> | string | null
    createdAt?: DateTimeFilter<"TujuanKarir"> | Date | string
    updatedAt?: DateTimeFilter<"TujuanKarir"> | Date | string
    siswa?: XOR<SiswaScalarRelationFilter, SiswaWhereInput>
  }

  export type TujuanKarirOrderByWithRelationInput = {
    id?: SortOrder
    nisSiswa?: SortOrder
    kategoriUtama?: SortOrder
    ptn1?: SortOrderInput | SortOrder
    jurusan1?: SortOrderInput | SortOrder
    ptn2?: SortOrderInput | SortOrder
    jurusan2?: SortOrderInput | SortOrder
    ptn3?: SortOrderInput | SortOrder
    jurusan3?: SortOrderInput | SortOrder
    detailBekerja?: SortOrderInput | SortOrder
    detailWirausaha?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    siswa?: SiswaOrderByWithRelationInput
  }

  export type TujuanKarirWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    nisSiswa?: string
    AND?: TujuanKarirWhereInput | TujuanKarirWhereInput[]
    OR?: TujuanKarirWhereInput[]
    NOT?: TujuanKarirWhereInput | TujuanKarirWhereInput[]
    kategoriUtama?: StringFilter<"TujuanKarir"> | string
    ptn1?: StringNullableFilter<"TujuanKarir"> | string | null
    jurusan1?: StringNullableFilter<"TujuanKarir"> | string | null
    ptn2?: StringNullableFilter<"TujuanKarir"> | string | null
    jurusan2?: StringNullableFilter<"TujuanKarir"> | string | null
    ptn3?: StringNullableFilter<"TujuanKarir"> | string | null
    jurusan3?: StringNullableFilter<"TujuanKarir"> | string | null
    detailBekerja?: StringNullableFilter<"TujuanKarir"> | string | null
    detailWirausaha?: StringNullableFilter<"TujuanKarir"> | string | null
    createdAt?: DateTimeFilter<"TujuanKarir"> | Date | string
    updatedAt?: DateTimeFilter<"TujuanKarir"> | Date | string
    siswa?: XOR<SiswaScalarRelationFilter, SiswaWhereInput>
  }, "id" | "nisSiswa">

  export type TujuanKarirOrderByWithAggregationInput = {
    id?: SortOrder
    nisSiswa?: SortOrder
    kategoriUtama?: SortOrder
    ptn1?: SortOrderInput | SortOrder
    jurusan1?: SortOrderInput | SortOrder
    ptn2?: SortOrderInput | SortOrder
    jurusan2?: SortOrderInput | SortOrder
    ptn3?: SortOrderInput | SortOrder
    jurusan3?: SortOrderInput | SortOrder
    detailBekerja?: SortOrderInput | SortOrder
    detailWirausaha?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TujuanKarirCountOrderByAggregateInput
    _max?: TujuanKarirMaxOrderByAggregateInput
    _min?: TujuanKarirMinOrderByAggregateInput
  }

  export type TujuanKarirScalarWhereWithAggregatesInput = {
    AND?: TujuanKarirScalarWhereWithAggregatesInput | TujuanKarirScalarWhereWithAggregatesInput[]
    OR?: TujuanKarirScalarWhereWithAggregatesInput[]
    NOT?: TujuanKarirScalarWhereWithAggregatesInput | TujuanKarirScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TujuanKarir"> | string
    nisSiswa?: StringWithAggregatesFilter<"TujuanKarir"> | string
    kategoriUtama?: StringWithAggregatesFilter<"TujuanKarir"> | string
    ptn1?: StringNullableWithAggregatesFilter<"TujuanKarir"> | string | null
    jurusan1?: StringNullableWithAggregatesFilter<"TujuanKarir"> | string | null
    ptn2?: StringNullableWithAggregatesFilter<"TujuanKarir"> | string | null
    jurusan2?: StringNullableWithAggregatesFilter<"TujuanKarir"> | string | null
    ptn3?: StringNullableWithAggregatesFilter<"TujuanKarir"> | string | null
    jurusan3?: StringNullableWithAggregatesFilter<"TujuanKarir"> | string | null
    detailBekerja?: StringNullableWithAggregatesFilter<"TujuanKarir"> | string | null
    detailWirausaha?: StringNullableWithAggregatesFilter<"TujuanKarir"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"TujuanKarir"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TujuanKarir"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    siswa?: SiswaCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    siswa?: SiswaUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    siswa?: SiswaUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    siswa?: SiswaUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SiswaCreateInput = {
    nis: string
    nama: string
    kelasSaatIni?: string | null
    angkatan: number
    jurusan?: string | null
    status?: $Enums.Status
    tahunLulusTarget?: number | null
    tujuanKarirSubmitted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    hasilKonseling?: HasilKonselingCreateNestedManyWithoutSiswaInput
    user?: UserCreateNestedOneWithoutSiswaInput
    tujuanKarir?: TujuanKarirCreateNestedOneWithoutSiswaInput
  }

  export type SiswaUncheckedCreateInput = {
    nis: string
    nama: string
    email?: string | null
    kelasSaatIni?: string | null
    angkatan: number
    jurusan?: string | null
    status?: $Enums.Status
    tahunLulusTarget?: number | null
    tujuanKarirSubmitted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    hasilKonseling?: HasilKonselingUncheckedCreateNestedManyWithoutSiswaInput
    tujuanKarir?: TujuanKarirUncheckedCreateNestedOneWithoutSiswaInput
  }

  export type SiswaUpdateInput = {
    nis?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    kelasSaatIni?: NullableStringFieldUpdateOperationsInput | string | null
    angkatan?: IntFieldUpdateOperationsInput | number
    jurusan?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    tahunLulusTarget?: NullableIntFieldUpdateOperationsInput | number | null
    tujuanKarirSubmitted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hasilKonseling?: HasilKonselingUpdateManyWithoutSiswaNestedInput
    user?: UserUpdateOneWithoutSiswaNestedInput
    tujuanKarir?: TujuanKarirUpdateOneWithoutSiswaNestedInput
  }

  export type SiswaUncheckedUpdateInput = {
    nis?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    kelasSaatIni?: NullableStringFieldUpdateOperationsInput | string | null
    angkatan?: IntFieldUpdateOperationsInput | number
    jurusan?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    tahunLulusTarget?: NullableIntFieldUpdateOperationsInput | number | null
    tujuanKarirSubmitted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hasilKonseling?: HasilKonselingUncheckedUpdateManyWithoutSiswaNestedInput
    tujuanKarir?: TujuanKarirUncheckedUpdateOneWithoutSiswaNestedInput
  }

  export type SiswaCreateManyInput = {
    nis: string
    nama: string
    email?: string | null
    kelasSaatIni?: string | null
    angkatan: number
    jurusan?: string | null
    status?: $Enums.Status
    tahunLulusTarget?: number | null
    tujuanKarirSubmitted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SiswaUpdateManyMutationInput = {
    nis?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    kelasSaatIni?: NullableStringFieldUpdateOperationsInput | string | null
    angkatan?: IntFieldUpdateOperationsInput | number
    jurusan?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    tahunLulusTarget?: NullableIntFieldUpdateOperationsInput | number | null
    tujuanKarirSubmitted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SiswaUncheckedUpdateManyInput = {
    nis?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    kelasSaatIni?: NullableStringFieldUpdateOperationsInput | string | null
    angkatan?: IntFieldUpdateOperationsInput | number
    jurusan?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    tahunLulusTarget?: NullableIntFieldUpdateOperationsInput | number | null
    tujuanKarirSubmitted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HasilKonselingCreateInput = {
    id?: string
    tanggalKonseling: Date | string
    hasilText: string
    deskripsi?: string | null
    tindakLanjut?: string | null
    status?: $Enums.StatusKonseling
    kategori?: string | null
    adminId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    siswa: SiswaCreateNestedOneWithoutHasilKonselingInput
  }

  export type HasilKonselingUncheckedCreateInput = {
    id?: string
    nisSiswa: string
    tanggalKonseling: Date | string
    hasilText: string
    deskripsi?: string | null
    tindakLanjut?: string | null
    status?: $Enums.StatusKonseling
    kategori?: string | null
    adminId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HasilKonselingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tanggalKonseling?: DateTimeFieldUpdateOperationsInput | Date | string
    hasilText?: StringFieldUpdateOperationsInput | string
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    tindakLanjut?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusKonselingFieldUpdateOperationsInput | $Enums.StatusKonseling
    kategori?: NullableStringFieldUpdateOperationsInput | string | null
    adminId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    siswa?: SiswaUpdateOneRequiredWithoutHasilKonselingNestedInput
  }

  export type HasilKonselingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nisSiswa?: StringFieldUpdateOperationsInput | string
    tanggalKonseling?: DateTimeFieldUpdateOperationsInput | Date | string
    hasilText?: StringFieldUpdateOperationsInput | string
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    tindakLanjut?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusKonselingFieldUpdateOperationsInput | $Enums.StatusKonseling
    kategori?: NullableStringFieldUpdateOperationsInput | string | null
    adminId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HasilKonselingCreateManyInput = {
    id?: string
    nisSiswa: string
    tanggalKonseling: Date | string
    hasilText: string
    deskripsi?: string | null
    tindakLanjut?: string | null
    status?: $Enums.StatusKonseling
    kategori?: string | null
    adminId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HasilKonselingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tanggalKonseling?: DateTimeFieldUpdateOperationsInput | Date | string
    hasilText?: StringFieldUpdateOperationsInput | string
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    tindakLanjut?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusKonselingFieldUpdateOperationsInput | $Enums.StatusKonseling
    kategori?: NullableStringFieldUpdateOperationsInput | string | null
    adminId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HasilKonselingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nisSiswa?: StringFieldUpdateOperationsInput | string
    tanggalKonseling?: DateTimeFieldUpdateOperationsInput | Date | string
    hasilText?: StringFieldUpdateOperationsInput | string
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    tindakLanjut?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusKonselingFieldUpdateOperationsInput | $Enums.StatusKonseling
    kategori?: NullableStringFieldUpdateOperationsInput | string | null
    adminId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TujuanKarirCreateInput = {
    id?: string
    kategoriUtama: string
    ptn1?: string | null
    jurusan1?: string | null
    ptn2?: string | null
    jurusan2?: string | null
    ptn3?: string | null
    jurusan3?: string | null
    detailBekerja?: string | null
    detailWirausaha?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    siswa: SiswaCreateNestedOneWithoutTujuanKarirInput
  }

  export type TujuanKarirUncheckedCreateInput = {
    id?: string
    nisSiswa: string
    kategoriUtama: string
    ptn1?: string | null
    jurusan1?: string | null
    ptn2?: string | null
    jurusan2?: string | null
    ptn3?: string | null
    jurusan3?: string | null
    detailBekerja?: string | null
    detailWirausaha?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TujuanKarirUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    kategoriUtama?: StringFieldUpdateOperationsInput | string
    ptn1?: NullableStringFieldUpdateOperationsInput | string | null
    jurusan1?: NullableStringFieldUpdateOperationsInput | string | null
    ptn2?: NullableStringFieldUpdateOperationsInput | string | null
    jurusan2?: NullableStringFieldUpdateOperationsInput | string | null
    ptn3?: NullableStringFieldUpdateOperationsInput | string | null
    jurusan3?: NullableStringFieldUpdateOperationsInput | string | null
    detailBekerja?: NullableStringFieldUpdateOperationsInput | string | null
    detailWirausaha?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    siswa?: SiswaUpdateOneRequiredWithoutTujuanKarirNestedInput
  }

  export type TujuanKarirUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nisSiswa?: StringFieldUpdateOperationsInput | string
    kategoriUtama?: StringFieldUpdateOperationsInput | string
    ptn1?: NullableStringFieldUpdateOperationsInput | string | null
    jurusan1?: NullableStringFieldUpdateOperationsInput | string | null
    ptn2?: NullableStringFieldUpdateOperationsInput | string | null
    jurusan2?: NullableStringFieldUpdateOperationsInput | string | null
    ptn3?: NullableStringFieldUpdateOperationsInput | string | null
    jurusan3?: NullableStringFieldUpdateOperationsInput | string | null
    detailBekerja?: NullableStringFieldUpdateOperationsInput | string | null
    detailWirausaha?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TujuanKarirCreateManyInput = {
    id?: string
    nisSiswa: string
    kategoriUtama: string
    ptn1?: string | null
    jurusan1?: string | null
    ptn2?: string | null
    jurusan2?: string | null
    ptn3?: string | null
    jurusan3?: string | null
    detailBekerja?: string | null
    detailWirausaha?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TujuanKarirUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    kategoriUtama?: StringFieldUpdateOperationsInput | string
    ptn1?: NullableStringFieldUpdateOperationsInput | string | null
    jurusan1?: NullableStringFieldUpdateOperationsInput | string | null
    ptn2?: NullableStringFieldUpdateOperationsInput | string | null
    jurusan2?: NullableStringFieldUpdateOperationsInput | string | null
    ptn3?: NullableStringFieldUpdateOperationsInput | string | null
    jurusan3?: NullableStringFieldUpdateOperationsInput | string | null
    detailBekerja?: NullableStringFieldUpdateOperationsInput | string | null
    detailWirausaha?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TujuanKarirUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nisSiswa?: StringFieldUpdateOperationsInput | string
    kategoriUtama?: StringFieldUpdateOperationsInput | string
    ptn1?: NullableStringFieldUpdateOperationsInput | string | null
    jurusan1?: NullableStringFieldUpdateOperationsInput | string | null
    ptn2?: NullableStringFieldUpdateOperationsInput | string | null
    jurusan2?: NullableStringFieldUpdateOperationsInput | string | null
    ptn3?: NullableStringFieldUpdateOperationsInput | string | null
    jurusan3?: NullableStringFieldUpdateOperationsInput | string | null
    detailBekerja?: NullableStringFieldUpdateOperationsInput | string | null
    detailWirausaha?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SiswaNullableScalarRelationFilter = {
    is?: SiswaWhereInput | null
    isNot?: SiswaWhereInput | null
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type EnumStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusFilter<$PrismaModel> | $Enums.Status
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type HasilKonselingListRelationFilter = {
    every?: HasilKonselingWhereInput
    some?: HasilKonselingWhereInput
    none?: HasilKonselingWhereInput
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type TujuanKarirNullableScalarRelationFilter = {
    is?: TujuanKarirWhereInput | null
    isNot?: TujuanKarirWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type HasilKonselingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SiswaCountOrderByAggregateInput = {
    nis?: SortOrder
    nama?: SortOrder
    email?: SortOrder
    kelasSaatIni?: SortOrder
    angkatan?: SortOrder
    jurusan?: SortOrder
    status?: SortOrder
    tahunLulusTarget?: SortOrder
    tujuanKarirSubmitted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SiswaAvgOrderByAggregateInput = {
    angkatan?: SortOrder
    tahunLulusTarget?: SortOrder
  }

  export type SiswaMaxOrderByAggregateInput = {
    nis?: SortOrder
    nama?: SortOrder
    email?: SortOrder
    kelasSaatIni?: SortOrder
    angkatan?: SortOrder
    jurusan?: SortOrder
    status?: SortOrder
    tahunLulusTarget?: SortOrder
    tujuanKarirSubmitted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SiswaMinOrderByAggregateInput = {
    nis?: SortOrder
    nama?: SortOrder
    email?: SortOrder
    kelasSaatIni?: SortOrder
    angkatan?: SortOrder
    jurusan?: SortOrder
    status?: SortOrder
    tahunLulusTarget?: SortOrder
    tujuanKarirSubmitted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SiswaSumOrderByAggregateInput = {
    angkatan?: SortOrder
    tahunLulusTarget?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusWithAggregatesFilter<$PrismaModel> | $Enums.Status
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusFilter<$PrismaModel>
    _max?: NestedEnumStatusFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumStatusKonselingFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusKonseling | EnumStatusKonselingFieldRefInput<$PrismaModel>
    in?: $Enums.StatusKonseling[] | ListEnumStatusKonselingFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusKonseling[] | ListEnumStatusKonselingFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusKonselingFilter<$PrismaModel> | $Enums.StatusKonseling
  }

  export type SiswaScalarRelationFilter = {
    is?: SiswaWhereInput
    isNot?: SiswaWhereInput
  }

  export type HasilKonselingCountOrderByAggregateInput = {
    id?: SortOrder
    nisSiswa?: SortOrder
    tanggalKonseling?: SortOrder
    hasilText?: SortOrder
    deskripsi?: SortOrder
    tindakLanjut?: SortOrder
    status?: SortOrder
    kategori?: SortOrder
    adminId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HasilKonselingMaxOrderByAggregateInput = {
    id?: SortOrder
    nisSiswa?: SortOrder
    tanggalKonseling?: SortOrder
    hasilText?: SortOrder
    deskripsi?: SortOrder
    tindakLanjut?: SortOrder
    status?: SortOrder
    kategori?: SortOrder
    adminId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HasilKonselingMinOrderByAggregateInput = {
    id?: SortOrder
    nisSiswa?: SortOrder
    tanggalKonseling?: SortOrder
    hasilText?: SortOrder
    deskripsi?: SortOrder
    tindakLanjut?: SortOrder
    status?: SortOrder
    kategori?: SortOrder
    adminId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumStatusKonselingWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusKonseling | EnumStatusKonselingFieldRefInput<$PrismaModel>
    in?: $Enums.StatusKonseling[] | ListEnumStatusKonselingFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusKonseling[] | ListEnumStatusKonselingFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusKonselingWithAggregatesFilter<$PrismaModel> | $Enums.StatusKonseling
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusKonselingFilter<$PrismaModel>
    _max?: NestedEnumStatusKonselingFilter<$PrismaModel>
  }

  export type TujuanKarirCountOrderByAggregateInput = {
    id?: SortOrder
    nisSiswa?: SortOrder
    kategoriUtama?: SortOrder
    ptn1?: SortOrder
    jurusan1?: SortOrder
    ptn2?: SortOrder
    jurusan2?: SortOrder
    ptn3?: SortOrder
    jurusan3?: SortOrder
    detailBekerja?: SortOrder
    detailWirausaha?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TujuanKarirMaxOrderByAggregateInput = {
    id?: SortOrder
    nisSiswa?: SortOrder
    kategoriUtama?: SortOrder
    ptn1?: SortOrder
    jurusan1?: SortOrder
    ptn2?: SortOrder
    jurusan2?: SortOrder
    ptn3?: SortOrder
    jurusan3?: SortOrder
    detailBekerja?: SortOrder
    detailWirausaha?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TujuanKarirMinOrderByAggregateInput = {
    id?: SortOrder
    nisSiswa?: SortOrder
    kategoriUtama?: SortOrder
    ptn1?: SortOrder
    jurusan1?: SortOrder
    ptn2?: SortOrder
    jurusan2?: SortOrder
    ptn3?: SortOrder
    jurusan3?: SortOrder
    detailBekerja?: SortOrder
    detailWirausaha?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SiswaCreateNestedOneWithoutUserInput = {
    create?: XOR<SiswaCreateWithoutUserInput, SiswaUncheckedCreateWithoutUserInput>
    connectOrCreate?: SiswaCreateOrConnectWithoutUserInput
    connect?: SiswaWhereUniqueInput
  }

  export type SiswaUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<SiswaCreateWithoutUserInput, SiswaUncheckedCreateWithoutUserInput>
    connectOrCreate?: SiswaCreateOrConnectWithoutUserInput
    connect?: SiswaWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type SiswaUpdateOneWithoutUserNestedInput = {
    create?: XOR<SiswaCreateWithoutUserInput, SiswaUncheckedCreateWithoutUserInput>
    connectOrCreate?: SiswaCreateOrConnectWithoutUserInput
    upsert?: SiswaUpsertWithoutUserInput
    disconnect?: SiswaWhereInput | boolean
    delete?: SiswaWhereInput | boolean
    connect?: SiswaWhereUniqueInput
    update?: XOR<XOR<SiswaUpdateToOneWithWhereWithoutUserInput, SiswaUpdateWithoutUserInput>, SiswaUncheckedUpdateWithoutUserInput>
  }

  export type SiswaUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<SiswaCreateWithoutUserInput, SiswaUncheckedCreateWithoutUserInput>
    connectOrCreate?: SiswaCreateOrConnectWithoutUserInput
    upsert?: SiswaUpsertWithoutUserInput
    disconnect?: SiswaWhereInput | boolean
    delete?: SiswaWhereInput | boolean
    connect?: SiswaWhereUniqueInput
    update?: XOR<XOR<SiswaUpdateToOneWithWhereWithoutUserInput, SiswaUpdateWithoutUserInput>, SiswaUncheckedUpdateWithoutUserInput>
  }

  export type HasilKonselingCreateNestedManyWithoutSiswaInput = {
    create?: XOR<HasilKonselingCreateWithoutSiswaInput, HasilKonselingUncheckedCreateWithoutSiswaInput> | HasilKonselingCreateWithoutSiswaInput[] | HasilKonselingUncheckedCreateWithoutSiswaInput[]
    connectOrCreate?: HasilKonselingCreateOrConnectWithoutSiswaInput | HasilKonselingCreateOrConnectWithoutSiswaInput[]
    createMany?: HasilKonselingCreateManySiswaInputEnvelope
    connect?: HasilKonselingWhereUniqueInput | HasilKonselingWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutSiswaInput = {
    create?: XOR<UserCreateWithoutSiswaInput, UserUncheckedCreateWithoutSiswaInput>
    connectOrCreate?: UserCreateOrConnectWithoutSiswaInput
    connect?: UserWhereUniqueInput
  }

  export type TujuanKarirCreateNestedOneWithoutSiswaInput = {
    create?: XOR<TujuanKarirCreateWithoutSiswaInput, TujuanKarirUncheckedCreateWithoutSiswaInput>
    connectOrCreate?: TujuanKarirCreateOrConnectWithoutSiswaInput
    connect?: TujuanKarirWhereUniqueInput
  }

  export type HasilKonselingUncheckedCreateNestedManyWithoutSiswaInput = {
    create?: XOR<HasilKonselingCreateWithoutSiswaInput, HasilKonselingUncheckedCreateWithoutSiswaInput> | HasilKonselingCreateWithoutSiswaInput[] | HasilKonselingUncheckedCreateWithoutSiswaInput[]
    connectOrCreate?: HasilKonselingCreateOrConnectWithoutSiswaInput | HasilKonselingCreateOrConnectWithoutSiswaInput[]
    createMany?: HasilKonselingCreateManySiswaInputEnvelope
    connect?: HasilKonselingWhereUniqueInput | HasilKonselingWhereUniqueInput[]
  }

  export type TujuanKarirUncheckedCreateNestedOneWithoutSiswaInput = {
    create?: XOR<TujuanKarirCreateWithoutSiswaInput, TujuanKarirUncheckedCreateWithoutSiswaInput>
    connectOrCreate?: TujuanKarirCreateOrConnectWithoutSiswaInput
    connect?: TujuanKarirWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumStatusFieldUpdateOperationsInput = {
    set?: $Enums.Status
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type HasilKonselingUpdateManyWithoutSiswaNestedInput = {
    create?: XOR<HasilKonselingCreateWithoutSiswaInput, HasilKonselingUncheckedCreateWithoutSiswaInput> | HasilKonselingCreateWithoutSiswaInput[] | HasilKonselingUncheckedCreateWithoutSiswaInput[]
    connectOrCreate?: HasilKonselingCreateOrConnectWithoutSiswaInput | HasilKonselingCreateOrConnectWithoutSiswaInput[]
    upsert?: HasilKonselingUpsertWithWhereUniqueWithoutSiswaInput | HasilKonselingUpsertWithWhereUniqueWithoutSiswaInput[]
    createMany?: HasilKonselingCreateManySiswaInputEnvelope
    set?: HasilKonselingWhereUniqueInput | HasilKonselingWhereUniqueInput[]
    disconnect?: HasilKonselingWhereUniqueInput | HasilKonselingWhereUniqueInput[]
    delete?: HasilKonselingWhereUniqueInput | HasilKonselingWhereUniqueInput[]
    connect?: HasilKonselingWhereUniqueInput | HasilKonselingWhereUniqueInput[]
    update?: HasilKonselingUpdateWithWhereUniqueWithoutSiswaInput | HasilKonselingUpdateWithWhereUniqueWithoutSiswaInput[]
    updateMany?: HasilKonselingUpdateManyWithWhereWithoutSiswaInput | HasilKonselingUpdateManyWithWhereWithoutSiswaInput[]
    deleteMany?: HasilKonselingScalarWhereInput | HasilKonselingScalarWhereInput[]
  }

  export type UserUpdateOneWithoutSiswaNestedInput = {
    create?: XOR<UserCreateWithoutSiswaInput, UserUncheckedCreateWithoutSiswaInput>
    connectOrCreate?: UserCreateOrConnectWithoutSiswaInput
    upsert?: UserUpsertWithoutSiswaInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSiswaInput, UserUpdateWithoutSiswaInput>, UserUncheckedUpdateWithoutSiswaInput>
  }

  export type TujuanKarirUpdateOneWithoutSiswaNestedInput = {
    create?: XOR<TujuanKarirCreateWithoutSiswaInput, TujuanKarirUncheckedCreateWithoutSiswaInput>
    connectOrCreate?: TujuanKarirCreateOrConnectWithoutSiswaInput
    upsert?: TujuanKarirUpsertWithoutSiswaInput
    disconnect?: TujuanKarirWhereInput | boolean
    delete?: TujuanKarirWhereInput | boolean
    connect?: TujuanKarirWhereUniqueInput
    update?: XOR<XOR<TujuanKarirUpdateToOneWithWhereWithoutSiswaInput, TujuanKarirUpdateWithoutSiswaInput>, TujuanKarirUncheckedUpdateWithoutSiswaInput>
  }

  export type HasilKonselingUncheckedUpdateManyWithoutSiswaNestedInput = {
    create?: XOR<HasilKonselingCreateWithoutSiswaInput, HasilKonselingUncheckedCreateWithoutSiswaInput> | HasilKonselingCreateWithoutSiswaInput[] | HasilKonselingUncheckedCreateWithoutSiswaInput[]
    connectOrCreate?: HasilKonselingCreateOrConnectWithoutSiswaInput | HasilKonselingCreateOrConnectWithoutSiswaInput[]
    upsert?: HasilKonselingUpsertWithWhereUniqueWithoutSiswaInput | HasilKonselingUpsertWithWhereUniqueWithoutSiswaInput[]
    createMany?: HasilKonselingCreateManySiswaInputEnvelope
    set?: HasilKonselingWhereUniqueInput | HasilKonselingWhereUniqueInput[]
    disconnect?: HasilKonselingWhereUniqueInput | HasilKonselingWhereUniqueInput[]
    delete?: HasilKonselingWhereUniqueInput | HasilKonselingWhereUniqueInput[]
    connect?: HasilKonselingWhereUniqueInput | HasilKonselingWhereUniqueInput[]
    update?: HasilKonselingUpdateWithWhereUniqueWithoutSiswaInput | HasilKonselingUpdateWithWhereUniqueWithoutSiswaInput[]
    updateMany?: HasilKonselingUpdateManyWithWhereWithoutSiswaInput | HasilKonselingUpdateManyWithWhereWithoutSiswaInput[]
    deleteMany?: HasilKonselingScalarWhereInput | HasilKonselingScalarWhereInput[]
  }

  export type TujuanKarirUncheckedUpdateOneWithoutSiswaNestedInput = {
    create?: XOR<TujuanKarirCreateWithoutSiswaInput, TujuanKarirUncheckedCreateWithoutSiswaInput>
    connectOrCreate?: TujuanKarirCreateOrConnectWithoutSiswaInput
    upsert?: TujuanKarirUpsertWithoutSiswaInput
    disconnect?: TujuanKarirWhereInput | boolean
    delete?: TujuanKarirWhereInput | boolean
    connect?: TujuanKarirWhereUniqueInput
    update?: XOR<XOR<TujuanKarirUpdateToOneWithWhereWithoutSiswaInput, TujuanKarirUpdateWithoutSiswaInput>, TujuanKarirUncheckedUpdateWithoutSiswaInput>
  }

  export type SiswaCreateNestedOneWithoutHasilKonselingInput = {
    create?: XOR<SiswaCreateWithoutHasilKonselingInput, SiswaUncheckedCreateWithoutHasilKonselingInput>
    connectOrCreate?: SiswaCreateOrConnectWithoutHasilKonselingInput
    connect?: SiswaWhereUniqueInput
  }

  export type EnumStatusKonselingFieldUpdateOperationsInput = {
    set?: $Enums.StatusKonseling
  }

  export type SiswaUpdateOneRequiredWithoutHasilKonselingNestedInput = {
    create?: XOR<SiswaCreateWithoutHasilKonselingInput, SiswaUncheckedCreateWithoutHasilKonselingInput>
    connectOrCreate?: SiswaCreateOrConnectWithoutHasilKonselingInput
    upsert?: SiswaUpsertWithoutHasilKonselingInput
    connect?: SiswaWhereUniqueInput
    update?: XOR<XOR<SiswaUpdateToOneWithWhereWithoutHasilKonselingInput, SiswaUpdateWithoutHasilKonselingInput>, SiswaUncheckedUpdateWithoutHasilKonselingInput>
  }

  export type SiswaCreateNestedOneWithoutTujuanKarirInput = {
    create?: XOR<SiswaCreateWithoutTujuanKarirInput, SiswaUncheckedCreateWithoutTujuanKarirInput>
    connectOrCreate?: SiswaCreateOrConnectWithoutTujuanKarirInput
    connect?: SiswaWhereUniqueInput
  }

  export type SiswaUpdateOneRequiredWithoutTujuanKarirNestedInput = {
    create?: XOR<SiswaCreateWithoutTujuanKarirInput, SiswaUncheckedCreateWithoutTujuanKarirInput>
    connectOrCreate?: SiswaCreateOrConnectWithoutTujuanKarirInput
    upsert?: SiswaUpsertWithoutTujuanKarirInput
    connect?: SiswaWhereUniqueInput
    update?: XOR<XOR<SiswaUpdateToOneWithWhereWithoutTujuanKarirInput, SiswaUpdateWithoutTujuanKarirInput>, SiswaUncheckedUpdateWithoutTujuanKarirInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusFilter<$PrismaModel> | $Enums.Status
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusWithAggregatesFilter<$PrismaModel> | $Enums.Status
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusFilter<$PrismaModel>
    _max?: NestedEnumStatusFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumStatusKonselingFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusKonseling | EnumStatusKonselingFieldRefInput<$PrismaModel>
    in?: $Enums.StatusKonseling[] | ListEnumStatusKonselingFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusKonseling[] | ListEnumStatusKonselingFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusKonselingFilter<$PrismaModel> | $Enums.StatusKonseling
  }

  export type NestedEnumStatusKonselingWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusKonseling | EnumStatusKonselingFieldRefInput<$PrismaModel>
    in?: $Enums.StatusKonseling[] | ListEnumStatusKonselingFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusKonseling[] | ListEnumStatusKonselingFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusKonselingWithAggregatesFilter<$PrismaModel> | $Enums.StatusKonseling
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusKonselingFilter<$PrismaModel>
    _max?: NestedEnumStatusKonselingFilter<$PrismaModel>
  }

  export type SiswaCreateWithoutUserInput = {
    nis: string
    nama: string
    kelasSaatIni?: string | null
    angkatan: number
    jurusan?: string | null
    status?: $Enums.Status
    tahunLulusTarget?: number | null
    tujuanKarirSubmitted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    hasilKonseling?: HasilKonselingCreateNestedManyWithoutSiswaInput
    tujuanKarir?: TujuanKarirCreateNestedOneWithoutSiswaInput
  }

  export type SiswaUncheckedCreateWithoutUserInput = {
    nis: string
    nama: string
    kelasSaatIni?: string | null
    angkatan: number
    jurusan?: string | null
    status?: $Enums.Status
    tahunLulusTarget?: number | null
    tujuanKarirSubmitted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    hasilKonseling?: HasilKonselingUncheckedCreateNestedManyWithoutSiswaInput
    tujuanKarir?: TujuanKarirUncheckedCreateNestedOneWithoutSiswaInput
  }

  export type SiswaCreateOrConnectWithoutUserInput = {
    where: SiswaWhereUniqueInput
    create: XOR<SiswaCreateWithoutUserInput, SiswaUncheckedCreateWithoutUserInput>
  }

  export type SiswaUpsertWithoutUserInput = {
    update: XOR<SiswaUpdateWithoutUserInput, SiswaUncheckedUpdateWithoutUserInput>
    create: XOR<SiswaCreateWithoutUserInput, SiswaUncheckedCreateWithoutUserInput>
    where?: SiswaWhereInput
  }

  export type SiswaUpdateToOneWithWhereWithoutUserInput = {
    where?: SiswaWhereInput
    data: XOR<SiswaUpdateWithoutUserInput, SiswaUncheckedUpdateWithoutUserInput>
  }

  export type SiswaUpdateWithoutUserInput = {
    nis?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    kelasSaatIni?: NullableStringFieldUpdateOperationsInput | string | null
    angkatan?: IntFieldUpdateOperationsInput | number
    jurusan?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    tahunLulusTarget?: NullableIntFieldUpdateOperationsInput | number | null
    tujuanKarirSubmitted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hasilKonseling?: HasilKonselingUpdateManyWithoutSiswaNestedInput
    tujuanKarir?: TujuanKarirUpdateOneWithoutSiswaNestedInput
  }

  export type SiswaUncheckedUpdateWithoutUserInput = {
    nis?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    kelasSaatIni?: NullableStringFieldUpdateOperationsInput | string | null
    angkatan?: IntFieldUpdateOperationsInput | number
    jurusan?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    tahunLulusTarget?: NullableIntFieldUpdateOperationsInput | number | null
    tujuanKarirSubmitted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hasilKonseling?: HasilKonselingUncheckedUpdateManyWithoutSiswaNestedInput
    tujuanKarir?: TujuanKarirUncheckedUpdateOneWithoutSiswaNestedInput
  }

  export type HasilKonselingCreateWithoutSiswaInput = {
    id?: string
    tanggalKonseling: Date | string
    hasilText: string
    deskripsi?: string | null
    tindakLanjut?: string | null
    status?: $Enums.StatusKonseling
    kategori?: string | null
    adminId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HasilKonselingUncheckedCreateWithoutSiswaInput = {
    id?: string
    tanggalKonseling: Date | string
    hasilText: string
    deskripsi?: string | null
    tindakLanjut?: string | null
    status?: $Enums.StatusKonseling
    kategori?: string | null
    adminId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HasilKonselingCreateOrConnectWithoutSiswaInput = {
    where: HasilKonselingWhereUniqueInput
    create: XOR<HasilKonselingCreateWithoutSiswaInput, HasilKonselingUncheckedCreateWithoutSiswaInput>
  }

  export type HasilKonselingCreateManySiswaInputEnvelope = {
    data: HasilKonselingCreateManySiswaInput | HasilKonselingCreateManySiswaInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutSiswaInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateWithoutSiswaInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCreateOrConnectWithoutSiswaInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSiswaInput, UserUncheckedCreateWithoutSiswaInput>
  }

  export type TujuanKarirCreateWithoutSiswaInput = {
    id?: string
    kategoriUtama: string
    ptn1?: string | null
    jurusan1?: string | null
    ptn2?: string | null
    jurusan2?: string | null
    ptn3?: string | null
    jurusan3?: string | null
    detailBekerja?: string | null
    detailWirausaha?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TujuanKarirUncheckedCreateWithoutSiswaInput = {
    id?: string
    kategoriUtama: string
    ptn1?: string | null
    jurusan1?: string | null
    ptn2?: string | null
    jurusan2?: string | null
    ptn3?: string | null
    jurusan3?: string | null
    detailBekerja?: string | null
    detailWirausaha?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TujuanKarirCreateOrConnectWithoutSiswaInput = {
    where: TujuanKarirWhereUniqueInput
    create: XOR<TujuanKarirCreateWithoutSiswaInput, TujuanKarirUncheckedCreateWithoutSiswaInput>
  }

  export type HasilKonselingUpsertWithWhereUniqueWithoutSiswaInput = {
    where: HasilKonselingWhereUniqueInput
    update: XOR<HasilKonselingUpdateWithoutSiswaInput, HasilKonselingUncheckedUpdateWithoutSiswaInput>
    create: XOR<HasilKonselingCreateWithoutSiswaInput, HasilKonselingUncheckedCreateWithoutSiswaInput>
  }

  export type HasilKonselingUpdateWithWhereUniqueWithoutSiswaInput = {
    where: HasilKonselingWhereUniqueInput
    data: XOR<HasilKonselingUpdateWithoutSiswaInput, HasilKonselingUncheckedUpdateWithoutSiswaInput>
  }

  export type HasilKonselingUpdateManyWithWhereWithoutSiswaInput = {
    where: HasilKonselingScalarWhereInput
    data: XOR<HasilKonselingUpdateManyMutationInput, HasilKonselingUncheckedUpdateManyWithoutSiswaInput>
  }

  export type HasilKonselingScalarWhereInput = {
    AND?: HasilKonselingScalarWhereInput | HasilKonselingScalarWhereInput[]
    OR?: HasilKonselingScalarWhereInput[]
    NOT?: HasilKonselingScalarWhereInput | HasilKonselingScalarWhereInput[]
    id?: StringFilter<"HasilKonseling"> | string
    nisSiswa?: StringFilter<"HasilKonseling"> | string
    tanggalKonseling?: DateTimeFilter<"HasilKonseling"> | Date | string
    hasilText?: StringFilter<"HasilKonseling"> | string
    deskripsi?: StringNullableFilter<"HasilKonseling"> | string | null
    tindakLanjut?: StringNullableFilter<"HasilKonseling"> | string | null
    status?: EnumStatusKonselingFilter<"HasilKonseling"> | $Enums.StatusKonseling
    kategori?: StringNullableFilter<"HasilKonseling"> | string | null
    adminId?: StringFilter<"HasilKonseling"> | string
    createdAt?: DateTimeFilter<"HasilKonseling"> | Date | string
    updatedAt?: DateTimeFilter<"HasilKonseling"> | Date | string
  }

  export type UserUpsertWithoutSiswaInput = {
    update: XOR<UserUpdateWithoutSiswaInput, UserUncheckedUpdateWithoutSiswaInput>
    create: XOR<UserCreateWithoutSiswaInput, UserUncheckedCreateWithoutSiswaInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSiswaInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSiswaInput, UserUncheckedUpdateWithoutSiswaInput>
  }

  export type UserUpdateWithoutSiswaInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutSiswaInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TujuanKarirUpsertWithoutSiswaInput = {
    update: XOR<TujuanKarirUpdateWithoutSiswaInput, TujuanKarirUncheckedUpdateWithoutSiswaInput>
    create: XOR<TujuanKarirCreateWithoutSiswaInput, TujuanKarirUncheckedCreateWithoutSiswaInput>
    where?: TujuanKarirWhereInput
  }

  export type TujuanKarirUpdateToOneWithWhereWithoutSiswaInput = {
    where?: TujuanKarirWhereInput
    data: XOR<TujuanKarirUpdateWithoutSiswaInput, TujuanKarirUncheckedUpdateWithoutSiswaInput>
  }

  export type TujuanKarirUpdateWithoutSiswaInput = {
    id?: StringFieldUpdateOperationsInput | string
    kategoriUtama?: StringFieldUpdateOperationsInput | string
    ptn1?: NullableStringFieldUpdateOperationsInput | string | null
    jurusan1?: NullableStringFieldUpdateOperationsInput | string | null
    ptn2?: NullableStringFieldUpdateOperationsInput | string | null
    jurusan2?: NullableStringFieldUpdateOperationsInput | string | null
    ptn3?: NullableStringFieldUpdateOperationsInput | string | null
    jurusan3?: NullableStringFieldUpdateOperationsInput | string | null
    detailBekerja?: NullableStringFieldUpdateOperationsInput | string | null
    detailWirausaha?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TujuanKarirUncheckedUpdateWithoutSiswaInput = {
    id?: StringFieldUpdateOperationsInput | string
    kategoriUtama?: StringFieldUpdateOperationsInput | string
    ptn1?: NullableStringFieldUpdateOperationsInput | string | null
    jurusan1?: NullableStringFieldUpdateOperationsInput | string | null
    ptn2?: NullableStringFieldUpdateOperationsInput | string | null
    jurusan2?: NullableStringFieldUpdateOperationsInput | string | null
    ptn3?: NullableStringFieldUpdateOperationsInput | string | null
    jurusan3?: NullableStringFieldUpdateOperationsInput | string | null
    detailBekerja?: NullableStringFieldUpdateOperationsInput | string | null
    detailWirausaha?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SiswaCreateWithoutHasilKonselingInput = {
    nis: string
    nama: string
    kelasSaatIni?: string | null
    angkatan: number
    jurusan?: string | null
    status?: $Enums.Status
    tahunLulusTarget?: number | null
    tujuanKarirSubmitted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutSiswaInput
    tujuanKarir?: TujuanKarirCreateNestedOneWithoutSiswaInput
  }

  export type SiswaUncheckedCreateWithoutHasilKonselingInput = {
    nis: string
    nama: string
    email?: string | null
    kelasSaatIni?: string | null
    angkatan: number
    jurusan?: string | null
    status?: $Enums.Status
    tahunLulusTarget?: number | null
    tujuanKarirSubmitted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tujuanKarir?: TujuanKarirUncheckedCreateNestedOneWithoutSiswaInput
  }

  export type SiswaCreateOrConnectWithoutHasilKonselingInput = {
    where: SiswaWhereUniqueInput
    create: XOR<SiswaCreateWithoutHasilKonselingInput, SiswaUncheckedCreateWithoutHasilKonselingInput>
  }

  export type SiswaUpsertWithoutHasilKonselingInput = {
    update: XOR<SiswaUpdateWithoutHasilKonselingInput, SiswaUncheckedUpdateWithoutHasilKonselingInput>
    create: XOR<SiswaCreateWithoutHasilKonselingInput, SiswaUncheckedCreateWithoutHasilKonselingInput>
    where?: SiswaWhereInput
  }

  export type SiswaUpdateToOneWithWhereWithoutHasilKonselingInput = {
    where?: SiswaWhereInput
    data: XOR<SiswaUpdateWithoutHasilKonselingInput, SiswaUncheckedUpdateWithoutHasilKonselingInput>
  }

  export type SiswaUpdateWithoutHasilKonselingInput = {
    nis?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    kelasSaatIni?: NullableStringFieldUpdateOperationsInput | string | null
    angkatan?: IntFieldUpdateOperationsInput | number
    jurusan?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    tahunLulusTarget?: NullableIntFieldUpdateOperationsInput | number | null
    tujuanKarirSubmitted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutSiswaNestedInput
    tujuanKarir?: TujuanKarirUpdateOneWithoutSiswaNestedInput
  }

  export type SiswaUncheckedUpdateWithoutHasilKonselingInput = {
    nis?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    kelasSaatIni?: NullableStringFieldUpdateOperationsInput | string | null
    angkatan?: IntFieldUpdateOperationsInput | number
    jurusan?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    tahunLulusTarget?: NullableIntFieldUpdateOperationsInput | number | null
    tujuanKarirSubmitted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tujuanKarir?: TujuanKarirUncheckedUpdateOneWithoutSiswaNestedInput
  }

  export type SiswaCreateWithoutTujuanKarirInput = {
    nis: string
    nama: string
    kelasSaatIni?: string | null
    angkatan: number
    jurusan?: string | null
    status?: $Enums.Status
    tahunLulusTarget?: number | null
    tujuanKarirSubmitted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    hasilKonseling?: HasilKonselingCreateNestedManyWithoutSiswaInput
    user?: UserCreateNestedOneWithoutSiswaInput
  }

  export type SiswaUncheckedCreateWithoutTujuanKarirInput = {
    nis: string
    nama: string
    email?: string | null
    kelasSaatIni?: string | null
    angkatan: number
    jurusan?: string | null
    status?: $Enums.Status
    tahunLulusTarget?: number | null
    tujuanKarirSubmitted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    hasilKonseling?: HasilKonselingUncheckedCreateNestedManyWithoutSiswaInput
  }

  export type SiswaCreateOrConnectWithoutTujuanKarirInput = {
    where: SiswaWhereUniqueInput
    create: XOR<SiswaCreateWithoutTujuanKarirInput, SiswaUncheckedCreateWithoutTujuanKarirInput>
  }

  export type SiswaUpsertWithoutTujuanKarirInput = {
    update: XOR<SiswaUpdateWithoutTujuanKarirInput, SiswaUncheckedUpdateWithoutTujuanKarirInput>
    create: XOR<SiswaCreateWithoutTujuanKarirInput, SiswaUncheckedCreateWithoutTujuanKarirInput>
    where?: SiswaWhereInput
  }

  export type SiswaUpdateToOneWithWhereWithoutTujuanKarirInput = {
    where?: SiswaWhereInput
    data: XOR<SiswaUpdateWithoutTujuanKarirInput, SiswaUncheckedUpdateWithoutTujuanKarirInput>
  }

  export type SiswaUpdateWithoutTujuanKarirInput = {
    nis?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    kelasSaatIni?: NullableStringFieldUpdateOperationsInput | string | null
    angkatan?: IntFieldUpdateOperationsInput | number
    jurusan?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    tahunLulusTarget?: NullableIntFieldUpdateOperationsInput | number | null
    tujuanKarirSubmitted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hasilKonseling?: HasilKonselingUpdateManyWithoutSiswaNestedInput
    user?: UserUpdateOneWithoutSiswaNestedInput
  }

  export type SiswaUncheckedUpdateWithoutTujuanKarirInput = {
    nis?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    kelasSaatIni?: NullableStringFieldUpdateOperationsInput | string | null
    angkatan?: IntFieldUpdateOperationsInput | number
    jurusan?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    tahunLulusTarget?: NullableIntFieldUpdateOperationsInput | number | null
    tujuanKarirSubmitted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hasilKonseling?: HasilKonselingUncheckedUpdateManyWithoutSiswaNestedInput
  }

  export type HasilKonselingCreateManySiswaInput = {
    id?: string
    tanggalKonseling: Date | string
    hasilText: string
    deskripsi?: string | null
    tindakLanjut?: string | null
    status?: $Enums.StatusKonseling
    kategori?: string | null
    adminId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HasilKonselingUpdateWithoutSiswaInput = {
    id?: StringFieldUpdateOperationsInput | string
    tanggalKonseling?: DateTimeFieldUpdateOperationsInput | Date | string
    hasilText?: StringFieldUpdateOperationsInput | string
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    tindakLanjut?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusKonselingFieldUpdateOperationsInput | $Enums.StatusKonseling
    kategori?: NullableStringFieldUpdateOperationsInput | string | null
    adminId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HasilKonselingUncheckedUpdateWithoutSiswaInput = {
    id?: StringFieldUpdateOperationsInput | string
    tanggalKonseling?: DateTimeFieldUpdateOperationsInput | Date | string
    hasilText?: StringFieldUpdateOperationsInput | string
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    tindakLanjut?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusKonselingFieldUpdateOperationsInput | $Enums.StatusKonseling
    kategori?: NullableStringFieldUpdateOperationsInput | string | null
    adminId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HasilKonselingUncheckedUpdateManyWithoutSiswaInput = {
    id?: StringFieldUpdateOperationsInput | string
    tanggalKonseling?: DateTimeFieldUpdateOperationsInput | Date | string
    hasilText?: StringFieldUpdateOperationsInput | string
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    tindakLanjut?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusKonselingFieldUpdateOperationsInput | $Enums.StatusKonseling
    kategori?: NullableStringFieldUpdateOperationsInput | string | null
    adminId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}