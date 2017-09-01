var keystone = require('keystone');
var Types = keystone.Field.Types;
var ig = require('instagram-node').instagram();

/**
 * Post Model
 * ==========
 */

var Post = new keystone.List('Post', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

Post.add({
	title: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'Y', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	featuredImage: { type: Types.CloudinaryImage },
	image1: { type: Types.CloudinaryImage },
	image2: { type: Types.CloudinaryImage },
	image3: { type: Types.CloudinaryImage },
	image4: { type: Types.CloudinaryImage },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
	},
	categories: { type: Types.Relationship, ref: 'PostCategory', many: true },
	hashtag: { type: Types.Text },
	like: { type: Types.Number },
	igcontent: { type: String }
});


//Get instagram post data
ig.use({ access_token: '4637254850.0ad8824.b9e53c44aafa463a8bf28efa99fe4545' });


Post.schema.pre('save', function(next){
	//var hashtag = this.hashtag;

	ig.tag_media_recent(this.hashtag, function(err, medias, pagination, remaining, limit) {
		if(err){
			console.log(err);
		} else {
			Post.schema.pre('save', function (next) {
				var stringMedias = JSON.stringify(medias);
				if(this.igcontent === '') {
					this.igcontent = stringMedias;
				}
				
				next();
			});
		}
	});
	
	next();
});






Post.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Post.register();
