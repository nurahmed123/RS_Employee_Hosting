const { Schema, models, model } = require("mongoose");

const ProjectSchema = new Schema({
    title: { type: String },
    slug: { type: String, required: true },
    description: { type: String },
    projectcategory: [{ type: String }],
    tags: [{ type: String }],
    status: { type: String },
}, {
    timestamps: true // This option will automatically manage createdAt and updatedAt fields
});

export const Project = models.Project || model('Project', ProjectSchema, 'ProjectData');
