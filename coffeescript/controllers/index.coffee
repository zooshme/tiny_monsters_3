App = require '../app'

App.IndexController = Ember.Controller.extend
	selected_category: null,
	special_offers: []
	getSpecialOffers: `function(category_id) {
			console.log('Getting Special Offers')
			var store = this.get('store');
			var special_offers = store.find('offer', {category_id: category_id, featured: true});
			return special_offers;
		}`

module.exports = App.IndexController