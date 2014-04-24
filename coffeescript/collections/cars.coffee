App = require '../app'

App.Collections.Cars = Backbone.Collection.extend
	url: '/api/cars'
	model: App.Models.Car

module.exports = App.Collections.Cars