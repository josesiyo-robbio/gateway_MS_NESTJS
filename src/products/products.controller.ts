import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';


@Controller('products')
export class ProductsController 
{
  constructor() {}

  @Post()
  createProduct()
  {
    return
  }


  @Get()
  findAllProducts()
  {

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
