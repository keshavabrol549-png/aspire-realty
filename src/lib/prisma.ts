let prisma: any;

if (process.env.NODE_ENV === 'production') {
  prisma = require('@prisma/client').PrismaClient;
} else {
  if (!global.prisma) {
    global.prisma = new (require('@prisma/client').PrismaClient)();
  }
  prisma = global.prisma;
}

export { prisma };
