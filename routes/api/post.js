var keystone = require('keystone'),
Post = keystone.list('Post');

//List tickets
exports.getPosts = function(req, res) {
    Post.model.find(function(err, items) {
        if (err) return res.apiError('database error', err);
        
        res.apiResponse({
           posts: items 
        });
    });
}

//Get Post by ID
exports.getPostById = function(req, res) {
    Post.model.findById(req.params.id).exec(function(err, item) {
        if (err) return res.apiError('database error', err);
        if (!item) return res.apiError('not found');
        
        res.apiResponse({
           post: item  
        });
    });
}


//Update Post
exports.updatePostById = function(req, res) {
    
	Post.model.findById(req.params.id).exec(function(err, item){
		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');
		
		var data = req.body;
		
		item.getUpdateHandler(req).process(data, function(err) {
			if (err) return res.apiError('create error', err);
			
			res.apiResponse({
			    post: item
			});
		});
	});

}