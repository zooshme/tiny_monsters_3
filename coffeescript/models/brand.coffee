App = require '../app'

App.Models.Brand = Backbone.RelationalModel.extend
	url: -> 
		return '/api/brand/' + @id

module.exports = App.Models.Brand