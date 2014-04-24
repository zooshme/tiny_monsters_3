App = require '../app'

App.Models.Category = Backbone.Model.extend
	url: ->
		return '/api/category/' + @id

module.exports = App.Models.Category