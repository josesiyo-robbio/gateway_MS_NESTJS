import { Controller, Get, Post, Body, Param, Delete, Inject, Query, ParseUUIDPipe } from '@nestjs/common';
import { ORDER_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateOrderDto, OrderPaginationDto } from './dto';
import { firstValueFrom } from 'rxjs';

@Controller('orders')
export class OrdersController {
  constructor(@Inject(ORDER_SERVICE) private readonly ordersClient : ClientProxy) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersClient.send('createOrder',createOrderDto);
  }


  //obtain all orders
  @Get()
  findAll(@Query() orderPaginationDto : OrderPaginationDto) 
  {
    return this.ordersClient.send('findAllOrders',orderPaginationDto);
  }


  @Get('id/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) 
  {
    try
    {
      const getOrder = await firstValueFrom(this.ordersClient.send('findOneOrder',{id}));
      return getOrder;
    }
    catch(error)
    {
      throw new RpcException(error);

    }
  }


}
