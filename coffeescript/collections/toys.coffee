App = require '../app'

App.Collections.Toys = Backbone.Collection.extend
	url: '/api/toys'
	model: App.Models.Toy

module.exports = App.Collections.Toys