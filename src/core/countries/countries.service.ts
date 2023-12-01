import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateCountryInput,
  CreateCountryOutput,
} from './dtos/create-country.dto';
import {
  DeleteCountryInput,
  DeleteCountryOutput,
} from './dtos/delete-country.dto';
import { EditCountryInput, EditCountryOutput } from './dtos/edit-country.dto';
import { AllCountryOutput } from './dtos/find-all-country.dto';
import { FindCountryInput, FindCountryOutput } from './dtos/find-country.dto';
import { Country } from './entities/country.entity';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country) private readonly countries: Repository<Country>,
  ) {}

  async createCountry({
    code,
    enabled,
  }: CreateCountryInput): Promise<CreateCountryOutput> {
    try {
      const country = await this.countries.findOne({ code });
      if (!country) {
        await this.countries.save(this.countries.create({ code, enabled }));
        return {
          ok: true,
        };
      }
      return {
        ok: false,
        error: 'Country Already Exist',
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async editCountry({
    countryId,
    code,
    enabled,
  }: EditCountryInput): Promise<EditCountryOutput> {
    try {
      const country = await this.countries.findOne({ id: countryId });
      if (!country) {
        return {
          ok: false,
          error: 'Country not found',
        };
      }
      code && (country.code = code);
      enabled && (country.enabled = enabled);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async deleteCountry({
    countryId,
  }: DeleteCountryInput): Promise<DeleteCountryOutput> {
    try {
      const country = await this.countries.findOne({ id: countryId });
      if (!country) {
        return {
          ok: false,
          error: 'Country not found',
        };
      }
      await this.countries.remove(country);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async findCountry({
    countryId,
  }: FindCountryInput): Promise<FindCountryOutput> {
    try {
      const country = await this.countries.findOne({ id: countryId });
      if (!country) {
        return {
          ok: false,
          error: 'Country not found',
        };
      }
      return {
        ok: true,
        country,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async findAllCountry(): Promise<AllCountryOutput> {
    try {
      const countries = await this.countries.find();
      if (!countries) {
        return {
          ok: false,
          error: 'Country not found',
        };
      }
      return {
        ok: true,
        countries,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}
