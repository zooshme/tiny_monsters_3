App = require '../app'

App.Models.Car = Backbone.RelationalModel.extend
	url: -> 
		return '/api/car/' + @id
	relations: [{
			type: 'HasOne'
			key: 'category'
			relatedModel: App.Models.Category
			autoFetch: true
		}]

module.exports = App.Models.Car