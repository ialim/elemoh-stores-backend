import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductVariant } from 'src/products/entities/product-variant.entity';
import { StockAdjustment } from './entities/stock-adjustment.entity';
import { StockMovement } from './entities/stock-movement.entity';
import { StockMovementsResolver } from './stock-movements.resolver';
import { StockMovementsService } from './stock-movements.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([StockMovement, StockAdjustment, ProductVariant]),
  ],
  providers: [StockMovementsResolver, StockMovementsService],
})
export class StockMovementsModule {}
