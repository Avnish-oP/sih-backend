import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  searchHistory: [
    {
      searchTerm: { type: String },
      searchDate: { type: Date, default: Date.now },
      showedResults: { type: Boolean, default: false },
      productIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
      
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  resetPasswordToken: { type: String },
  resetPasswordExpire: { type: Date },
});

const User = mongoose.model("User", userSchema);

export default User;
