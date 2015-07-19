TabularTables = {}

# Example Tabular Datatable
Meteor.isClient and Template.registerHelper('TabularTables', TabularTables)
TabularTables.Books = new (Tabular.Table)(
  name: 'BookList'
  collection: Books
  columns: [
    { data: 'title', title: 'Title' }
    { data: 'author', title: 'Author' }
    { data: 'info.url', title: 'Web address' }
  ])

# ManageBikes
Meteor.isClient and Template.registerHelper('ManageBikesTable', TabularTables)
TabularTables.ManageBikes = new (Tabular.Table)(
  name: 'ManageBikes'
  collection: DailyBikeData
  columns: [
    { data: 'Bike', title: 'Bike' }
    { data: 'Day', title: 'Day' }
    { data: 'Tag', title: 'Tag' }
  ])