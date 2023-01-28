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
  });
};

export const getCommandBySlug = async (slug: string) => {
  return await db.command.findUnique({
    where: {
      slug,
    },
    select: {
      title: true,
    },
  });
};
