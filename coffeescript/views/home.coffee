App = require '../app'

App.Views.Home = Backbone.View.extend
	tagName: 'div'
	id: 'home-view'
	$selected_category: null
	initialize: (options) ->
		$('.content .inner').html this.el
		@$selected_category = options.categories.first()
		console.log @$selected_category
		@categories = options.categories
		@toys = options.toys
		@brands = options.brands
		#console.log @collection.models
		that = @
		@$selected_category.on('change:id', ->
			console.log 'Whatever'
		)

		# @$selected_category.bind 'change:id', -> 
			# console.log 'Whatever'
		@render()
	events: 
		'click .category a': 'select_category'
		'change:selected_category': 'rerenderExtra'

	select_category: (ev) ->
		ev.preventDefault()
		id = $(ev.target).data 'id'



		console.log @categories.at(1)

		@$selected_category.set @categories._byId[id]

	rerenderExtra: ->
		console.log 'Hello'

	# go_to_toy: (ev) ->
	# 	ev.preventDefault()
	# 	App.Router.navigate('toy/' + $(ev.target).attr('href'), {trigger: true})
	# 	return false

	template: _.template """
		<h2 class="large-heading">
			<a href="/#special-offers" class="entypo-right-open-mini">Special Offers</a>
		</h2>
		<ol class="row toys">
			<% this.toys.each(function(toy) { %>
				<li class="d-col1of4 t-col1of2 toy">
					<a class="go_to_toy" href="/#toy/<%= toy.get('id') %>">
						<img src="<%= toy.get('photos')[0] %>" class="thumb">
					</a>
					<header class="header">
						<h3 class="name">
							<a class="go_to_toy" href="/#toy/<%= toy.get('id') %>">
								<%= toy.get('name') %>
							</a>
						</h3>
						<% if (toy.get('price')) {%>
							<h4 class="price">£<%= toy.get('price').toFixed(2) %></h4>
						<% } %>
					</header>
					<a class="view-details" href="/#toy/<%= toy.get('id') %>">View Details</a>
					<div class='description'>
						<% if (toy.get('description').length > 100) { %>
							<%= toy.get('description').substring(0, 99) %>...
						<% } %>
					</div>
				</li>
			<% }); %>
		</ol>
		<h2 class="large-heading">
			<a href="/#categories" class="entypo-right-open-mini">Categories</a>
		</h2>
		<div class="categories-wrapper">
			<ol class="row categories">
				<% this.categories.each(function(category) { %>
					<li class="category">
						<a href="/#categories/<%= category.get('id') %>" data-id="<%= category.get('id') %>" class="thumb" style="background-image: url(<%= category.get('photos')[0] %>);"></a>
						<header>
							<h4 class="name medium-heading"><a href="/#categories/<%= category.get('id') %>" class="entypo-right-open-mini"><%= category.get('name') %></a></h4>
						</header>
					</li>
				<% }) %>
			</ol>
			<div class="categories-extra">
				<h1><%= this.$selected_category.get('name')%></h1>
			</div>
		</div>
		<h2 class="large-heading">
			<a href="" class="entypo-right-open-mini">Search by Brand</a>
		</h2>
		<ol class="brands">
			<% this.brands.each(function(brand) { %>
				<li class="brand">
					<a href="#" style='background-image: url(/images/logos/<%= brand.get('name').toLowerCase() %>.jpg);'></a>
				</li>
			<% }) %>
		</ol>
		"""

	render: ->
		@$el.html @template()