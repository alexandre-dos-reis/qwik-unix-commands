import { z } from "zod";
import * as dotenv from "dotenv";
import { logError, logSuccess, logWarn, inspect } from "./helpers/logger";
import { gql, GraphQLClient } from "graphql-request";
import { db } from "../src/db/db";

interface LegacyCommandQuery {
  commands: {
    title: string;
    slug: string;
    tab: string;
    description: string;
    cmd_order: number | null;
    image: string | null;
    sub_commands: {
      sign: string | null;
      item: string;
      info: string;
      sort: number | null;
    }[];
  }[];
}

(async () => {
  dotenv.config({
    path: ".env.local",
  });

  const env = z
    .object({
      LEGACY_GRAPHQL_ENDPOINT: z.string().min(1).url(),
      LEGACY_GRAPHQL_TOKEN: z.string().min(1),
    })
    .safeParse(process.env);

  if (!env.success) {
    logError("❌ Invalid environment variables:\n");
    throw new Error("Invalid environment variables");
  }

  const ENV = env.data;

  const client = new GraphQLClient(ENV.LEGACY_GRAPHQL_ENDPOINT, {
    headers: {
      authorization: `Bearer ${ENV.LEGACY_GRAPHQL_TOKEN}`,
    },
  });

  const { commands }: LegacyCommandQuery = await client.request(gql`
    {
      commands {
        title
        slug
        tab
        image
        description
        cmd_order
        sub_commands {
          item
          info
          sort
          sign
        }
      }
    }
  `);

  commands.forEach(async (c) => {
    const command = await db.command.create({
      data: {
        title: c.title,
        tab: c.tab,
        slug: c.slug,
        content: c.description,
        image: c.image,
        parentId: null,
        sort: c.cmd_order,
        isActive: true,
      },
    });

    c.sub_commands.forEach(async (sc) => {
      await db.command.create({
        data: {
          title: sc.item,
          content: sc.info,
          env: sc.sign || "",
          sort: sc.sort,
          parentId: command.id,
          isActive: true,
        },
      });
    });
  });

  // logWarn(inspect(legacyData));
})();
