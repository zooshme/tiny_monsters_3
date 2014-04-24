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

app.get('/api/toys', function(req, res) {
    if (req.query.featured) {

        onConnect(function(err, conn) {
            console.log(err)
            r.table('toys').getAll(req.query.featured.bool(), {index: 'featured'}).orderBy('name').run(conn, function(err, cursor) {
                console.log(err, cursor)
                cursor.toArray(function(err, toys) {
                    console.log(toys)
                    async.map(toys, function(toy, callback) {
                        var pattern = /\s/g;
                        name = toy.name.toLowerCase().replace(pattern, '_');
                        var dir = path.join(__dirname, 'public/images/monsters', name);
                        console.log(dir);

                        var photos = fs.readdirSync(dir)
                        
                        var newPhotos = photos.map(function(photo) {
                            return path.join('images/monsters', name, photo);
                        });
                        toy.photos = newPhotos;
                        callback(null, toy)
                    }, function(err, toys) {
                        res.json(toys);
                        conn.close();      
                    })
                      
                });
                
            });

        });
    } 
});

app.get('/api/toy/:toy_id', function(req, res) {
    onConnect(function(err, conn) {
        r.table('toys').get(req.params.toy_id).run(conn, function(err, toy) {
            var pattern = /\s/g;
            var name = toy.name.toLowerCase().replace(pattern, '_');
            var dir = path.join(__dirname, 'public/images/monsters', name);
            
            var photos = fs.readdirSync(dir);

            var newPhotos = photos.map(function(photo) {
                return path.join('images/monsters', name, photo);
            });
            toy.photos = newPhotos;

            res.json(toy);

            conn.close();
        });
    });
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
                    res.json(categories);
                    conn.close()
                })
            });            
        });
    });
});

app.get('/api/brands', function(req, res) {
    onConnect(function(err, conn) {
        r.table('brands').orderBy('name').run(conn, function(err, cursor) {
            cursor.toArray(function(err, brands) {
                res.json(brands);
            });
        });    
    })
    
});

app.post('/api/toys', function() {

});

app.put('/api/toys/:toy_id', function() {

});

app.delete('/api/toys/:toy_id', function() {

});

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