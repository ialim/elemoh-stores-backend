import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AddressesService } from './addresses.service';
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

@Resolver((of) => Address)
export class AddressesResolver {
  constructor(private readonly addressesService: AddressesService) {}

  @Mutation((returns) => CreateAddressOutput)
  async createAddress(
    @Args('input') createAddressInput: CreateAddressInput,
  ): Promise<CreateAddressOutput> {
    return await this.addressesService.createAddress(createAddressInput);
  }

  @Mutation((returns) => EditAddressOutput)
  async editAddress(
    @Args('input') editAddressInput: EditAddressInput,
  ): Promise<EditAddressOutput> {
    return await this.addressesService.editAddress(editAddressInput);
  }

  @Mutation((returns) => DeleteAddressOutput)
  async deleteAddress(
    @Args() deleteAddressInput: DeleteAddressInput,
  ): Promise<DeleteAddressOutput> {
    return await this.addressesService.deleteAddress(deleteAddressInput);
  }

  @Mutation((returns) => FindAddressOutput)
  async findAddress(
    @Args() findAddressInput: FindAddressInput,
  ): Promise<FindAddressOutput> {
    return await this.addressesService.findAddress(findAddressInput);
  }

  @Mutation((returns) => AllAddressOutput)
  async findAllAddress(): Promise<AllAddressOutput> {
    return await this.addressesService.findAllAddress();
  }
}
