import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: String,
    surname: String,
    login: String,
    pass: String,
    token: String,
    books: { type: Schema.Types.ObjectId, ref: 'Book' },
  },
  { collection: 'User' }
);

export const User = mongoose.model('User', userSchema);
