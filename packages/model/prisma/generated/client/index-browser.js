
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.19.1
 * Query Engine version: 69d742ee20b815d88e17e54db4a2a7a3b30324e3
 */
Prisma.prismaVersion = {
  client: "5.19.1",
  engine: "69d742ee20b815d88e17e54db4a2a7a3b30324e3"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

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
  phone: 'phone',
  howToArrive: 'howToArrive',
  coordinates: 'coordinates',
  slug: 'slug',
  active: 'active',
  requestAddress: 'requestAddress',
  plan: 'plan',
  sendOrderToWhatsapp: 'sendOrderToWhatsapp',
  defaultPaymentMethodId: 'defaultPaymentMethodId'
};

exports.Prisma.TelegramBusinessScalarFieldEnum = {
  id: 'id',
  groupId: 'groupId',
  invitationLink: 'invitationLink',
  businessId: 'businessId'
};

exports.Prisma.PaymentMethodScalarFieldEnum = {
  id: 'id',
  name: 'name',
  type: 'type',
  data: 'data',
  businessId: 'businessId'
};

exports.Prisma.CategoryScalarFieldEnum = {
  id: 'id',
  name: 'name',
  slug: 'slug',
  active: 'active',
  priority: 'priority',
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
  active: 'active',
  isNew: 'isNew',
  priority: 'priority',
  stock: 'stock',
  allowOrderOutOfStock: 'allowOrderOutOfStock',
  isExhaustible: 'isExhaustible',
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

exports.Prisma.UserBusinessScalarFieldEnum = {
  userId: 'userId',
  businessId: 'businessId',
  type: 'type'
};

exports.Prisma.InvitationLinkScalarFieldEnum = {
  id: 'id',
  code: 'code',
  businessId: 'businessId',
  createdAt: 'createdAt'
};

exports.Prisma.OrderScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  productsDetails: 'productsDetails',
  shipping: 'shipping',
  hasShipping: 'hasShipping',
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

exports.Prisma.AddressScalarFieldEnum = {
  id: 'id',
  alias: 'alias',
  name: 'name',
  address: 'address',
  city: 'city',
  state: 'state',
  reference: 'reference',
  neighborhoodId: 'neighborhoodId'
};

exports.Prisma.NeighborhoodScalarFieldEnum = {
  id: 'id',
  name: 'name',
  city: 'city'
};

exports.Prisma.UserAddressScalarFieldEnum = {
  id: 'id',
  addressId: 'addressId',
  userId: 'userId',
  businessId: 'businessId'
};

exports.Prisma.OrderAddressScalarFieldEnum = {
  id: 'id',
  addressId: 'addressId',
  orderId: 'orderId'
};

exports.Prisma.BusinessNeighborhoodScalarFieldEnum = {
  id: 'id',
  shipping: 'shipping',
  active: 'active',
  businessId: 'businessId',
  neighborhoodId: 'neighborhoodId'
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
exports.BusinessPlan = exports.$Enums.BusinessPlan = {
  BASIC: 'BASIC',
  ENTERPRISE: 'ENTERPRISE'
};

exports.PaymentMethodType = exports.$Enums.PaymentMethodType = {
  TRANSFERMOVIL: 'TRANSFERMOVIL',
  ENZONA: 'ENZONA'
};

exports.UserRoles = exports.$Enums.UserRoles = {
  USER: 'USER',
  ADMIN: 'ADMIN'
};

exports.UserBusinessType = exports.$Enums.UserBusinessType = {
  OWNER: 'OWNER',
  COLLABORATOR: 'COLLABORATOR'
};

exports.OrderStatus = exports.$Enums.OrderStatus = {
  CREATED: 'CREATED',
  SEND: 'SEND',
  PAYED: 'PAYED',
  REJECTED: 'REJECTED'
};

exports.Prisma.ModelName = {
  Business: 'Business',
  TelegramBusiness: 'TelegramBusiness',
  PaymentMethod: 'PaymentMethod',
  Category: 'Category',
  Product: 'Product',
  User: 'User',
  UserBusiness: 'UserBusiness',
  InvitationLink: 'InvitationLink',
  Order: 'Order',
  OrderProduct: 'OrderProduct',
  Account: 'Account',
  Session: 'Session',
  VerificationToken: 'VerificationToken',
  Authenticator: 'Authenticator',
  Address: 'Address',
  Neighborhood: 'Neighborhood',
  UserAddress: 'UserAddress',
  OrderAddress: 'OrderAddress',
  BusinessNeighborhood: 'BusinessNeighborhood'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
