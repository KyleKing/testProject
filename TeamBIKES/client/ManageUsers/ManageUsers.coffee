Template.ManageUsers.events 'click tbody > tr': (event) ->
  # Store the id of the row clicked by the user
  dataTable = $(event.target).closest('table').DataTable()
  rowData = dataTable.row(event.currentTarget).data()
  Session.set "IDofSelectedRow", rowData._id
  # Provide user feedback with a highlighted
  $('.selected').removeClass 'selected'
  $(event.currentTarget).toggleClass 'selected'

Template.ManageUsers.helpers
  # Return the id of selected row
  SelectedRow: ->
    Meteor.users.findOne {_id: Session.get "IDofSelectedRow"}

# # Attempted to add index column items
# # Source: https://datatables.net/examples/api/counter_columns.html
# Template.ManageUsers.rendered = ->
#   TabularTables.ManageUsers.on('order.dt search.dt', ->
#     TabularTables.ManageUsers.column(0,
#       search: 'applied'
#       order: 'applied').nodes().each (cell, i) ->
#       cell.innerHTML = i + 1
#       return
#     return
#   ).draw()