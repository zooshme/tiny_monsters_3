var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var r = require('rethinkdb');
var fs = require('fs');
var app = express();
var async = require('async');
//var router = express.Router();

// an extension to convert a string to boolean
String.prototype.bool = function() {
    return (/^true$/i).test(this);
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var onConnect = function(callback) {
    r.connect({
        host:'localhost',
        port: 28015,
        db: 'tiny_monsters'
    }, function(err, conn) {
        callback(err, conn);
    });
}



app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(methodOverride());
app.use(cookieParser());

app.get('/', function(req, res) {
    res.render('index', {
        title: 'Tiny Monsters'
    })
});


app.get('/api/category/:category_id', function(req, res) {
    onConnect(function(err, conn) {
        r.table('categories').get(req.params.category_id).run(conn, function(err, category) {
            res.json(category);
            conn.close();
        });
    });
});

app.get('/api/categories', function(req, res) {
    onConnect(function(err, conn) {
        r.table('categories').orderBy('name').run(conn, function(err, cursor) {
            cursor.toArray(function(err, categories) {

                async.map(categories, function(category, callback) {
                    var pattern = /\s/g;
                    var dirName = category.name.toLowerCase().replace(pattern, '_');
                    var dirPath = path.join(__dirname, 'public/images/categories', dirName);

                    var photos = fs.readdirSync(dirPath);

                    var newPhotos = photos.map(function(photo) {
                        return path.join('images/categories', dirName, photo);
                    });

                    category.photos = newPhotos;
                    callback(null, category)
                }, function(error, categories) {
                    res.json({categories: categories});
                    conn.close()
                })
            });            
        });
    });
});

app.get('/api/brands/:brand_id', function(req, res) {
    onConnect(function(err, conn) {
        r.table('brands').get(req.params.brand_id).run(conn, function(err, brand) {
            res.json({
                brand: brand
            })
        });
    });
});

app.get('/api/brands', function(req, res) {
    onConnect(function(err, conn) {
        r.table('brands').orderBy('name').run(conn, function(err, cursor) {
            cursor.toArray(function(err, brands) {
                res.json({brands: brands});
            });
        });    
    })
    
});



app.get('/api/models/:model_id', function(req, res) {
    onConnect(function(err, conn) {
        r.table('models').get(req.params.model_id).run(conn, function(err, model) {
            res.json({
                model: model
            })
        });
    });
});

app.get('/api/offers', function(req, res) {
    if (req.query.featured && req.query.category) {
        onConnect(function(err, conn) {
            async.series([function(callback) {
                r.table('offers')
                    .filter(r.row('category').eq(req.query.category))
                    .filter(r.row('featured').eq(true))
                    .run(conn, function(err, cursor) {
                        cursor.toArray(function(err, offers) {
                            callback(err, offers)
                        });
                    });
            }, function(callback) {
                r.table('offers')
                    .filter(r.row('category').eq(req.query.category))
                    .filter(r.row('featured').eq(true))
                    .forEach(function(offer) {
                        return r.table('models').get(offer('model'));
                    })
                    .run(conn, function(err, cursor) {
                        callback(err, cursor)
                    });
            }, function(callback) {
                r.table('offers')
                    .filter(r.row('category').eq(req.query.category))
                    .filter(r.row('featured').eq(true))
                    .forEach(function(offer) {
                        return r.table('brands').get(offer('brand'));
                    })
                    .run(conn, function(err, cursor) {
                        callback(err, cursor)
                    });
            }], function(err, results) {
                //var offers, models, brands;
                
                console.log(typeof results[0], results[0]);

                offers = results[0];
                models = results[1];
                brands = results[2];

                if (typeof offers == 'object' && offers.hasOwnProperty('id')) {
                    offers = [ offers ];
                } else if (typeof offers == 'object') {
                    offers = offers;
                } else {
                    offers = [];
                }

                if (typeof brands == 'array') {
                    brands = brands;
                } else if (typeof brands == 'object' && brands.hasOwnProperty('id')) {
                    brands = [ brands ];
                } else {
                    brands = [];
                }

                if (typeof models == 'array') {
                    models = models;
                } else if (typeof models == 'object' && models.hasOwnProperty('id')) {
                    models = [ models ];
                } else {
                    models = [];
                }

                res.json({
                    offers: offers,
                    models: models,
                    brands: brands
                });
                conn.close();
            });
        })
    }
})

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});





var server = app.listen(4000, function() {
    console.log('Listening on port %d', server.address().port);
});

module.exports = app;