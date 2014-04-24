App = require '../app'

App.Router.on 'route:categories', ->
	route = @
	CategoriesCollection = new App.Collections.Categories()

	CategoriesCollection.fetch().then (categories) ->
		route.view = new App.Views.Categories {collection: CategoriesCollection}