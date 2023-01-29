import { db } from "./db";

export const getNavCommands = async () => {
  return await db.command.findMany({
    where: {
      parentId: null,
      isActive: true,
    },
    select: {
      id: true,
      slug: true,
      title: true,
      tab: true,
    },
    orderBy: {
      sort: "asc",
    },
  });
};

export const getCommandBySlug = async (slug: string) => {
  return await db.command.findUnique({
    where: {
      slug,
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
        },
      },
    },
  });
};
