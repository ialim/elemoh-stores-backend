import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaxCategory } from './entities/tax-category.entity';
import { TaxRate } from './entities/tax-rate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaxRate, TaxCategory])],
})
export class TaxratesModule {}
