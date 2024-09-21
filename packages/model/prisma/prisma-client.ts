import { PrismaClient } from "./generated/client";
import slugify from "slugify";
import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool } from "@neondatabase/serverless";

const randomString = () => Math.random().toString(36).substring(2, 7);

const neon = new Pool({ connectionString: process.env.POSTGRES_PRISMA_URL });
const adapter = new PrismaNeon(neon);

const createSlug = ({ model, operation, args, query }: any) => {
  const slug = `${slugify(args.data.name, { lower: true, trim: true })}-${randomString()}`;
  args.data = { ...args.data, slug };
  return query(args);
};

const prisma = new PrismaClient({ adapter }).$extends({
  query: {
    business: {
      create: createSlug,
    },
    product: {
      create: createSlug,
    },
    category: {
      create: createSlug,
    },
  },
});

export default prisma;
