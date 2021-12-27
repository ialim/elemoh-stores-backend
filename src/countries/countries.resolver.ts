import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CountriesService } from './countries.service';
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

@Resolver((of) => Country)
export class CountriesResolver {
  constructor(private readonly countriesService: CountriesService) {}

  @Mutation((returns) => CreateCountryOutput)
  async createCountry(
    @Args('input') createCountryInput: CreateCountryInput,
  ): Promise<CreateCountryOutput> {
    return await this.countriesService.createCountry(createCountryInput);
  }

  @Mutation((returns) => EditCountryOutput)
  async editCountry(
    @Args('input') editCountryInput: EditCountryInput,
  ): Promise<EditCountryOutput> {
    return await this.countriesService.editCountry(editCountryInput);
  }

  @Mutation((returns) => DeleteCountryOutput)
  async deleteCountry(
    @Args() deleteCountryInput: DeleteCountryInput,
  ): Promise<DeleteCountryOutput> {
    return await this.countriesService.deleteCountry(deleteCountryInput);
  }

  @Mutation((returns) => FindCountryOutput)
  async findCountry(
    @Args() findCountryInput: FindCountryInput,
  ): Promise<FindCountryOutput> {
    return await this.countriesService.findCountry(findCountryInput);
  }

  @Mutation((returns) => AllCountryOutput)
  async findAllCountry(): Promise<AllCountryOutput> {
    return await this.countriesService.findAllCountry();
  }
}
