const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: 6,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

// Pre-save hook: hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Instance method: compare entered password with stored hash (supports bcrypt hash and plain text)
userSchema.methods.matchPassword = async function (enteredPassword) {
  if (this.password && (this.password.startsWith('$2a$') || this.password.startsWith('$2b$'))) {
    return await bcrypt.compare(enteredPassword, this.password);
  }
  return enteredPassword === this.password;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
