import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Surcharge } from './entities/surcharge.entity';

@Module({ imports: [TypeOrmModule.forFeature([Surcharge])] })
export class SurchargeModule {}
