import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const resolvers = {
    Query: {
        users: async () => {
            return prisma.user.findMany();
        },
        userById: async (parent, args, context, info) => {
            return prisma.user.findUnique({ where: { id: parseInt(args.id, 10) } });
        },
    }
}

export default resolvers;