import { PrismaClient } from '../../generated/prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
const globalPourPrisma = globalThis

function creerClient() {
  const adapter = new PrismaNeon({
    connectionString: process.env.DATABASE_URL,
  })
  return new PrismaClient({ adapter })
}

export const prisma = globalPourPrisma.prisma ?? creerClient()

if (process.env.NODE_ENV !== 'production') {
  globalPourPrisma.prisma = prisma
}