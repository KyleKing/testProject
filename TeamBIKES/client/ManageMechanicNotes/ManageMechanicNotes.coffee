Template.ManageMechanicNotes.events 'click tbody > tr': (event) ->
  dataTable = $(event.target).closest('table').DataTable()
  rowData = dataTable.row(event.currentTarget).data()
  console.log dataTable
  console.log rowData