import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "8mzsiel8",
  dataset: "production",
  token:
    "skE3Bm2hrtKWa014xJoaNbylEZMb4XB1j0iekLXGrPlpitjnWPCt7Zq86zaIoqKCiYX5jYm6Jl3jrNOJDmMSAMwEOotjWsb6uUr2Lm60F7guh31hwfSpddauNUnDC9X508dtTS4lfxN5b8roen0cu9cb69ubTyJ3XIICNU0E9wf8H4wGHMc5",
  useCdn: false,
});

export default client;
