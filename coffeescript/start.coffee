# Models
# ====================================
require './models/category'
require './models/toy'
require './models/car'
require './models/brand'

# Collections
# ====================================
require './collections/toys'
require './collections/categories'
require './collections/brands'
require './collections/cars'

# Routes
# ====================================
require './routes/home'
require './routes/toy'
require './routes/categories'

# Views
# ====================================
require './views/home'
require './views/categories'

Backbone.history.start()
	