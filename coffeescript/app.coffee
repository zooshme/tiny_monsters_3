App = window.App = Ember.Application.create()

App.ApplicationView = Ember.View.extend
	classNames: ['page']

DS.RESTAdapter.reopen
	namespace: 'api'

App.ApplicationAdapter = DS.RESTAdapter.extend()

App.ArrayTransform = DS.Transform.extend
	serialize: (value) ->
		return value
	deserialize: (value) ->
		return value


App.Router.map ->
	
module.exports = App