import { createClient } from "@sanity/client";

const client =  createClient({
    projectId: "8mzsiel8",
    dataset: "production",
    useCdn: true,
})

export default client;