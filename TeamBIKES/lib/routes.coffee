# Global Route Configuration
Router.configure
  layoutTemplate: 'menu'

# DEV - Webix
Router.route '/', name: 'ManageUsers'
Router.route '/PageContent'
Router.route '/ManageMechanicNotes'
Router.route '/ManageBikes'
Router.route '/crud'
Router.route '/Datatable'