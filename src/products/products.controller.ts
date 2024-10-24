


import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { NATS_SERVICE, PRODUCT_SERVICE } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';



@Controller('products')
export class ProductsController 
{
  constructor( @Inject(NATS_SERVICE) private readonly client : ClientProxy, ) {}


  //create a new Product
  @Post()
  createProduct(@Body() createProductDto : CreateProductDto)
  {
    return this.client.send({cmd : 'create_product'},createProductDto)
  }


  //Get all products
  @Get()
  findAllProducts(@Query() paginationDto : PaginationDto)
  {
    return this.client.send({ cmd : 'find_all_products' },paginationDto);
  }


  //find product by ID
  @Get(':id')
  async findOne(@Param('id') id: string)
  {
    return this.client.send({cmd : 'find_one_product'},{id})
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


  //update a products
  @Patch(':id')
  async patchProduct( @Param('id',ParseIntPipe) id:number,@Body() updateProductDto :UpdateProductDto )
  {
    try
    {
      const updateProduct = await firstValueFrom( this.client.send({ cmd : 'update_product'},
        {
          id, ...updateProductDto
        }));
      return updateProduct;
    }
    catch(error)
    {
      throw new RpcException(error);
    }
    
  }


  @Delete(':id')
  async deleteProduct(@Param('id') id:string)
  {
    try
    {
      const deleteProduct = await firstValueFrom(this.client.send( { cmd : 'delete_product'},{id}) );
      
      return deleteProduct;
    }
    catch(error)
    {
      throw new RpcException(error);
    }
  }

}
