App = require '../app'

App.SpecialOffersView = Ember.CollectionView.extend
	tagName: 'div'
	classNames: 'special-offers'
	itemViewClass: Ember.View.extend
		tagName: 'div'
		classNames: 'category'
		classNameBindings: ['emphasis']
		emphasis: 'content.emphasis'

		template: Ember.Handlebars.compile """
			<img class="thumb" {{bind-attr src="view.content.thumb"}}>
			<h3 class="medium-heading">{{view.content.name}}</h3>
			<div class="price">£{{view.content.fPrice}}</div>
			"""



module.exports = App.SpecialOffersView