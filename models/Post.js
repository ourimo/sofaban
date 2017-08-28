var keystone = require('keystone');
var Types = keystone.Field.Types;

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

Post.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

// Post.schema.pre('save', function(next) {
// // If you only want to run this function if this is a brand new document, include this function.
// // If not, you can remove it and the encapsulating if statement from the next function.
//   this.igcontent = 'new content';
//   next();
// });
Post.schema.post('save', function () {
  //if (this.wasNew) {
      // Run a function here which creates some data for a field you want to be able to see in the adminUI
		// setTimeout(function() {
			this.igcontent = 'json content data';
			//console.log('its saved');
			
			this.save(function (err) {
				if (err) console.log(err);
			});
		// }, 10);
  //}
});

Post.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Post.register();
