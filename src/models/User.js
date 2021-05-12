import mongoose from 'mongoose';
import { Book } from './Book';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    surname: String,
    login: String,
    pass: String,
    token: String,
    books: [Book]
});

export const User = mongoose.model('User', userSchema);