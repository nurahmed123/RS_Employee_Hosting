const { Schema, models, model } = require("mongoose");
const shortid = require("shortid");

const UrlSchema = new Schema(
    {
        username: { type: String },
        code: { type: String, unique: true, default: shortid.generate },
        url: { type: String, required: true },
        click: { type: Number, required: true, default: 0 },
        expiresAt: { type: Date }, // Expiration field for URL
    },
    {
        timestamps: true, // Automatically manages createdAt and updatedAt fields
    }
);

// Add TTL (Time-To-Live) index on the expiresAt field to automatically delete expired URLs
UrlSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const Url_Shortner = models.Url_Shortner || model('Url_Shortner', UrlSchema, 'Url_Shortner');
