App = require '../app'

App.Category = DS.Model.extend
	name: DS.attr 'string'
	description: DS.attr 'string'
	photos: DS.attr 'array'
	
module.exports = App.Category