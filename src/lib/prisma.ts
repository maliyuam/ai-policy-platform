// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';

// Declare global variable for PrismaClient
declare global {
  var prisma: PrismaClient | undefined;
}

// Create a simple mock client for when database is not available
const createMockPrismaClient = () => {
  return {
    user: {
      findUnique: async () => null,
      create: async () => ({ id: 'mock-id', name: 'Mock User', email: 'mock@example.com' }),
      upsert: async () => ({ id: 'mock-id', name: 'Mock User', email: 'mock@example.com' }),
    },
    incident: {
      findMany: async () => [],
      count: async () => 0,
    },
    legislation: {
      findMany: async () => [],
      count: async () => 0,
    },
    consultation: {
      findMany: async () => [],
      count: async () => 0,
    },
    category: {
      findMany: async () => [],
    },
    $connect: async () => {},
    $disconnect: async () => {},
  } as unknown as PrismaClient;
};

// Initialize PrismaClient (or use global instance in development)
export const prisma = global.prisma || (() => {
  // Check if DATABASE_URL is defined
  if (!process.env.DATABASE_URL) {
    console.warn('DATABASE_URL not found. Using mock PrismaClient');
    return createMockPrismaClient();
  }
  
  try {
    const client = new PrismaClient({
      log: ['error'],
    });
    return client;
  } catch (error) {
    console.error('Failed to initialize PrismaClient:', error);
    return createMockPrismaClient();
  }
})();

// Save to global object in development to prevent multiple instances
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}