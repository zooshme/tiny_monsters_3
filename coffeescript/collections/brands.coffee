App = require '../app'

App.Collections.Brands = Backbone.Collection.extend
	url: '/api/brands'
	model: App.Models.Brand

module.exports = App.Collections.Brands