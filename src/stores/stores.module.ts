import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreStockLevel } from './entities/store-stock-level.entity';
import { Store } from './entities/store.entity';
import { StoresService } from './stores.service';

@Module({
  imports: [TypeOrmModule.forFeature([Store, StoreStockLevel])],
  providers: [StoresService],
})
export class StoresModule {}
