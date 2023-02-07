import { component$ } from "@builder.io/qwik";
import { loader$, StaticGenerateHandler } from "@builder.io/qwik-city";
import { getCommandBySlug, getNavCommands } from "~/db/queries";

export const getCommandLoader = loader$((req) => getCommandBySlug(req.params.slug));

export default component$(() => {
  const { value: command } = getCommandLoader.use();
  return (
    <>
      <h1 class="text-center mb-5 text-3xl">{command?.title}</h1>
      <ul>
        {command?.children.map((c) => (
          <li class="flex gap-5">
            <button>click</button>
            <div>
              {c.sort} {c.title}
            </div>
            <div>{c.content}</div>
          </li>
        ))}
      </ul>
    </>
  );
});

export const onStaticGenerate: StaticGenerateHandler = async () => {
  const navCommands = await getNavCommands();

  return {
    params: navCommands.map((c) => {
      return { slug: c.slug || "" };
    }),
  };
};
