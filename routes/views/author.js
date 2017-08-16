var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'authors';
	locals.filters = {
		author: req.params.author,
	};
	locals.data = {
		author: {},
		posts: [],
	};
	
	//Load author
	view.on('init', function (next) {

		var q = keystone.list('Y').model.findOne({
			slug: locals.filters.author,
		});

		q.exec(function (err, result) {
			locals.data.author = result;
			next(err);
		});

	});
	
	//Load posts
	view.on('init', function (next) {

		var q = keystone.list('Post').paginate({
			page: req.query.page || 1,
			perPage: 10,
			maxPages: 10,
			filters: {
				state: 'published',
				author: locals.data.author
			},
		})
			.sort('-publishedDate')
			.populate('author categories');

		q.exec(function (err, results) {
			locals.data.posts = results;
			next(err);
		});
	});
	
	// // Load all categories
	// view.on('init', function (next) {

	// 	keystone.list('PostCategory').model.find().sort('name').exec(function (err, results) {

	// 		if (err || !results.length) {
	// 			return next(err);
	// 		}

	// 		locals.data.categories = results;

	// 		// Load the counts for each category
	// 		async.each(locals.data.categories, function (category, next) {

	// 			keystone.list('Post').model.count().where('categories').in([category.id]).exec(function (err, count) {
	// 				category.postCount = count;
	// 				next(err);
	// 			});

	// 		}, function (err) {
	// 			next(err);
	// 		});
	// 	});
	// });

	// // Load the current category filter
	// view.on('init', function (next) {

	// 	if (req.params.category) {
	// 		keystone.list('PostCategory').model.findOne({ key: locals.filters.category }).exec(function (err, result) {
	// 			locals.data.category = result;
	// 			next(err);
	// 		});
	// 	} else {
	// 		next();
	// 	}
	// });
	
	
	// Render the view
	view.render('author');
};
