//client only code

// Template.table.events({
//   'click tbody td:not(:first-child)': function(e) {
//   	editor.inline(this);
//   	console.log(this);
//   }
// });
Template.table.events({
  'click tbody > tr': function (event) {
    var dataTable = $(event.target).closest('table').DataTable();
    var rowData = dataTable.row(event.currentTarget).data();
    console.log(dataTable);
    console.log(rowData);
  }
});