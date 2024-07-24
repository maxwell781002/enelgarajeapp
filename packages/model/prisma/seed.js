import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const business = {
  'La cueva del pirata': {
    categories: [
      {
        name: 'Entrantes',
      }
    ]
  }
}

async function main() {
  const promises = Object.entries(business).map(async ([name, { categories }]) => prisma.business.create({
    data: {
      name,
      categories: {
        create: categories,
      }
    },
  }))
  return Promise.all(promises)
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })