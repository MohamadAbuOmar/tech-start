import { PrismaClient } from "@prisma/client"

// Prevent multiple instances of Prisma Client in development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const runtime = 'nodejs'

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: ['error', 'warn']
  })
}

const db = globalForPrisma.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db

export default db
