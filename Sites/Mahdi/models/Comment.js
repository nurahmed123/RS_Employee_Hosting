const { Schema, models, model } = require("mongoose");

const CommentSchema = new Schema({
    userid: { type: String, },
    username: { type: String, },
    slug: { type: String },
    comment: { type: String, },
}, {
    timestamps: true // This option will automatically manage createdAt and updatedAt fields
});

export const Comment = models.Comment || model('Comment', CommentSchema, 'Comment');
