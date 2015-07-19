Template.Datatable.onCreated ->
  # Use this.subscribe inside onCreated callback
  @subscribe 'Datatable'

Template.Datatable.rendered = ->
  proxy = webix.proxy('meteor', Books)
  #datatable
  table =
    view: 'datatable'
    id: 'dtable'
    select: true
    multiselect: true
    editable: true
    editaction: 'dblclick'
    columns: [
      { id: 'name', editor: 'text', fillspace: 1 }
      { id: 'author', editor: 'text', fillspace: 1 }
    ]
    autoheight: true
    url: proxy
    save: proxy
  toolbar =
    view: 'toolbar'
    elements: [
      {
        view: 'label'
        label: 'Dbl-Click to edit any row'
      }
      {
        view: 'button'
        value: 'Add'
        width: 100
        click: ->
          row = $$('dtable').add(
            name: ''
            author: '')
          $$('dtable').editCell row, 'name'
      }
      {
        view: 'button'
        value: 'Remove'
        width: 100
        click: ->
          id = $$('dtable').getSelectedId()
          if id
            $$('dtable').remove id
          else
            webix.message 'Please select any row first'
      }
    ]
  @ui = webix.ui({ rows: [
    toolbar
    table
  ] }, @find('#table_area'))

Template.Datatable.destroyed = ->
  if @ui
    @ui.destructor()