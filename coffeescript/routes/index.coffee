App = require '../app'

App.IndexRoute = Ember.Route.extend
	model: ->
		store = @get 'store'
		categories = store.find 'category'

	renderTemplate: ->
		@render 'index'
		@render 'header', {outlet: 'header'}
		@render 'footer', {outlet: 'footer'}

	setupController: (controller, model) ->
		controller.set 'model', model
		console.log model

		selected_category = model.objectAt 0
		controller.set 'selected_category', selected_category
		controller.set('special_offers', controller.getSpecialOffers(selected_category.get('id')))
					