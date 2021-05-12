import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const categorieSchema = new Schema({
    name: String
});

export const Categorie = mongoose.model('Categorie', categorieSchema);