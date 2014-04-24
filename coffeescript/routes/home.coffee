App = require '../app'

App.Router.on 'route:home', ->
	route = @
	toysCollection = new App.Collections.Toys()
	categoriesCollection = new App.Collections.Categories()
	brandsCollection = new App.Collections.Brands()
	
	toysCollection.fetch(data: {featured: true}).then (toys) ->
		brandsCollection.fetch().then (brands) ->
			categoriesCollection.fetch().then (categories) ->
				route.view = new App.Views.Home
					toys: toysCollection
					brands: brandsCollection
					categories: categoriesCollection	
					