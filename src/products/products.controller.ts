import { Controller, Post, Body } from '@nestjs/common';
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
}
