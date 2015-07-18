Template.menu.events 'click #menu-toggle': (e) ->
	e.preventDefault()
	$('#wrapper').toggleClass 'toggled'