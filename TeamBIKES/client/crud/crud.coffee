# Initialization
# http://docs.webix.com/api__refs__ui.datatable.html
dataTable =
  view: 'datatable'
  id: 'datatable'
  columns: [
    {
      id:"ch1", header:"", template:"{common.checkbox()}"

    }
    {
      id: 'title', header: 'Film title', sort: 'string', editor: 'text'
      adjust: true, fillspace: true
    }
    {
      id: 'year', header: 'Release year', sort: 'int', editor: 'text'
    }
    {
      id: 'rating', header: 'Rating', sort: 'int', editor: 'text'
    }
  ]
  select: true
  multiselect: true
  sortable: true
  editable: true
  editaction: 'dblclick'
  resizeColumn: true
  url: webix.proxy('meteor', Movies)
  save: webix.proxy('meteor', Movies)

# http://docs.webix.com/desktop__list.html
list =
  view: 'list'
  template: '#title# (#year#) is rated #rating#'
  scroll: 'xy'
  drag: 'order'
  url: webix.proxy('meteor', Movies.find(title: /e/))

toolbar =
  view: 'toolbar'
  elements: [
    {
      view: 'label'
      label: 'Double-click a row to edit. Click on columns to sort.'
    }
    {
      view: 'button'
      value: 'Add'
      width: 100
      click: ->
        row = $$('datatable').add({})
        $$('datatable').editCell row, 'title'
        return
    }
    {
      view: 'button'
      value: 'Remove'
      width: 100
      click: ->
        id = $$('datatable').getSelectedId()
        if id
          $$('datatable').remove id
        else
          webix.message 'Please select a row to delete'
        return
    }
  ]

detailForm =
  view: 'form'
  id: 'detail-form'
  elements: [
    { view: 'text', name: 'title', label: 'Movie title' }
    { view: 'text', name: 'year', label: 'Year' }
    { view: 'text', name: 'rating', label: 'Rating' }
    {
      view: 'button'
      label: 'Save'
      type: 'form'
      click: ->
        @getFormView().save()
        @getFormView().clear()
        return
    }
  ]

Template.webix.onCreated ->
  # Use this.subscribe inside onCreated callback
  @subscribe 'webix'

Template.webix.rendered = ->
  webixContainer = webix.ui(
    container: 'webix-playground'
    view: 'layout'
    rows: [
      { cols: [
        {
          rows: [
            toolbar
            dataTable
          ]
          gravity: 2
        }
        { rows: [
          {
            view: 'template'
            type: 'header'
            template: 'Movies containing "e" (drag them!)'
          }
          list
        ] }
      ] }
      { view: 'resizer' }
      detailForm
    ]
  )

  # The problem with mixing Webix components and non-Webix HTML markup is that
  # Webix UI components won't resize automatically if you place them in an HTML
  # container. You have to resize them manually, like below:
  # Read more at http://forum.webix.com/discussion/comment/3650/#Comment_3650.
  webix.event window, 'resize', ->
    webixContainer.resize()
    return

  # http://docs.webix.com/desktop__data_binding.html
  $$('detail-form').bind $$('datatable')
  console.log 'The DataTable is reactive: Movies.insert({title: "Star Wars"})'
  return