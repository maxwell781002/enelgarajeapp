
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime
} = require('./runtime/wasm.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.13.0
 * Query Engine version: b9a39a7ee606c28e3455d0fd60e78c3ba82b1a2b
 */
Prisma.prismaVersion = {
  client: "5.13.0",
  engine: "b9a39a7ee606c28e3455d0fd60e78c3ba82b1a2b"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.NotFoundError = NotFoundError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.BusinessScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  address: 'address',
  howToArrive: 'howToArrive',
  coordinates: 'coordinates',
  slug: 'slug'
};

exports.Prisma.CategoryScalarFieldEnum = {
  id: 'id',
  name: 'name',
  slug: 'slug',
  businessId: 'businessId'
};

exports.Prisma.ProductScalarFieldEnum = {
  id: 'id',
  name: 'name',
  slug: 'slug',
  image: 'image',
  description: 'description',
  price: 'price',
  offerPrice: 'offerPrice',
  images: 'images',
  businessId: 'businessId',
  categoryId: 'categoryId'
};

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  role: 'role',
  name: 'name',
  phone: 'phone',
  email: 'email',
  emailVerified: 'emailVerified',
  image: 'image',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.OrderScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  productsDetails: 'productsDetails',
  total: 'total',
  status: 'status',
  sentAt: 'sentAt',
  position: 'position',
  businessId: 'businessId',
  identifier: 'identifier'
};

exports.Prisma.OrderProductScalarFieldEnum = {
  productId: 'productId',
  orderId: 'orderId',
  price: 'price',
  position: 'position',
  quantity: 'quantity'
};

exports.Prisma.AccountScalarFieldEnum = {
  userId: 'userId',
  type: 'type',
  provider: 'provider',
  providerAccountId: 'providerAccountId',
  refresh_token: 'refresh_token',
  access_token: 'access_token',
  expires_at: 'expires_at',
  token_type: 'token_type',
  scope: 'scope',
  id_token: 'id_token',
  session_state: 'session_state',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SessionScalarFieldEnum = {
  sessionToken: 'sessionToken',
  userId: 'userId',
  expires: 'expires',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.VerificationTokenScalarFieldEnum = {
  identifier: 'identifier',
  token: 'token',
  expires: 'expires'
};

exports.Prisma.AuthenticatorScalarFieldEnum = {
  credentialID: 'credentialID',
  userId: 'userId',
  providerAccountId: 'providerAccountId',
  credentialPublicKey: 'credentialPublicKey',
  counter: 'counter',
  credentialDeviceType: 'credentialDeviceType',
  credentialBackedUp: 'credentialBackedUp',
  transports: 'transports'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};
exports.UserRoles = exports.$Enums.UserRoles = {
  USER: 'USER',
  ADMIN: 'ADMIN'
};

exports.OrderStatus = exports.$Enums.OrderStatus = {
  CREATED: 'CREATED',
  SEND: 'SEND',
  PAYED: 'PAYED',
  REJECTED: 'REJECTED'
};

exports.Prisma.ModelName = {
  Business: 'Business',
  Category: 'Category',
  Product: 'Product',
  User: 'User',
  Order: 'Order',
  OrderProduct: 'OrderProduct',
  Account: 'Account',
  Session: 'Session',
  VerificationToken: 'VerificationToken',
  Authenticator: 'Authenticator'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "/home/renier/Development/DESARROLLO/CATALOG/catalog/packages/model/prisma/generated/client",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "debian-openssl-1.0.x",
        "native": true
      }
    ],
    "previewFeatures": [
      "driverAdapters"
    ],
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null,
    "schemaEnvPath": "../../../.env"
  },
  "relativePath": "../..",
  "clientVersion": "5.13.0",
  "engineVersion": "b9a39a7ee606c28e3455d0fd60e78c3ba82b1a2b",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "POSTGRES_PRISMA_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider        = \"prisma-client-js\"\n  output          = \"./generated/client\"\n  previewFeatures = [\"driverAdapters\"]\n}\n\ngenerator zod {\n  provider = \"zod-prisma\"\n}\n\ndatasource db {\n  provider  = \"postgresql\"\n  url       = env(\"POSTGRES_PRISMA_URL\") // uses connection pooling\n  directUrl = env(\"POSTGRES_URL_NON_POOLING\") // uses a direct connection\n}\n\nmodel Business {\n  id          String  @id @default(uuid())\n  name        String\n  description String?\n  address     String?\n  howToArrive String?\n  coordinates Float[]\n  slug        String? @unique\n\n  categories Category[]\n  products   Product[]\n  orders     Order[]\n}\n\nmodel Category {\n  id       String    @id @default(uuid())\n  name     String /// @zod.min(1, { message: \"required\" })\n  slug     String?   @unique\n  products Product[]\n\n  business   Business @relation(fields: [businessId], references: [id])\n  businessId String\n}\n\nmodel Product {\n  id          String   @id @default(uuid())\n  name        String\n  slug        String?  @unique\n  image       String\n  description String\n  price       Int\n  offerPrice  Int?\n  images      String[]\n\n  business   Business       @relation(fields: [businessId], references: [id])\n  businessId String\n  category   Category       @relation(fields: [categoryId], references: [id])\n  categoryId String\n  orderItems OrderProduct[]\n}\n\nmodel User {\n  id            String          @id @default(uuid())\n  role          UserRoles       @default(USER)\n  name          String?\n  phone         String?\n  orders        Order[]\n  email         String          @unique\n  emailVerified DateTime?\n  image         String?\n  accounts      Account[]\n  sessions      Session[]\n  // Optional for WebAuthn support\n  Authenticator Authenticator[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel Order {\n  id              String         @id @default(uuid())\n  user            User?          @relation(fields: [userId], references: [id])\n  userId          String?\n  items           OrderProduct[]\n  productsDetails Json\n  total           Int            @default(0)\n  status          OrderStatus    @default(CREATED)\n  sentAt          DateTime?\n  position        Int?\n  business        Business?      @relation(fields: [businessId], references: [id])\n  businessId      String?\n  identifier      String?\n}\n\nmodel OrderProduct {\n  product   Product @relation(fields: [productId], references: [id])\n  productId String // relation scalar field (used in the `@relation` attribute above)\n  order     Order   @relation(fields: [orderId], references: [id])\n  orderId   String // relation scalar field (used in the `@relation` attribute above)\n  price     Int\n  position  Int     @default(1)\n\n  quantity Int\n\n  @@id([productId, orderId])\n}\n\nenum UserRoles {\n  USER\n  ADMIN\n}\n\nenum OrderStatus {\n  CREATED\n  SEND\n  PAYED\n  REJECTED\n}\n\nmodel Account {\n  userId            String\n  type              String\n  provider          String\n  providerAccountId String\n  refresh_token     String?\n  access_token      String?\n  expires_at        Int?\n  token_type        String?\n  scope             String?\n  id_token          String?\n  session_state     String?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  user User @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@id([provider, providerAccountId])\n}\n\nmodel Session {\n  sessionToken String   @unique\n  userId       String\n  expires      DateTime\n  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel VerificationToken {\n  identifier String\n  token      String\n  expires    DateTime\n\n  @@id([identifier, token])\n}\n\n// Optional for WebAuthn support\nmodel Authenticator {\n  credentialID         String  @unique\n  userId               String\n  providerAccountId    String\n  credentialPublicKey  String\n  counter              Int\n  credentialDeviceType String\n  credentialBackedUp   Boolean\n  transports           String?\n\n  user User @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@id([userId, credentialID])\n}\n",
  "inlineSchemaHash": "ae917280238ec1d534a949ec7ec40693102224759ae65b6c4ffcffe61dda6b15",
  "copyEngine": true
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"Business\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"address\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"howToArrive\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"coordinates\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"slug\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"categories\",\"kind\":\"object\",\"type\":\"Category\",\"relationName\":\"BusinessToCategory\"},{\"name\":\"products\",\"kind\":\"object\",\"type\":\"Product\",\"relationName\":\"BusinessToProduct\"},{\"name\":\"orders\",\"kind\":\"object\",\"type\":\"Order\",\"relationName\":\"BusinessToOrder\"}],\"dbName\":null},\"Category\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"slug\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"products\",\"kind\":\"object\",\"type\":\"Product\",\"relationName\":\"CategoryToProduct\"},{\"name\":\"business\",\"kind\":\"object\",\"type\":\"Business\",\"relationName\":\"BusinessToCategory\"},{\"name\":\"businessId\",\"kind\":\"scalar\",\"type\":\"String\"}],\"dbName\":null},\"Product\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"slug\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"image\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"price\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"offerPrice\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"images\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"business\",\"kind\":\"object\",\"type\":\"Business\",\"relationName\":\"BusinessToProduct\"},{\"name\":\"businessId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"category\",\"kind\":\"object\",\"type\":\"Category\",\"relationName\":\"CategoryToProduct\"},{\"name\":\"categoryId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"orderItems\",\"kind\":\"object\",\"type\":\"OrderProduct\",\"relationName\":\"OrderProductToProduct\"}],\"dbName\":null},\"User\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"role\",\"kind\":\"enum\",\"type\":\"UserRoles\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"phone\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"orders\",\"kind\":\"object\",\"type\":\"Order\",\"relationName\":\"OrderToUser\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"emailVerified\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"image\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"accounts\",\"kind\":\"object\",\"type\":\"Account\",\"relationName\":\"AccountToUser\"},{\"name\":\"sessions\",\"kind\":\"object\",\"type\":\"Session\",\"relationName\":\"SessionToUser\"},{\"name\":\"Authenticator\",\"kind\":\"object\",\"type\":\"Authenticator\",\"relationName\":\"AuthenticatorToUser\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"Order\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"OrderToUser\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"items\",\"kind\":\"object\",\"type\":\"OrderProduct\",\"relationName\":\"OrderToOrderProduct\"},{\"name\":\"productsDetails\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"total\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"status\",\"kind\":\"enum\",\"type\":\"OrderStatus\"},{\"name\":\"sentAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"position\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"business\",\"kind\":\"object\",\"type\":\"Business\",\"relationName\":\"BusinessToOrder\"},{\"name\":\"businessId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"identifier\",\"kind\":\"scalar\",\"type\":\"String\"}],\"dbName\":null},\"OrderProduct\":{\"fields\":[{\"name\":\"product\",\"kind\":\"object\",\"type\":\"Product\",\"relationName\":\"OrderProductToProduct\"},{\"name\":\"productId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"order\",\"kind\":\"object\",\"type\":\"Order\",\"relationName\":\"OrderToOrderProduct\"},{\"name\":\"orderId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"price\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"position\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"quantity\",\"kind\":\"scalar\",\"type\":\"Int\"}],\"dbName\":null},\"Account\":{\"fields\":[{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"type\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"provider\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"providerAccountId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"refresh_token\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"access_token\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"expires_at\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"token_type\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"scope\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"id_token\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"session_state\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"AccountToUser\"}],\"dbName\":null},\"Session\":{\"fields\":[{\"name\":\"sessionToken\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"expires\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"SessionToUser\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"VerificationToken\":{\"fields\":[{\"name\":\"identifier\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"token\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"expires\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"Authenticator\":{\"fields\":[{\"name\":\"credentialID\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"providerAccountId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"credentialPublicKey\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"counter\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"credentialDeviceType\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"credentialBackedUp\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"transports\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"AuthenticatorToUser\"}],\"dbName\":null}},\"enums\":{},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = {
  getRuntime: () => require('./query_engine_bg.js'),
  getQueryEngineWasmModule: async () => {
    return (await import('#wasm-engine-loader')).default
  }
}

config.injectableEdgeEnv = () => ({
  parsed: {
    POSTGRES_PRISMA_URL: typeof globalThis !== 'undefined' && globalThis['POSTGRES_PRISMA_URL'] || typeof process !== 'undefined' && process.env && process.env.POSTGRES_PRISMA_URL || undefined
  }
})

if (typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined) {
  Debug.enable(typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined)
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

