const { Schema, models, model } = require("mongoose");

const AchievementSchema = new Schema({
    title: { type: String },
    slug: { type: String, required: true },
    description: { type: String },
    achievementcategory: [{ type: String }],
    tags: [{ type: String }],
    status: { type: String },
}, {
    timestamps: true // This option will automatically manage createdAt and updatedAt fields
});

export const Achievement = models.Achievement || model('Achievement', AchievementSchema, 'AchievementData');
