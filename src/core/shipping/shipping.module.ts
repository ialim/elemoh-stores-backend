import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShippingLine } from './entities/shipping-line.entity';
import { ShippingMethod } from './entities/shipping-method.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShippingLine, ShippingMethod])],
})
export class ShippingModule {}
