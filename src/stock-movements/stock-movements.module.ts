import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from 'src/orders/orders.module';
import { ProductsModule } from 'src/products/products.module';
import { StockAdjustment } from './entities/stock-adjustment.entity';
import { Allocation } from './entities/stock-allocation.entity';
import { Cancellation } from './entities/stock-cancellation.entity';
import { StockMovement } from './entities/stock-movement.entity';
import { Release } from './entities/stock-release.entity';
import { Sale } from './entities/stock-sale.entity';
import { StockMovementsResolver } from './stock-movements.resolver';
import { StockMovementsService } from './stock-movements.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Allocation,
      Cancellation,
      Release,
      Sale,
      StockMovement,
      StockAdjustment,
    ]),
    ProductsModule,
    OrdersModule,
  ],
  providers: [StockMovementsResolver, StockMovementsService],
})
export class StockMovementsModule {}
