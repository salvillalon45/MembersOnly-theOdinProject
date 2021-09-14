const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	timestamp: {
		type: Date,
		required: true
	},
	message_content: {
		type: String,
		required: true
	},
	user_id: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	}
});

module.exports = mongoose.model('Message', MessageSchema);
