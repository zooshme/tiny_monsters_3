(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var App;

App = window.App = Ember.Application.create();

App.ApplicationView = Ember.View.extend({
  classNames: ['page']
});

DS.RESTAdapter.reopen({
  namespace: 'api'
});

App.ApplicationAdapter = DS.RESTAdapter.extend();

App.ArrayTransform = DS.Transform.extend({
  serialize: function(value) {
    return value;
  },
  deserialize: function(value) {
    return value;
  }
});

App.Router.map(function() {});

module.exports = App;


},{}],2:[function(require,module,exports){
var App;

App = require('../app');

App.IndexController = Ember.Controller.extend({
  selected_category: null,
  special_offers: [],
  getSpecialOffers: function(category_id) {
			console.log('Getting Special Offers')
			var store = this.get('store');
			var special_offers = store.find('offer', {category_id: category_id, featured: true});
			return special_offers;
		}
});

module.exports = App.IndexController;


},{"../app":1}],3:[function(require,module,exports){
var App;

App = require('../app');

App.Brand = DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string')
});

module.exports = App.Brand;


},{"../app":1}],4:[function(require,module,exports){
var App;

App = require('../app');

App.Category = DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),
  photos: DS.attr('array')
});

module.exports = App.Category;


},{"../app":1}],5:[function(require,module,exports){
var App;

App = require('../app');

App.Model = DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),
  brand: DS.belongsTo('brand')
});

module.exports = App.Model;


},{"../app":1}],6:[function(require,module,exports){
var App;

App = require('../app');

App.Offer = DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),
  price: DS.attr('number'),
  brand: DS.belongsTo('brand', {
    embedded: 'always'
  }),
  model: DS.belongsTo('model', {
    embedded: 'always'
  }),
  thumb: function() {
			return '/images/offers/' + this.get('brand.name').toLowerCase().replace(/\s/, '_') + '/' + this.get('model.name').toLowerCase().replace(/\s/, '_') +  '/' + this.get('name').toLowerCase().replace(/\s/g, '_') + '/0.png';
		}.property('brand', 'model'),
  fPrice: function() {
			return this.get('price').toFixed(2)
		}.property('price')
});

module.exports = App.Offer;


},{"../app":1}],7:[function(require,module,exports){
var App;

App = require('../app');

App.IndexRoute = Ember.Route.extend({
  model: function() {
    var categories, store;
    store = this.get('store');
    return categories = store.find('category');
  },
  renderTemplate: function() {
    this.render('index');
    this.render('header', {
      outlet: 'header'
    });
    return this.render('footer', {
      outlet: 'footer'
    });
  },
  setupController: function(controller, model) {
    var selected_category;
    controller.set('model', model);
    console.log(model);
    selected_category = model.objectAt(0);
    controller.set('selected_category', selected_category);
    return controller.set('special_offers', controller.getSpecialOffers(selected_category.get('id')));
  }
});


},{"../app":1}],8:[function(require,module,exports){
require('./app');

require('./models/category');

require('./models/brand');

require('./models/model');

require('./models/offer');

require('./controllers/index');

require('./routes/index');

require('./views/special_offers_collection');

require('./views/categories_collection');

require('./views/category_expanded');

require('./views/header');

require('./views/footer');

require('./views/index');


},{"./app":1,"./controllers/index":2,"./models/brand":3,"./models/category":4,"./models/model":5,"./models/offer":6,"./routes/index":7,"./views/categories_collection":9,"./views/category_expanded":10,"./views/footer":11,"./views/header":12,"./views/index":13,"./views/special_offers_collection":14}],9:[function(require,module,exports){
var App;

App = require('../app');

App.CategoriesView = Ember.CollectionView.extend({
  tagName: 'ol',
  classNames: 'categories',
  itemViewClass: Ember.View.extend({
    tagName: 'li',
    classNames: 'category',
    classNameBindings: ['active'],
    active: function() {
				if (this.get('content.id') == this.get('controller.selected_category.id')) {
					return true;
				} else {
					return false;
				}
			}.property('controller.selected_category'),
    thumb: function() {
				return this.get('content.photos').objectAt(0)
			}.property('content.photos@each'),
    template: Ember.Handlebars.compile("<img class=\"thumb\" {{bind-attr src=\"view.thumb\"}}>\n<h3 class=\"medium-heading name\">{{view.content.name}}</h3>"),
    click: function() {
      this.set('controller.selected_category', this.get('content'));
      return this.set('controller.special_offers', this.get('controller').getSpecialOffers(this.get('content.id')));
    }
  })
});

module.exports = App.CategoriesView;


},{"../app":1}],10:[function(require,module,exports){
var App;

App = require('../app');

App.CategoryExpandedView = Ember.View.extend({
  tagName: 'div',
  classNames: 'category-expanded',
  attributeBindings: ['style'],
  contentBinding: 'controller.selected_category',
  didInsertElement: function() {
    return this.rearrangeOffers();
  },
  rearrangeOffers: function() {
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
		}.observes('content'),
  style: function() {
			return 'background-image: url(' + this.get('controller.selected_category.photos').objectAt(0) + ');'
		}.property('controller.selected_category'),
  template: Ember.Handlebars.compile("<header>\n	<h3 class=\"name large-heading\">{{view.content.name}}</h3>\n	<div class=\"description\">{{view.content.description}}</div>\n</header>\n{{view App.SpecialOffersView contentBinding=\"special_offers\"}}")
});

module.exports = App.CategoryExpandedView;


},{"../app":1}],11:[function(require,module,exports){
var App;

App = require('../app');

App.FooterView = Ember.View.extend({
  classNames: ['footer-view'],
  templateName: 'footer',
  template: Ember.Handlebars.compile("<div class=\"inner no-padding\">This is the footer</div>")
});


},{"../app":1}],12:[function(require,module,exports){
var App;

App = require('../app');

App.HeaderView = Ember.View.extend({
  classNames: ['header-view'],
  templateName: 'header',
  template: Ember.Handlebars.compile("<div class=\"inner no-padding\">\n	<h1 class=\"logo\">Tiny Monsters</h1>\n	<h2 class=\"tagline\">A unique car shopping experience</h2>\n</div>")
});

module.exports = App.HeaderView;


},{"../app":1}],13:[function(require,module,exports){
var App;

App = require('../app');

App.IndexView = Ember.View.extend({
  classNames: ['home-view', 'content'],
  templateName: 'index',
  template: Ember.Handlebars.compile("<div class=\"inner no-padding light-background\">\n	<div class=\"categories-wrapper\">\n		{{view \"App.CategoriesView\" contentBinding=\"model\" }}\n		{{view App.CategoryExpandedView}}\n	</div>\n</div>")
});

module.exports = App.IndexView;


},{"../app":1}],14:[function(require,module,exports){
var App;

App = require('../app');

App.SpecialOffersView = Ember.CollectionView.extend({
  tagName: 'div',
  classNames: 'special-offers-view',
  itemViewClass: Ember.View.extend({
    tagName: 'div',
    classNames: ['special-offer', 'item'],
    classNameBindings: ['emphasis'],
    emphasisBinding: 'content.emphasis',
    template: Ember.Handlebars.compile("<div class=\"thumb-wrapper\">\n	<img class=\"thumb\" {{bind-attr src=\"view.content.thumb\"}}>\n</div>\n<h3 class=\"name medium-heading\">{{view.content.name}}</h3>\n<div class=\"price\">£{{view.content.fPrice}}</div>")
  })
});

module.exports = App.SpecialOffersView;


},{"../app":1}]},{},[8])