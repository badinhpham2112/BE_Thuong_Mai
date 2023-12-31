const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    name: { type: String },
    avatar: { type: String },
    // parentId: String,
    createdAt: { type: Date, default: Date.now }
}, {
    timestamps: true
})

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment