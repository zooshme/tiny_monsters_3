App = require '../app'

App.Brand = DS.Model.extend
	name: DS.attr 'string'
	description: DS.attr 'string'

	
module.exports = App.Brand