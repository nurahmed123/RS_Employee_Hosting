const { Schema, models, model } = require("mongoose");

const BlogSchema = new Schema({
    title: { type: String },
    slug: { type: String, required: true },
    author: { type: String },
    description: { type: String },
    blogcategory: [{ type: String }],
    tags: [{ type: String }],
    keywords: { type: String },
    metadescription: { type: String },
    primarystatus: { type: String },
    status: { type: String },
}, {
    timestamps: true // This option will automatically manage createdAt and updatedAt fields
});

export const Blog = models.Blog || model('Blog', BlogSchema, 'blogtest');
