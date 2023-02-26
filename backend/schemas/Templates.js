export default {
  name: 'templates',
  title: 'Templates',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Template name',
      type: 'string',
    },
    {
        name: 'fields',
        title: 'Fields',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'name',
                title: 'Name',
                type: 'string',
              },
              {
                name: 'label',
                title: 'Label',
                type: 'string',
              },
              {
                name: 'type',
                title: 'Field Type',
                type: 'string',
              },
            ]
          }
        ],
    },
  ],
}
