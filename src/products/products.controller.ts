import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
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
    return this.productsClient.send({cmd : 'find_one_product'},{id})
    .pipe(catchError(err => {throw new RpcException(err)}))
    // try
    // {
    //   const product = await firstValueFrom(this.productsClient.send({cmd : 'find_one_product'},{id}))
    // }
    // catch(error)
    // {
    //   throw new RpcException(error);

    // }



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
