import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.model';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async createProduct(prodName: string, price: number, updateDate: string) {
    const newProduct = new this.productModel({
      name: prodName,
      price: price,
      updateDate: updateDate,
    });
    const result = await newProduct.save();
    return result.id as string;
  }
}
