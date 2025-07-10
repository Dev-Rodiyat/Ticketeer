const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true }
},
{
  timestamps: true,
  minimize: false,
}
);

// Prevent users from submitting multiple reviews for the same event
ReviewSchema.index({ event: 1, user: 1 }, { unique: true });

module.exports = mongoose.model("Review", ReviewSchema);