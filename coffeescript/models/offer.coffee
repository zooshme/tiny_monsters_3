App = require '../app'

App.Offer = DS.Model.extend
	name: DS.attr 'string'
	description: DS.attr 'string'
	price: DS.attr 'number'
	brand: DS.belongsTo 'brand', {embedded: 'always'}
	model: DS.belongsTo 'model', {embedded: 'always'}
	thumb: `function() {
			return '/images/offers/' + this.get('brand.name').toLowerCase().replace(/\s/, '_') + '/' + this.get('model.name').toLowerCase().replace(/\s/, '_') +  '/' + this.get('name').toLowerCase().replace(/\s/g, '_') + '/0.png';
		}.property('brand', 'model')`
	fPrice: `function() {
			return this.get('price').toFixed(2)
		}.property('price')`

	
module.exports = App.Offer