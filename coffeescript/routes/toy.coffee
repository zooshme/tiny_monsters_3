App = require '../app'

require '../models/toy'

App.Views.Toy = Backbone.View.extend
	tagName: 'div'
	id: 'toy-view'
	initialize: ->
		console.log 'Hello'
		$('.content .inner').html this.el
		@render()

	template: _.template """
		<h2><%= this.model.get('name') %></h2>
		<div class="description">
			<%= this.model.get('description') %>
		</div>
		"""

	render: ->
		@$el.html @template()

App.Router.on 'route:toy', (id) ->
	console.log id
	route = @
	toyModel = App.Models.Toy.find {id: id}
	if toyModel
		#toyModel.find({id: id}).then (toy) ->
		route.view = new App.Views.Toy
			model: toyModel
	else 
		toyModel = new App.Models.Toy()
		toyModel.fetch(data: {id: id}).then (toy) ->
			route.view = new App.Views.Toy
				model: toyModel