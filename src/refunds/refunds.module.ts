import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Refund } from './entities/refund.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Refund])],
})
export class RefundsModule {}
