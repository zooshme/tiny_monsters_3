App = require '../app'

App.CategoryExpandedView = Ember.View.extend
	tagName: 'div'
	classNames: 'category-expanded'
	attributeBindings: ['style']
	contentBinding: 'controller.selected_category'
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