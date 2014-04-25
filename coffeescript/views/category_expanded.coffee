App = require '../app'

App.CategoryExpandedView = Ember.View.extend
	tagName: 'div'
	classNames: 'category-expanded'
	attributeBindings: ['style']
	contentBinding: 'controller.selected_category'
	didInsertElement: ->
		@rearrangeOffers()
	rearrangeOffers: `function() {
			console.log('rearrange special offers')
			var wall = new freewall('.special-offers-view');
			wall.fitWidth();
			wall.refresh();
			wall.reset({
				selector: '.item',
				animate: true,
				cellW: 20,
				cellH: 20,
				onResize: function() {
					wall.fitWidth();
				}
			});
		}.observes('content')`
	style: `function() {
			return 'background-image: url(' + this.get('controller.selected_category.photos').objectAt(0) + ');'
		}.property('controller.selected_category')`
	template: Ember.Handlebars.compile """
		<header>
			<h3 class="name large-heading">{{view.content.name}}</h3>
			<div class="description">{{view.content.description}}</div>
		</header>
		{{view App.SpecialOffersView contentBinding="special_offers"}}
		"""



module.exports = App.CategoryExpandedView