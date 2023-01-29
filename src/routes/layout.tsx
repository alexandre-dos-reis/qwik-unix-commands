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
      <main>
        <ul>
          {commands.map((c) => (
            <li>
              <Link href={`/${c.slug}`}>{c.title}</Link>
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
