import mongoose from "mongoose";
import bcrypt from "bcrypt";

const SALT_WORK_FACTOR = parseInt(process.env.SALT_WORK_FACTOR) || 10;

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
    password: {
      type: String,
      required: function () {
        return this.authProvider === "local";
      },
    },
    username: { type: String },
    avatar: { type: String },
    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
    movies: [
      {
        id: { type: Number, required: true },
        title: { type: String, required: true },
        img: { type: String },
        date: { type: String },
        genre: [{ type: String }],
        addedAt: { type: Date, default: Date.now },
      },
    ],
    sharedPlaylist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Playlist",
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("email") && this.email) {
    this.email = this.email.toLowerCase();
  }

  if (this.authProvider !== "local" || !this.isModified("password")) {
    return next();
  }

  try {
    const hash = await bcrypt.hash(this.password, SALT_WORK_FACTOR);
    this.password = hash;
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
