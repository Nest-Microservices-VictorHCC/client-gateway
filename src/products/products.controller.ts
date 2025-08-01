import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { NATS_SERVICE } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.client.send({ cmd: 'create_product' }, createProductDto)
  }

  @Get()
  getAllProducts(@Query() paginationDto: PaginationDto) {
    return this.client.send({ cmd: 'get_all_products' }, paginationDto);
  }

  @Get(':id')
  async GetProductById(@Param('id', ParseIntPipe) id: number) {

    // return this.productsClient.send({ cmd: 'get_product_by_id' }, id)
    //   .pipe(
    //     catchError(err => { throw new RpcException(err); })
    //   ); // Alternative way to handle errors using RxJS
      
    try {
      const product = await firstValueFrom(
        this.client.send({ cmd: 'get_product_by_id' }, id)
      )

      return product;
    } catch (error) {
      throw new RpcException(error);
    }
  }
  
  @Delete(':id')
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.client.send({ cmd: 'remove_product' }, { id })
      .pipe(
        catchError(err => { throw new RpcException(err); })
      ); // Alternative way to handle errors using RxJS
    
  }

  @Patch(':id')
  updateProduct(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {    
    return this.client.send({ cmd: 'update_product' }, { id, ...updateProductDto })
      .pipe(
        catchError(err => { throw new RpcException(err); })
      ); // Alternative way to handle errors using RxJS
  }

}
