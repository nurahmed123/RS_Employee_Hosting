const { Schema, models, model } = require("mongoose");

const DiarySchema = new Schema(
    {
        userid: { type: String, required: true },
        username: { type: String },
        transactionType: { type: String },
        reason: { type: String },
        note: { type: String },
        cost: { type: String },
        createdAt: { type: Date }, // Custom createdAt field
    },
    {
        timestamps: { createdAt: false, updatedAt: true }, // Disable default createdAt
    }
);

export const Diary = models.Diary || model("Diary", DiarySchema, "Diary");
