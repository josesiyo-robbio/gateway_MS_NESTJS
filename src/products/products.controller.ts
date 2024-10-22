import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
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
  findAllProducts(@Query() paginationDto : PaginationDto)
  {
    return this.productsClient.send({ cmd : 'find_all_products' },paginationDto);
  }


  @Get(':id')
  async findOne(@Param('id') id: string)
  {
    try
    {
      const product = await firstValueFrom(this.productsClient.send({cmd : 'find_one_product'},{id}))
    }
    catch(error)
    {
      throw new BadRequestException(error);

    }

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
