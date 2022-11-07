import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async addProduct(
    @Body('name') prodName: string,
    @Body('price') prodPrice: number,
    @Body('updateDate') updateDate: string,
  ) {
    const generatedId = await this.productsService.createProduct(
      prodName,
      prodPrice,
      updateDate,
    );
    return { id: generatedId };
  }

  @Get()
  getAllProducts() {
    return this.productsService.getAllProducts();
  }

  @Get(':id')
  getProduct(@Param('id') productId: string) {
    return this.productsService.getProductDetails(productId);
  }

  @Put(':id')
  async updateProduct(
    @Param('id') prodId: string,
    @Body('name') name: string,
    @Body('price') price: number,
    @Body('updateDate') updateDate: string,
  ) {
    await this.productsService.updateProduct(prodId, name, price, updateDate);
    return null;
  }

  @Delete(':id')
  async removeProduct(@Param('id') prodId: string) {
    await this.productsService.deleteProduct(prodId);
    return null;
  }
}
