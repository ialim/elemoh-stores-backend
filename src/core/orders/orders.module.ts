import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { OrderLine } from './entities/order-line.entity';
import { OrderModification } from './entities/order-modification.entity';
import { OrdersService } from './orders.service';
import { ChannelsModule } from 'src/core/channels/channels.module';
import { UsersModule } from 'src/core/users/users.module';
import { Purchase } from './entities/order-purchase.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order,
      OrderItem,
      OrderLine,
      OrderModification,
      Purchase,
    ]),
    ChannelsModule,
    UsersModule,
  ],
  providers: [OrdersService],
})
export class OrdersModule {}
