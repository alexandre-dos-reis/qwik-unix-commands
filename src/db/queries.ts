import { db } from "./db";

export const getNavCommands = async () => {
  return await db.command.findMany({
    where: {
      parentId: null,
      isAactive: true,
    },
    select: {
      id: true,
      slug: true,
      title: true,
      tab: true,
    },
  });
};
