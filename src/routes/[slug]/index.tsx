import { component$ } from "@builder.io/qwik";
import { action$, loader$ } from "@builder.io/qwik-city";
import { getCommandBySlug } from "~/db/queries";

export const getCommandLoader = loader$((req) => getCommandBySlug(req.params.slug));
export const createCommandAction = action$((data) => {
  console.log(data);
});
export default component$(() => {
  const { value: command } = getCommandLoader.use();
  const createCommand = createCommandAction.use();
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
