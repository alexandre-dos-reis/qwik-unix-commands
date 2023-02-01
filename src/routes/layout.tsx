import { component$, Slot } from "@builder.io/qwik";
import { Link, loader$ } from "@builder.io/qwik-city";
import { ToggleDarkMode } from "~/components/ToggleDarkMode";
import { getNavCommands } from "~/db/queries";

export const getCommands = loader$(() => getNavCommands());

export default component$(() => {
  const { value: commands } = getCommands.use();
  return (
    <>
      <ToggleDarkMode />
      <header></header>
      <main class="px-5">
        <ul class="flex flex-wrap gap-5 mb-5">
          {commands.map((c) => (
            <li>
              <Link href={`/${c.slug}`}>{c.tab}</Link>
            </li>
          ))}
        </ul>
        <section>
          <Slot />
        </section>
      </main>
      <footer></footer>
    </>
  );
});
