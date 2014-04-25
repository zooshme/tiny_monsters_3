App = require '../app'

App.SpecialOffersView = Ember.CollectionView.extend
	didInsertElement: ->
		
		@rearrangeOffers()

	rearrangeOffers: `function() {
			setTimeout(function() {
				var wall = new freewall('.special-offers-view');
				wall.reset({
					selector: '.item',
					animate: true,
					cellW: 20,
					cellH: 20,
					onResize: function() {
						wall.fitWidth();
					}
				});
				wall.fitWidth();
			}, 100);			
		}.observes('content')`

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