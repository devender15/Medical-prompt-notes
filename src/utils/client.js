import { createClient } from "@sanity/client";

const client = createClient({
  projectId: import.meta.env.VITE_SOME_KEY_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SOME_KEY_SANITY_DATASET,
  token: import.meta.env.VITE_SOME_KEY_SANITY_API_TOKEN,
  useCdn: false,
});

export default client;
