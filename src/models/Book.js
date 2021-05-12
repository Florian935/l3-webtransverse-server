import mongoose from 'mongoose';
import { Categorie } from './Categorie';
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: String,
    description: String,
    categories: [Categorie]
});

export const Book = mongoose.model('Book', bookSchema);