App = require '../app'

App.SpecialOffersView = Ember.CollectionView.extend
	tagName: 'div'
	classNames: 'special-offers-view'
	itemViewClass: Ember.View.extend
		tagName: 'div'
		classNames: ['special-offer', 'item']
		classNameBindings: ['emphasis']
		emphasisBinding: 'content.emphasis'

		template: Ember.Handlebars.compile """
			<div class="thumb-wrapper">
				<img class="thumb" {{bind-attr src="view.content.thumb"}}>
			</div>
			<h3 class="name medium-heading">{{view.content.name}}</h3>
			<div class="price">£{{view.content.fPrice}}</div>
			"""



module.exports = App.SpecialOffersView