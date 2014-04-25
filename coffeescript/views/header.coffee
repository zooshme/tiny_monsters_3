App = require '../app'

App.HeaderView = Ember.View.extend
	classNames: ['header-view']
	templateName: 'header'
	template: Ember.Handlebars.compile """
		<div class="inner no-padding">
			<h1 class="logo">Tiny Monsters</h1>
			<h2 class="tagline">A unique car shopping experience</h2>
		</div>
		"""

module.exports = App.HeaderView