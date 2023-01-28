import { component$, Slot } from "@builder.io/qwik";
import { Link, loader$ } from "@builder.io/qwik-city";
import { getNavCommands } from "~/db/queries";
import Header from "../components/header/header";

export const getCommands = loader$(() => getNavCommands());

export default component$(() => {
  const { value: commands } = getCommands.use();
  return (
    <>
      <main>
        <Header />
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
      <footer>
        <a href="https://www.builder.io/" target="_blank">
          Made with ♡ by Builder.io
        </a>
      </footer>
    </>
  );
});
