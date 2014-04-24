App = require '../app'

App.Models.Toy = Backbone.Model.extend
	url: -> 
		return '/api/toy/' + @id
	# relations: [{
	# 		type: 'HasOne'
	# 		key: 'category'
	# 		relatedModel: App.Models.Category
	# 		autoFetch: true
	# 	}]

module.exports = App.Models.Toy
