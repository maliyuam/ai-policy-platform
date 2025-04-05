// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client'

// Create a singleton Prisma instance
const globalForPrisma = global as unknown as { prisma: PrismaClient }

// Create a mock PrismaClient if we're in a build environment without a database
class MockPrismaClient {
  incident = {
    findMany: async () => [],
    create: async () => ({}),
    findUnique: async () => null,
  }
  legislation = {
    findMany: async () => [],
    create: async () => ({}),
    findUnique: async () => null,
  }
  consultation = {
    findMany: async () => [],
    create: async () => ({}),
    findUnique: async () => null,
  }
  category = {
    findMany: async () => [],
    create: async () => ({}),
  }
  user = {
    findMany: async () => [],
    create: async () => ({}),
  }
  // Add other models as needed
}

// Detect if we have a valid database connection string
const hasDatabaseUrl = !!process.env.DATABASE_URL

// Create the client
export const prisma = globalForPrisma.prisma || (
  hasDatabaseUrl 
    ? new PrismaClient({
        log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
      })
    : new MockPrismaClient() as unknown as PrismaClient
)

// Set the Prisma instance to the global object in development
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma