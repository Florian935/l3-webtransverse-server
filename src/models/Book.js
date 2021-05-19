import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    name: String,
    description: String,
    categories: { type: Schema.Types.ObjectId, ref: 'Categorie' },
  },
  { collection: 'Book' }
);

export const Book = mongoose.model('Book', bookSchema);
