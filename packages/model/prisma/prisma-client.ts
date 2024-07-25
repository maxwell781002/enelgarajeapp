import { PrismaClient } from '@prisma/client'
import slugify from 'slugify'

const randomString = () => Math.random().toString(36).substring(2, 7)

const createSlug = ({ model, operation, args, query }: any) => {
  const slug = `${slugify(args.data.name, { lower: true, trim: true })}-${randomString()}`
  args.data = { ...args.data, slug }
  return query(args)
}

const prisma = new PrismaClient().$extends({
  query: {
    business: {
      create: createSlug,
    },
    plate: {
      create: createSlug,
    },
    category: {
      create: createSlug,
    },
  },
})

export default prisma
