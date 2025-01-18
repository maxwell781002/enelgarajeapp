import { PrismaClient } from "./generated/client";
import slugify from "slugify";
import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";

const connectionString = process.env.POSTGRES_PRISMA_URL as string;

neonConfig.fetchEndpoint = (host) => {
  const [protocol, port] =
    host === "db.localtest.me" ? ["http", 4444] : ["https", 443];
  return `${protocol}://${host}:${port}/sql`;
};
const connectionStringUrl = new URL(connectionString);
neonConfig.useSecureWebSocket =
  connectionStringUrl.hostname !== "db.localtest.me";
neonConfig.wsProxy =
  connectionStringUrl.hostname === "db.localtest.me"
    ? (host) => `${host}:4444/v1`
    : undefined;
neonConfig.webSocketConstructor = ws; // when using Node.js

const randomString = () => Math.random().toString(36).substring(2, 7);

export const createSlug = ({ args, query }: any) => {
  if (!args.data?.name) return query(args);
  const name = args.data.name.replace(/[*+~%\<>/;.(){}?,'"!:@#^|]/g, "-");
  let slug = slugify(name, { strict: true, lower: true, trim: true });
  slug = `${slug}-${randomString()}`;
  args.data = { ...args.data, slug };
  return query(args);
};

const neon = new Pool({ connectionString });
const adapter = new PrismaNeon(neon);
const _prismaBase =
  process.env.TEST === "true"
    ? new PrismaClient()
    : new PrismaClient({ adapter });
const _prisma = _prismaBase.$extends({
  query: {
    product: {
      create: createSlug,
    },
    category: {
      create: createSlug,
    },
  },
});

export const Prisma = _prisma;

let currentPrismaClient = _prisma;

export const transaction = (callback: any) =>
  Prisma.$transaction(async (tx: any) => {
    currentPrismaClient = tx;
    return callback(tx)
      .then((result: any) => {
        currentPrismaClient = _prisma;
        return result;
      })
      .catch((error: any) => {
        currentPrismaClient = _prisma;
        throw error;
      });
  });

export default () => currentPrismaClient;
