(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var App, Router;

Router = Backbone.Router.extend({
  routes: {
    '': 'home',
    'toy/:id': 'toy',
    'categories': 'categories',
    'special-offers': 'special_offers'
  }
});

App = {
  Models: {},
  Views: {},
  Collections: {},
  Routes: {},
  Config: {},
  Router: new Router()
};

module.exports = App;


},{}],2:[function(require,module,exports){
var App;

App = require('../app');

App.Collections.Brands = Backbone.Collection.extend({
  url: '/api/brands',
  model: App.Models.Brand
});

module.exports = App.Collections.Brands;


},{"../app":1}],3:[function(require,module,exports){
var App;

App = require('../app');

App.Collections.Cars = Backbone.Collection.extend({
  url: '/api/cars',
  model: App.Models.Car
});

module.exports = App.Collections.Cars;


},{"../app":1}],4:[function(require,module,exports){
var App;

App = require('../app');

App.Collections.Categories = Backbone.Collection.extend({
  url: '/api/categories',
  model: App.Models.Category
});

module.exports = App.Collections.Categories;


},{"../app":1}],5:[function(require,module,exports){
var App;

App = require('../app');

App.Collections.Toys = Backbone.Collection.extend({
  url: '/api/toys',
  model: App.Models.Toy
});

module.exports = App.Collections.Toys;


},{"../app":1}],6:[function(require,module,exports){
var App;

App = require('../app');

App.Models.Brand = Backbone.RelationalModel.extend({
  url: function() {
    return '/api/brand/' + this.id;
  }
});

module.exports = App.Models.Brand;


},{"../app":1}],7:[function(require,module,exports){
var App;

App = require('../app');

App.Models.Car = Backbone.RelationalModel.extend({
  url: function() {
    return '/api/car/' + this.id;
  },
  relations: [
    {
      type: 'HasOne',
      key: 'category',
      relatedModel: App.Models.Category,
      autoFetch: true
    }
  ]
});

module.exports = App.Models.Car;


},{"../app":1}],8:[function(require,module,exports){
var App;

App = require('../app');

App.Models.Category = Backbone.Model.extend({
  url: function() {
    return '/api/category/' + this.id;
  }
});

module.exports = App.Models.Category;


},{"../app":1}],9:[function(require,module,exports){
var App;

App = require('../app');

App.Models.Toy = Backbone.Model.extend({
  url: function() {
    return '/api/toy/' + this.id;
  }
});

module.exports = App.Models.Toy;


},{"../app":1}],10:[function(require,module,exports){
var App;

App = require('../app');

App.Router.on('route:categories', function() {
  var CategoriesCollection, route;
  route = this;
  CategoriesCollection = new App.Collections.Categories();
  return CategoriesCollection.fetch().then(function(categories) {
    return route.view = new App.Views.Categories({
      collection: CategoriesCollection
    });
  });
});


},{"../app":1}],11:[function(require,module,exports){
var App;

App = require('../app');

App.Router.on('route:home', function() {
  var brandsCollection, categoriesCollection, route, toysCollection;
  route = this;
  toysCollection = new App.Collections.Toys();
  categoriesCollection = new App.Collections.Categories();
  brandsCollection = new App.Collections.Brands();
  return toysCollection.fetch({
    data: {
      featured: true
    }
  }).then(function(toys) {
    return brandsCollection.fetch().then(function(brands) {
      return categoriesCollection.fetch().then(function(categories) {
        return route.view = new App.Views.Home({
          toys: toysCollection,
          brands: brandsCollection,
          categories: categoriesCollection
        });
      });
    });
  });
});


},{"../app":1}],12:[function(require,module,exports){
var App;

App = require('../app');

require('../models/toy');

App.Views.Toy = Backbone.View.extend({
  tagName: 'div',
  id: 'toy-view',
  initialize: function() {
    console.log('Hello');
    $('.content .inner').html(this.el);
    return this.render();
  },
  template: _.template("<h2><%= this.model.get('name') %></h2>\n<div class=\"description\">\n	<%= this.model.get('description') %>\n</div>"),
  render: function() {
    return this.$el.html(this.template());
  }
});

App.Router.on('route:toy', function(id) {
  var route, toyModel;
  console.log(id);
  route = this;
  toyModel = App.Models.Toy.find({
    id: id
  });
  if (toyModel) {
    return route.view = new App.Views.Toy({
      model: toyModel
    });
  } else {
    toyModel = new App.Models.Toy();
    return toyModel.fetch({
      data: {
        id: id
      }
    }).then(function(toy) {
      return route.view = new App.Views.Toy({
        model: toyModel
      });
    });
  }
});


},{"../app":1,"../models/toy":9}],13:[function(require,module,exports){
require('./models/category');

require('./models/toy');

require('./models/car');

require('./models/brand');

require('./collections/toys');

require('./collections/categories');

require('./collections/brands');

require('./collections/cars');

require('./routes/home');

require('./routes/toy');

require('./routes/categories');

require('./views/home');

require('./views/categories');

Backbone.history.start();


},{"./collections/brands":2,"./collections/cars":3,"./collections/categories":4,"./collections/toys":5,"./models/brand":6,"./models/car":7,"./models/category":8,"./models/toy":9,"./routes/categories":10,"./routes/home":11,"./routes/toy":12,"./views/categories":14,"./views/home":15}],14:[function(require,module,exports){
var App;

App = require('../app');

App.Views.Categories = Backbone.View.extend({
  tagName: 'div',
  id: 'categories-view',
  initialize: function() {
    $('.content .inner').html(this.el);
    return this.render();
  },
  template: _.template("<h2>Categories</h2>\n<ol class=\"row categories\">\n	<% this.collection.each(function(category) { %>\n		<li class=\"d-col1of4\">\n			<h4 class=\"small-heading\"><%= category.get('name') %></h4>\n		</li>\n	<% }) %>\n</ol>"),
  render: function() {
    return this.$el.html(this.template());
  }
});


},{"../app":1}],15:[function(require,module,exports){
var App;

App = require('../app');

App.Views.Home = Backbone.View.extend({
  tagName: 'div',
  id: 'home-view',
  $selected_category: null,
  initialize: function(options) {
    var that;
    $('.content .inner').html(this.el);
    this.$selected_category = options.categories.first();
    console.log(this.$selected_category);
    this.categories = options.categories;
    this.toys = options.toys;
    this.brands = options.brands;
    that = this;
    this.$selected_category.on('change:id', function() {
      return console.log('Whatever');
    });
    return this.render();
  },
  events: {
    'click .category a': 'select_category',
    'change:selected_category': 'rerenderExtra'
  },
  select_category: function(ev) {
    var id;
    ev.preventDefault();
    id = $(ev.target).data('id');
    console.log(this.categories.at(1));
    return this.$selected_category.set(this.categories._byId[id]);
  },
  rerenderExtra: function() {
    return console.log('Hello');
  },
  template: _.template("<h2 class=\"large-heading\">\n	<a href=\"/#special-offers\" class=\"entypo-right-open-mini\">Special Offers</a>\n</h2>\n<ol class=\"row toys\">\n	<% this.toys.each(function(toy) { %>\n		<li class=\"d-col1of4 t-col1of2 toy\">\n			<a class=\"go_to_toy\" href=\"/#toy/<%= toy.get('id') %>\">\n				<img src=\"<%= toy.get('photos')[0] %>\" class=\"thumb\">\n			</a>\n			<header class=\"header\">\n				<h3 class=\"name\">\n					<a class=\"go_to_toy\" href=\"/#toy/<%= toy.get('id') %>\">\n						<%= toy.get('name') %>\n					</a>\n				</h3>\n				<% if (toy.get('price')) {%>\n					<h4 class=\"price\">£<%= toy.get('price').toFixed(2) %></h4>\n				<% } %>\n			</header>\n			<a class=\"view-details\" href=\"/#toy/<%= toy.get('id') %>\">View Details</a>\n			<div class='description'>\n				<% if (toy.get('description').length > 100) { %>\n					<%= toy.get('description').substring(0, 99) %>...\n				<% } %>\n			</div>\n		</li>\n	<% }); %>\n</ol>\n<h2 class=\"large-heading\">\n	<a href=\"/#categories\" class=\"entypo-right-open-mini\">Categories</a>\n</h2>\n<div class=\"categories-wrapper\">\n	<ol class=\"row categories\">\n		<% this.categories.each(function(category) { %>\n			<li class=\"category\">\n				<a href=\"/#categories/<%= category.get('id') %>\" data-id=\"<%= category.get('id') %>\" class=\"thumb\" style=\"background-image: url(<%= category.get('photos')[0] %>);\"></a>\n				<header>\n					<h4 class=\"name medium-heading\"><a href=\"/#categories/<%= category.get('id') %>\" class=\"entypo-right-open-mini\"><%= category.get('name') %></a></h4>\n				</header>\n			</li>\n		<% }) %>\n	</ol>\n	<div class=\"categories-extra\">\n		<h1><%= this.$selected_category.get('name')%></h1>\n	</div>\n</div>\n<h2 class=\"large-heading\">\n	<a href=\"\" class=\"entypo-right-open-mini\">Search by Brand</a>\n</h2>\n<ol class=\"brands\">\n	<% this.brands.each(function(brand) { %>\n		<li class=\"brand\">\n			<a href=\"#\" style='background-image: url(/images/logos/<%= brand.get('name').toLowerCase() %>.jpg);'></a>\n		</li>\n	<% }) %>\n</ol>"),
  render: function() {
    return this.$el.html(this.template());
  }
});


},{"../app":1}]},{},[13])