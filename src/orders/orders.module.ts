import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { OrderLine } from './entities/order-line.entity';
import { OrderModification } from './entities/order-modification.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem, OrderLine, OrderModification]),
  ],
})
export class OrdersModule {}
