import { PrismaClient } from '@prisma/client'
import sampleData from './sample-data/data.js'
const prisma = new PrismaClient()

async function createBusiness(name) {
  const business = await prisma.business.create({
    data: {
      name,
    },
  })
  return Promise.all(sampleData.map(({ plates, ...category }) => prisma.category.create({
    data: {
      ...category,
      businessId: business.id,
      plates: {
        create: plates.map((plate) => ({
          ...plate,
          businessId: business.id,
        })),
      }
    },
  })))
}

async function main() {
  await createBusiness('La cueva del pirata')
  await createBusiness('Nápoles')
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