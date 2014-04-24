Router = Backbone.Router.extend
	routes:
		'' : 'home'
		'toy/:id': 'toy'
		'categories': 'categories'
		'special-offers': 'special_offers'

App =
	Models: {},
	Views: {},
	Collections: {},
	Routes: {},
	Config: {},
	Router: new Router()


module.exports = App