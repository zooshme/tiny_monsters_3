App = require '../app'

App.Collections.Categories = Backbone.Collection.extend
	url: '/api/categories'
	model: App.Models.Category

module.exports = App.Collections.Categories