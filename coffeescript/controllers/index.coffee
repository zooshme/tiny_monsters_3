App = require '../app'

App.IndexController = Ember.Controller.extend
	selected_category: null,
	special_offers: []
	getSpecialOffers: `function(category_id) {
			var store = this.get('store');
			var special_offers = store.find('offer', {category: category_id, featured: true});
			return special_offers;
		}`

module.exports = App.IndexController