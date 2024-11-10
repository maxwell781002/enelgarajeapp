import { PrismaClient } from "./generated/client";
import slugify from "slugify";
import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool } from "@neondatabase/serverless";

const randomString = () => Math.random().toString(36).substring(2, 7);

const neon = new Pool({ connectionString: process.env.POSTGRES_PRISMA_URL });
const adapter = new PrismaNeon(neon);

export const createSlug = ({ args, query }: any) => {
  if (!args.data?.name) return query(args);
  const name = args.data.name.replace(/[*+~%\<>/;.(){}?,'"!:@#^|]/g, "-");
  let slug = slugify(name, { strict: true, lower: true, trim: true });
  slug = `${slug}-${randomString()}`;
  args.data = { ...args.data, slug };
  return query(args);
};

const _prisma = new PrismaClient({ adapter }).$extends({
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
