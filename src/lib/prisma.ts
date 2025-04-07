// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client'

// PrismaClientSingleton ensures we reuse database connections
class PrismaClientSingleton {
  private static instance: PrismaClient;

  public static getInstance(): PrismaClient {
    if (!PrismaClientSingleton.instance) {
      PrismaClientSingleton.instance = new PrismaClient({
        log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
      });
    }
    return PrismaClientSingleton.instance;
  }
}

// Fallback implementation for builds without a database
class MockPrismaClient {
  incident = {
    findMany: async () => [],
    create: async () => ({}),
    findUnique: async () => null,
    count: async () => 0,
  }
  
  legislation = {
    findMany: async () => [],
    create: async () => ({}),
    findUnique: async () => null,
    count: async () => 0,
  }
  
  consultation = {
    findMany: async () => [],
    create: async () => ({}),
    findUnique: async () => null,
    count: async () => 0,
  }
  
  category = {
    findMany: async () => [],
    create: async () => ({}),
  }
  
  user = {
    findMany: async () => [],
    create: async () => ({}),
    findUnique: async () => null,
    upsert: async () => ({}),
  }
  
  $queryRaw: async () => [],
  $disconnect: async () => {},
}

// For faster testing, use this flag to force mock mode
const FORCE_MOCK = false;

// Check if we have a valid database connection
const hasDatabaseUrl = !!process.env.DATABASE_URL && !FORCE_MOCK;

// Global type for Prisma
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Export the appropriate client
export const prisma = globalForPrisma.prisma || (
  hasDatabaseUrl 
    ? PrismaClientSingleton.getInstance()
    : new MockPrismaClient() as unknown as PrismaClient
);

// Set the prisma instance on the global object in development
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;