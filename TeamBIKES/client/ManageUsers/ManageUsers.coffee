[today, now] = CurrentDay()

# Config variables:
col = [
  {
    name: 'name'
    description: 'profile.name'
  }
  {
    name: 'createdAt'
    description: 'createdAt'
  }
  {
    name: 'address'
    description: 'emails.address'
  }
  {
    name: 'verified'
    description: 'emails.verified'
  }
  {
    name: 'roles'
    description: 'roles'
  }]

# Initialization
# http://docs.webix.com/api__refs__ui.datatable.html
dataTable =
  view: 'datatable'
  id: 'datatable'
  columns: [
    {
      id: col[0].name, header: col[0].description, sort: 'int', editor: 'text'
      adjust: true, map:"#profile.name#"
    }
    {
      id: col[1].name, header: col[1].description, sort: 'int', editor: 'text'
      adjust: true
    }
    {
      id: col[2].name, header: col[2].description, sort: 'string', editor: 'text'
      adjust: true, map:"#emails[0].address#"
    }
    {
      id: col[3].name, header: col[3].description, sort: 'string', editor: 'text'
      adjust: true, map:"#emails[0].verified#"
    }
    {
      id: col[4].name, header: col[4].description, sort: 'string', editor: 'text'
      adjust: true
    }
  ]
  select: true
  multiselect: true
  sortable: true
  editable: true
  editaction: 'dblclick'
  resizeColumn: true
  url: webix.proxy('meteor', Meteor.users)
  save: webix.proxy('meteor', Meteor.users)

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
    { view: 'text', name: col[0].name, label: col[0].description, labelWidth: 120 }
    { view: 'text', name: col[1].name, label: col[1].description, labelWidth: 120 }
    { view: 'text', name: col[2].name, label: col[2].description, labelWidth: 120 }
    {
      view: 'button'
      label: 'Save'
      type: 'form'
      click: ->
        @getFormView().save()
        @getFormView().clear()
    }
  ]

Template.ManageUsers.onCreated ->
  # Use this.subscribe inside onCreated callback
  @subscribe 'ManageUsers'

Template.ManageUsers.rendered = ->
  webixContainer = webix.ui(
    container: 'ManageUsers-Webix'
    view: 'layout'
    rows: [
      { cols: [
        {
          rows: [
            toolbar
            dataTable
          ]
        }
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

  # http://docs.webix.com/desktop__data_binding.html
  $$('detail-form').bind $$('datatable')