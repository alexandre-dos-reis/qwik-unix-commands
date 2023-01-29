import { component$ } from "@builder.io/qwik";
import { loader$ } from "@builder.io/qwik-city";
import { getCommandBySlug } from "~/db/queries";

export const getCommand = loader$((req) => getCommandBySlug(req.params.slug));

export default component$(() => {
  const { value: command } = getCommand.use();
  return <h1 class="text-center">{command?.title}</h1>;
});
