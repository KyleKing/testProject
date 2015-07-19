Template.ManageUsers.events 'click tbody > tr': (event) ->
  dataTable = $(event.target).closest('table').DataTable()
  rowData = dataTable.row(event.currentTarget).data()