App = require '../app'

App.Offer = DS.Model.extend
	name: DS.attr 'string'
	photos: DS.attr 'array'
	description: DS.attr 'string'
	price: DS.attr 'number'
	brand: DS.belongsTo 'brand', {async: true}
	model: DS.belongsTo 'model', {async: true}
	thumb: `function() {
			return this.get('photos').objectAt(0);
		}.property('photos.@each')`
	fPrice: `function() {
			return this.get('price').toFixed(2)
		}.property('price')`

	
module.exports = App.Offer