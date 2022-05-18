import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  log : ['query'] //a cada alteração no prisma, log algo
});