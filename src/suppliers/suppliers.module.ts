import { Module } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { SuppliersResolver } from './suppliers.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supplier } from './entities/supplier.entity';
import { PeopleModule } from 'src/people/people.module';

@Module({
  imports: [TypeOrmModule.forFeature([Supplier]), PeopleModule],
  providers: [SuppliersService, SuppliersResolver],
})
export class SuppliersModule {}
