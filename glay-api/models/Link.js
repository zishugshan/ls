const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const linkSchema = new mongoose.Schema({
  link_name: { type: String, required: true, unique:true },
  content: { type: String, required: true },
  pass_key: { type: String, required: true, unique:true },
});

// You can use Mongoose middleware to hash the password before saving it
linkSchema.pre('save', async function(next) {
  if (!this.isModified('pass_key')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.pass_key, salt);
    this.pass_key = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});


module.exports = mongoose.model('Link', linkSchema);

