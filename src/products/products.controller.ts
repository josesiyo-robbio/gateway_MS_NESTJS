import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PRODUCT_SERVICE } from 'src/config';


@Controller('products')
export class ProductsController 
{
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient : ClientProxy,
  ) {}

  @Post()
  createProduct()
  {
    return
  }


  @Get()
  findAllProducts()
  {
    return this.productsClient.send({ cmd : 'find_all_products' },{})

  }


  @Get()
  findOne(@Param('id') id: string)
  {

  }
  


  @Delete()
  deleteProduct(@Param('id') id:string)
  {

  }


  @Patch()
  patchProduct(@Body() body : any)
  {
    
  }
}
