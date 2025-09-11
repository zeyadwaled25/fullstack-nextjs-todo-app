import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function main() {
  await prisma.todo.createMany({
    data: Array.from({ length: 10 }, () => ({
      title: faker.lorem.text(),
      body: faker.lorem.paragraph(),
    }))
  })  
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