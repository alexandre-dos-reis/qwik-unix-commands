import { prisma } from "./db";

export const getNavCommands = async () => {
  return await prisma.command.findMany({
    where: {
      parentId: null,
      isActive: true,
      NOT: {
        children: {
          none: {},
        },
      },
    },
    select: {
      id: true,
      slug: true,
      tab: true,
    },
    orderBy: {
      sort: "asc",
    },
  });
};

export const getCommandBySlug = async (slug: string) => {
  return await prisma.command.findFirst({
    where: {
      slug,
      isActive: true,
      NOT: {
        children: {
          none: {},
        },
      },
    },
    select: {
      title: true,
      children: {
        orderBy: {
          sort: "asc",
        },
        select: {
          id: true,
          title: true,
          sort: true,
          content: true,
        },
      },
    },
  });
};
