import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CustomersService } from './customers.service';
import {
  CreateCustomerGroupInput,
  CreateCustomerGroupOutput,
} from './dtos/create-customer-group.dto';
import {
  CreateCustomerInput,
  CreateCustomerOutput,
} from './dtos/create-customer.dto';
import {
  DeleteCustomerGroupInput,
  DeleteCustomerGroupOutput,
} from './dtos/delete-customer-group.dto';
import {
  DeleteCustomerInput,
  DeleteCustomerOutput,
} from './dtos/delete-customer.dto';
import {
  EditCustomerGroupInput,
  EditCustomerGroupOutput,
} from './dtos/edit-customer-group.dto';
import {
  EditCustomerInput,
  EditCustomerOutput,
} from './dtos/edit-customer.dto';
import { AllCustomerGroupOutput } from './dtos/find-all-customer-group.dto';
import { AllCustomerOutput } from './dtos/find-all-customer.dto';
import {
  FindCustomerGroupInput,
  FindCustomerGroupOutput,
} from './dtos/find-customer-group.dto';
import {
  FindCustomerInput,
  FindCustomerOutput,
} from './dtos/find-customer.dto';
import { Customer } from './entities/customer.entity';

@Resolver((of) => Customer)
export class CustomersResolver {
  constructor(private readonly customersService: CustomersService) {}

  @Mutation((returns) => CreateCustomerOutput)
  async createCustomer(
    @Args('input') createCustomerInput: CreateCustomerInput,
  ): Promise<CreateCustomerOutput> {
    return await this.customersService.createCustomer(createCustomerInput);
  }

  @Mutation((returns) => EditCustomerOutput)
  async editCustomer(
    @Args('input') editCustomerInput: EditCustomerInput,
  ): Promise<EditCustomerOutput> {
    return await this.customersService.editCustomer(editCustomerInput);
  }

  @Mutation((returns) => DeleteCustomerOutput)
  async deleteCustomer(
    @Args() deleteCustomerInput: DeleteCustomerInput,
  ): Promise<DeleteCustomerOutput> {
    return await this.customersService.deleteCustomer(deleteCustomerInput);
  }

  @Mutation((returns) => FindCustomerOutput)
  async findCustomer(
    @Args() findCustomerInput: FindCustomerInput,
  ): Promise<FindCustomerOutput> {
    return await this.customersService.findCustomer(findCustomerInput);
  }

  @Mutation((returns) => AllCustomerOutput)
  async findAllCustomer(): Promise<AllCustomerOutput> {
    return await this.customersService.findAllCustomer();
  }

  @Mutation((returns) => CreateCustomerGroupOutput)
  async createGroupCustomer(
    @Args('input') createCustomerGroupInput: CreateCustomerGroupInput,
  ): Promise<CreateCustomerGroupOutput> {
    return await this.customersService.createCustomerGroup(
      createCustomerGroupInput,
    );
  }

  @Mutation((returns) => EditCustomerGroupOutput)
  async editCustomerGroup(
    @Args('input') editCustomerGroupInput: EditCustomerGroupInput,
  ): Promise<EditCustomerGroupOutput> {
    return await this.customersService.editCustomerGroup(
      editCustomerGroupInput,
    );
  }

  @Mutation((returns) => DeleteCustomerGroupOutput)
  async deleteCustomerGroup(
    @Args() deleteCustomerGroupInput: DeleteCustomerGroupInput,
  ): Promise<DeleteCustomerGroupOutput> {
    return await this.customersService.deleteCustomerGroup(
      deleteCustomerGroupInput,
    );
  }

  @Mutation((returns) => FindCustomerGroupOutput)
  async findCustomerGroup(
    @Args() findCustomerGroupInput: FindCustomerGroupInput,
  ): Promise<FindCustomerGroupOutput> {
    return await this.customersService.findCustomerGroup(
      findCustomerGroupInput,
    );
  }

  @Mutation((returns) => AllCustomerGroupOutput)
  async findAllCustomerGroup(): Promise<AllCustomerGroupOutput> {
    return await this.customersService.findAllCustomerGroup();
  }
}
