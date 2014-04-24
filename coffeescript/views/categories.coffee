App = require '../app'

App.Views.Categories = Backbone.View.extend
	tagName: 'div'
	id: 'categories-view'
	initialize: ->
		$('.content .inner').html this.el
		@render()
	# events: 
	# 	'click .go_to_toy': 'go_to_toy'

	# go_to_toy: (ev) ->
	# 	ev.preventDefault()
	# 	App.Router.navigate('toy/' + $(ev.target).attr('href'), {trigger: true})
	# 	return false

	template: _.template """
		<h2>Categories</h2>
		<ol class="row categories">
			<% this.collection.each(function(category) { %>
				<li class="d-col1of4">
					<h4 class="small-heading"><%= category.get('name') %></h4>
				</li>
			<% }) %>
		</ol>
		"""

	render: ->
		@$el.html @template()