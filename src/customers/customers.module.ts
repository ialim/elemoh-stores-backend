import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersService } from './customers.service';
import { CustomerGroup } from './entities/customer-group.etity';
import { Customer } from './entities/customer.entity';
import { CustomersResolver } from './customers.resolver';
import { ChannelsModule } from 'src/channels/channels.module';
import { PeopleModule } from 'src/people/people.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer, CustomerGroup]),
    ChannelsModule,
    PeopleModule,
  ],
  providers: [CustomersService, CustomersResolver],
})
export class CustomersModule {}
