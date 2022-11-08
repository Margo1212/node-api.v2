import * as mongoose from 'mongoose';

export interface Product extends mongoose.Document {
  id: string;
  name: string;
  price: number;
  updateDate: string;
}

export const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, maxLength: 100 },
    price: { type: Number, required: true },
    updateDate: { type: Date, default: Date.now },
  },
  // {
  //   timestamps: {
  //     createdAt: false,
  //     updatedAt: 'updateDate',
  //   },
  // },
);
