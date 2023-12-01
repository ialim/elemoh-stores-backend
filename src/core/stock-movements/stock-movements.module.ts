import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from 'src/core/orders/orders.module';
import { ProductsModule } from 'src/core/products/products.module';
import { StockAdjustment } from './entities/stock-adjustment.entity';
import { StockAllocation } from './entities/stock-allocation.entity';
import { StockCancellation } from './entities/stock-cancellation.entity';
import { StockMovement } from './entities/stock-movement.entity';
import { StockRelease } from './entities/stock-release.entity';
import { StockSale } from './entities/stock-sale.entity';
import { StockMovementsResolver } from './stock-movements.resolver';
import { StockMovementsService } from './stock-movements.service';
import { StockPurchase } from './entities/stock-purchase.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StockAllocation,
      StockCancellation,
      StockRelease,
      StockSale,
      StockMovement,
      StockAdjustment,
      StockPurchase,
    ]),
    ProductsModule,
    OrdersModule,
  ],
  providers: [StockMovementsResolver, StockMovementsService],
})
export class StockMovementsModule {}
