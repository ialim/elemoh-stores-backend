import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreStockLevel } from './entities/store-stock-level.entity';
import { Store } from './entities/store.entity';
import { StoresService } from './stores.service';
import { StoresResolver } from './stores.resolver';
import { AddressesModule } from 'src/core/addresses/addresses.module';
import { EmployeesModule } from 'src/core/employees/employees.module';
import { ProductsModule } from 'src/core/products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Store, StoreStockLevel]),
    AddressesModule,
    EmployeesModule,
    ProductsModule,
  ],
  providers: [StoresService, StoresResolver],
})
export class StoresModule {}
