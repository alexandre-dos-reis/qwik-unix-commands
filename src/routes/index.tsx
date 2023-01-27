import { component$, Resource } from "@builder.io/qwik";
import {
  RequestHandler,
  useEndpoint,
} from "@builder.io/qwik-city";
import { getNavCommands } from "~/db/queries";

interface Response extends Awaited<ReturnType<typeof getNavCommands>> {}

export const onGet: RequestHandler<Response> = async ({ params }) => {
  return await getNavCommands();
};

export default component$(() => {
  const endpointData = useEndpoint<Response>();
  return (
    <Resource
      value={endpointData}
      onPending={() => <div>Loading...</div>}
      onRejected={() => <div>Error</div>}
      onResolved={(commands) => {
        return (
          <ul>
            {commands.map((c) => (
              <li>{c.title}</li>
            ))}
          </ul>
        );
      }}
    />
  );
});

// export const head: DocumentHead = {
//   title: "Welcome to Qwik",
//   meta: [
//     {
//       name: "description",
//       content: "Qwik site description",
//     },
//   ],
// };
