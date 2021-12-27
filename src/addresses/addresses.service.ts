import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CountriesService } from 'src/countries/countries.service';
import { Repository } from 'typeorm';
import {
  CreateAddressInput,
  CreateAddressOutput,
} from './dto/create-address.dto';
import {
  DeleteAddressInput,
  DeleteAddressOutput,
} from './dto/delete-address.dto';
import { EditAddressInput, EditAddressOutput } from './dto/edit-address.dto';
import { FindAddressInput, FindAddressOutput } from './dto/find-address.dto';
import { AllAddressOutput } from './dto/find-all-address.dto';
import { Address } from './entities/address.entity';

@Injectable()
export class AddressesService {
  constructor(
    private readonly countriesService: CountriesService,
    @InjectRepository(Address) private readonly addresses: Repository<Address>,
  ) {}

  async createAddress(
    createAddressInput: CreateAddressInput,
  ): Promise<CreateAddressOutput> {
    try {
      const address = await this.addresses.findOne({
        postalCode: createAddressInput.postalCode,
      });
      const result = await this.countriesService.findCountry({
        countryId: createAddressInput.countryId,
      });
      createAddressInput.country = result.ok ? result.country : null;
      if (!address) {
        await this.addresses.save(this.addresses.create(createAddressInput));
        return {
          ok: true,
          error: null,
        };
      }
      return {
        ok: false,
        error: 'Address already Exist',
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async editAddress({
    addressId,
    fullName,
    city,
    company,
    countryId,
    postalCode,
    province,
    streetLine1,
    streetLine2,
    phoneNumber,
    defaultBillingAddress,
    defaultShippingAddress,
  }: EditAddressInput): Promise<EditAddressOutput> {
    try {
      const address = await this.addresses.findOne({ id: addressId });
      if (!address) {
        return {
          ok: false,
          error: 'Address not found',
        };
      }

      if (countryId) {
        const result = await this.countriesService.findCountry({
          countryId,
        });
        address.country = result.ok ? result.country : null;
      }

      fullName && (address.fullName = fullName);
      city && (address.city = city);
      company && (address.company = company);
      postalCode && (address.postalCode = postalCode);
      province && (address.province = province);
      streetLine1 && (address.streetLine1 = streetLine1);
      streetLine2 && (address.streetLine2 = streetLine2);
      phoneNumber && (address.phoneNumber = phoneNumber);
      defaultBillingAddress &&
        (address.defaultBillingAddress = defaultBillingAddress);
      defaultShippingAddress &&
        (address.defaultShippingAddress = defaultShippingAddress);
      await this.addresses.save(address);
      return {
        ok: true,
        error: null,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async deleteAddress({
    addressId,
  }: DeleteAddressInput): Promise<DeleteAddressOutput> {
    try {
      const address = await this.addresses.findOne({ id: addressId });
      if (!address) {
        return {
          ok: false,
          error: 'Address not found',
        };
      }
      await this.addresses.remove(address);
      return {
        ok: true,
        error: null,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async findAddress({
    addressId,
  }: FindAddressInput): Promise<FindAddressOutput> {
    try {
      const address = await this.addresses.findOne({
        id: addressId,
      });
      if (!address) {
        return {
          ok: false,
          error: 'Address not found',
        };
      }
      return {
        ok: true,
        address,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async findAllAddress(): Promise<AllAddressOutput> {
    try {
      const addresses = await this.addresses.find({
        relations: ['country', 'customer'],
      });
      if (!addresses) {
        return {
          ok: false,
          error: 'Addresses not found',
          addresses: null,
        };
      }
      return {
        ok: true,
        addresses,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}
