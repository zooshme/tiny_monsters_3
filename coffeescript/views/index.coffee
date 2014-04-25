App = require '../app'

App.IndexView = Ember.View.extend
	classNames: ['home-view', 'content']
	templateName: 'index'
	template: Ember.Handlebars.compile """
		<div class="inner no-padding light-background">
			<div class="categories-wrapper">
				{{view "App.CategoriesView" contentBinding="model" }}
				{{view App.CategoryExpandedView}}
			</div>
		</div>
		"""

module.exports = App.IndexView