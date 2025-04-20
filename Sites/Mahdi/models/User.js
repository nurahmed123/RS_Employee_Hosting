const { Schema, models, model } = require("mongoose");

const UserSchema = new Schema({
    name: { type: String,  },
    username: { type: String,  unique: true,},
    role: { type: String,  },
    email: { type: String,  },
    phone: { type: String },
    country: { type: String },
    password: { type: String,  },
    bio: { type: String,  },
    facebook: { type: String,  },
    linkedin: { type: String,  },
    github: { type: String,  },
    image: { type: String,  }
}, {
    timestamps: true // This option will automatically manage createdAt and updatedAt fields
});

export const User = models.User || model('User', UserSchema, 'User');
