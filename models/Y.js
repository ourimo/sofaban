var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Y Model
 * ==========
 */
var Y = new keystone.List('Y', {
	autokey: { path: 'slug', from: 'username', unique: true }
});

Y.add({
	username: { type: String, initial: true, required: true, unique: true, index: true, default: '' },
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, unique: true, index: true },
	password: { type: Types.Password, initial: true, required: true },
	avatar: { type: Types.CloudinaryImage },
	description: { type: Types.Textarea },
	instagram: { type: Types.Text }
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
});

// Provide access to Keystone
Y.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});


/**
 * Relationships
 */
Y.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Registration
 */
Y.defaultColumns = 'name, email, isAdmin';
Y.register();
