export default {
    name: 'notes',
    title: 'Notes',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',

        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
        },
        {
            name: 'company',
            title: 'Company',
            type: 'string',
        },
        {
            name: 'patient',
            title: 'Patient Name',
            type: 'string',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
            }
        },
        {
            name: 'date',
            title: 'Date',
            type: 'datetime',
        }
    ],
}