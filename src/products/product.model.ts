import * as mongoose from 'mongoose';

export interface Product extends mongoose.Document {
  id: string;
  name: string;
  price: number;
  updateDate: string;
}

export const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  updateDate: { type: Date, default: Date.now },
});
