App = require '../app'

App.CategoriesView = Ember.CollectionView.extend
	tagName: 'ol'
	classNames: 'categories'
	itemViewClass: Ember.View.extend
		tagName: 'li'
		classNames: 'category'
		classNameBindings: ['active']
		active: `function() {
				if (this.get('content.id') == this.get('controller.selected_category.id')) {
					return true;
				} else {
					return false;
				}
			}.property('controller.selected_category')`
		thumb: `function() {
				return this.get('content.photos').objectAt(0)
			}.property('content.photos@each')`
		template: Ember.Handlebars.compile """
			<img class="thumb" {{bind-attr src="view.thumb"}}>
			<h3 class="medium-heading name">{{view.content.name}}</h3>
			"""
		click: ->
			@.set 'controller.selected_category', @get 'content'
			@.set('controller.special_offers', @.get('controller').getSpecialOffers(@.get('content.id')))



module.exports = App.CategoriesView