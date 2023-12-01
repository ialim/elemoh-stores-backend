import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fulfillment } from './entities/fulfillment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fulfillment])],
})
export class FulfillmentsModule {}
