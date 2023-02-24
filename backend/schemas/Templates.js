export default {
  name: 'templates',
  title: 'Templates',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
        name: 'text',
        title: 'Note text',
        type: 'text',
    },
    {
      name: 'prompts',
      title: 'Prompts',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'prompt' }]}],
      options: {
        getOptionLabel: (prompt) => prompt.title,
        getOptionLabel: (prompt) => prompt._id,
      },
    },
  ],
}
