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
      name: 'bodyText',
      title: 'Body text',
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
              title: 'Type',
              type: 'string',
            },
            {
              name: 'text',
              title: 'Text',
              type: 'string',
            },
            {
              name: 'isField',
              title: 'isField',
              type: 'boolean',
            },
          ]
        },
      ],
    },
  ],
}
