import { Args, Mutation, Resolver } from '@nestjs/graphql';
import {
  CreateSupplierInput,
  CreateSupplierOutput,
} from './dtos/create-supplier.dto';
import {
  DeleteSupplierOutput,
  DeleteSupplierInput,
} from './dtos/delete-supplier.dto';
import {
  EditSupplierOutput,
  EditSupplierInput,
} from './dtos/edit-supplier.dto';
import { AllSupplierOutput } from './dtos/find-all-suppliers.dto';
import {
  FindSupplierOutput,
  FindSupplierInput,
} from './dtos/find-supplier.dto';
import { Supplier } from './entities/supplier.entity';
import { SuppliersService } from './suppliers.service';

@Resolver((of) => Supplier)
export class SuppliersResolver {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Mutation((returns) => CreateSupplierOutput)
  async createSupplier(
    @Args('input') createSupplierInput: CreateSupplierInput,
  ): Promise<CreateSupplierOutput> {
    return await this.suppliersService.createSupplier(createSupplierInput);
  }

  @Mutation((returns) => EditSupplierOutput)
  async editSupplier(
    @Args('input') editSupplierInput: EditSupplierInput,
  ): Promise<EditSupplierOutput> {
    return await this.suppliersService.editSupplier(editSupplierInput);
  }

  @Mutation((returns) => DeleteSupplierOutput)
  async deleteSupplier(
    @Args() deleteSupplierInput: DeleteSupplierInput,
  ): Promise<DeleteSupplierOutput> {
    return await this.suppliersService.deleteSupplier(deleteSupplierInput);
  }

  @Mutation((returns) => FindSupplierOutput)
  async findSupplier(
    @Args() findSupplierInput: FindSupplierInput,
  ): Promise<FindSupplierOutput> {
    return await this.suppliersService.findSupplier(findSupplierInput);
  }

  @Mutation((returns) => AllSupplierOutput)
  async findAllSupplier(): Promise<AllSupplierOutput> {
    return await this.suppliersService.findAllSupplier();
  }
}
