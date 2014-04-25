App = require '../app'

App.Model = DS.Model.extend
	name: DS.attr 'string'
	description: DS.attr 'string'
	brand: DS.belongsTo 'brand'	
	
module.exports = App.Model