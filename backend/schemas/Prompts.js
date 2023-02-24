export default {
    name: 'prompt',
    title: 'Prompts',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Prompt name',
            type: 'string',
        },
        {
            name: 'description',
            title: 'Prompt description',
            type: 'string',
        },
        {
            name: 'type',
            title: 'Prompt type',
            type: 'string',
            options: {
                list: [
                    { title: 'Number / Amount', value: 'text' },
                ]
            }
        },
        {
            name: 'default',
            title: 'Default value',
            type: 'string',
            optional: true,
        }

    ],
}