import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ORDERS_SERVICE, envs } from 'src/config';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [OrdersController],
  providers: [],
  imports: [
    // ClientsModule.register([
    //   {
    //     name: ORDERS_SERVICE,
    //     transport: Transport.TCP,
    //     options: {
    //       // host: envs.ordersMicroserviceHost,
    //       // port: envs.ordersMicroservicePort, 
    //     },
    //   }
    // ]),
    NatsModule, // Use the NatsModule for NATS transport
  ]
})
export class OrdersModule {}
