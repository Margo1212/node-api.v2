import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.model';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  private async findOneProduct(id: string): Promise<Product> {
    let product;
    try {
      product = await this.productModel.findById(id);
    } catch (err) {
      throw new NotFoundException('Could not find product.');
    }

    if (!product) {
      throw new NotFoundException('Could not find product.');
    }
    return product;
  }

  async createProduct(prodName: string, price: number, updateDate: string) {
    const newProduct = new this.productModel({
      name: prodName,
      price: price,
      updateDate: updateDate,
    });
    if (prodName.length > 100) {
      throw new NotAcceptableException('Max names length 100');
    }
    const result = await newProduct.save();
    return result.id as string;
  }

  async getAllProducts() {
    const allProducts = await this.productModel.find();
    return allProducts as Product[];
  }

  async getProductDetails(productId: string) {
    const product = await this.findOneProduct(productId);
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      updateDate: product.updateDate,
    };
  }

  async updateProduct(
    productId: string,
    name: string,
    price: number,
    updateDate: string,
  ) {
    const updatedProduct = await this.findOneProduct(productId);
    if (name) {
      updatedProduct.name = name;
    }
    if (price) {
      updatedProduct.price = price;
    }
    if (updateDate) {
      updatedProduct.updateDate = updateDate;
    }
    updatedProduct.save();
  }

  async deleteProduct(prodId: string) {
    await this.productModel.deleteOne({ _id: prodId }).exec();
  }
}
