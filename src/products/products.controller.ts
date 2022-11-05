import { Controller, Post, Body, Get } from '@nestjs/common';
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
}
