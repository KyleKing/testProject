Template.ManageBikes.events 'click tbody > tr': (event) ->
	$('.selected').removeClass 'selected'
	$(event.currentTarget).toggleClass 'selected'
	dataTable = $(event.target).closest('table').DataTable()
	rowData = dataTable.row(event.currentTarget).data()
	console.log dataTable
	console.log rowData