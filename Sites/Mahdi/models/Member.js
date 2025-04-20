const { Schema, models, model } = require("mongoose");

const MemberSchema = new Schema({
    name: { type: String },
    role: { type: String },
    phone: { type: String },
    email: { type: String },
    linkedin: { type: String },
    github: { type: String },
    facebook: { type: String },
    twitter: { type: String },
    youtube: { type: String },
    instagram: { type: String },
    status: { type: String }
}, {
    timestamps: true // This option will automatically manage createdAt and updatedAt fields
});

export const Member = models.Member || model('Member', MemberSchema, 'MemberDetails');
