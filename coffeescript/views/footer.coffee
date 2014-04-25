App = require '../app'

App.FooterView = Ember.View.extend
	classNames: ['footer-view']
	templateName: 'footer'
	template: Ember.Handlebars.compile """
		<div class="inner no-padding">This is the footer</div>
		"""

