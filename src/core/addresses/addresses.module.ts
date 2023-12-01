import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountriesModule } from 'src/core/countries/countries.module';
import { AddressesResolver } from './addresses.resolver';
import { AddressesService } from './addresses.service';
import { Address } from './entities/address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Address]), CountriesModule],
  providers: [AddressesResolver, AddressesService],
  exports: [AddressesService],
})
export class AddressesModule {}
