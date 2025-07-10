const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const DEFAULT_IMAGE_URL = process.env.DEFAULT_IMAGE_URL

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },

      password: {
        type: String,
        required: function () {
          return this.authType === 'local';
        },
      },   

    googleId: {
      type: String,
      default: null,
    },

    walletAddress: {
      type: String,
      unique: true,
      sparse: true, // allows null
    },    

    authType: {
      type: String,
      enum: ['local', 'google'],
      default: 'local',
    },

    location: { type: String, default: '' },

    photo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProfilePicture',
    },

    themeMode: {
      type: String,
      enum: ['light', 'dark'],
      default: 'light',
    },

    isVerified: { type: Boolean, default: false },
    lastEmailSentAt: { type: Number, default: 0 },
    interests: [String],

    socialMediaLinks: {
      facebook: { type: String, default: '' },
      x: { type: String, default: '' },
      instagram: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      telegram: { type: String, default: '' },
      whatsapp: { type: String, default: '' },
    },

    ticket: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' }],

    bookedEvents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
      },
    ],
  },
  {
    timestamps: true,
    minimize: false,
  }
);

const ProfilePictureSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  imageUrl: {
    type: String,
    required: true,
    default: DEFAULT_IMAGE_URL,
  }, // Stores Cloudinary URL
  cloudinaryId: { type: String }, // Stores Cloudinary image ID
  googleId: { type: String, sparse: true }, // No 'unique: true' to allow multiple null values
  uploadedAt: { type: Date, default: Date.now },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) {
    return next();
  }

  //hashing of password

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

const ProfilePicture = mongoose.model("ProfilePicture", ProfilePictureSchema);
const User = mongoose.model("User", userSchema);
module.exports = { User, ProfilePicture };
