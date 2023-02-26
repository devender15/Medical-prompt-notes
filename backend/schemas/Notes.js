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
      name: 'note',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'patient',
      title: 'Patient Name',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'string',
    },
    {
      name: 'date',
      title: 'Created at',
      type: 'datetime',
      validation: Rule => Rule.required(),
    },
  ],
  preparation: (doc) => {
    if(!doc.date) {
        doc.date = new Date().toISOString();
    }
  }
}
