import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChannelsService } from 'src/core/channels/channels.service';
import { PeopleService } from 'src/core/people/people.service';
import { Repository } from 'typeorm';
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
import { CustomerGroup } from './entities/customer-group.etity';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    private readonly peopleService: PeopleService,
    private readonly channelsService: ChannelsService,
    @InjectRepository(Customer)
    private readonly customers: Repository<Customer>,
    @InjectRepository(CustomerGroup)
    private readonly customerGroups: Repository<CustomerGroup>,
  ) {}

  async createCustomer({
    personId,
    channelId,
    channels,
  }: CreateCustomerInput): Promise<CreateCustomerOutput> {
    try {
      const personResult = await this.peopleService.findPerson({ personId });
      const result = await this.channelsService.findById({ channelId });
      channels = result.ok ? [result.channel] : [];
      if (personResult.ok) {
        await this.customers.save(
          this.customers.create({
            person: personResult.person,
            channels,
          }),
        );
        return {
          ok: true,
          error: null,
        };
      }
      return {
        ok: false,
        error: personResult.error,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async editCustomer({
    customerId,
    channelId,
  }: EditCustomerInput): Promise<EditCustomerOutput> {
    try {
      const customer = await this.customers.findOne(
        {
          id: customerId,
        },
        {
          relations: ['person'],
        },
      );
      if (!customer) {
        return {
          ok: false,
          error: 'Customer not found',
        };
      }

      if (channelId) {
        const result = await this.channelsService.findById({ channelId });
        result.ok &&
          !customer.channels.includes(result.channel) &&
          (customer.channels = [...customer.channels, result.channel]);
      }

      await this.customers.save(customer);
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

  async deleteCustomer({
    customerId,
  }: DeleteCustomerInput): Promise<DeleteCustomerOutput> {
    try {
      const customer = await this.customers.findOne({ id: customerId });
      if (!customer) {
        return {
          ok: false,
          error: 'Customer not found',
        };
      }
      await this.customers.remove(customer);
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

  async findCustomer({
    customerId,
  }: FindCustomerInput): Promise<FindCustomerOutput> {
    try {
      const customer = await this.customers.findOne(
        { id: customerId },
        { relations: ['sales', 'person'] },
      );
      if (!customer) {
        return {
          ok: false,
          error: 'Customer not found',
        };
      }
      return {
        ok: true,
        customer,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async findAllCustomer(): Promise<AllCustomerOutput> {
    try {
      const customers = await this.customers.find({
        relations: ['sales', 'person'],
      });
      if (!customers) {
        return {
          ok: false,
          error: 'Customers not found',
        };
      }
      return {
        ok: true,
        customers,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async createCustomerGroup({
    name,
    customers,
  }: CreateCustomerGroupInput): Promise<CreateCustomerGroupOutput> {
    try {
      const customerGroup = await this.customerGroups.findOne({ name });
      const findCustomers = await this.customers.findByIds(customers);
      if (!customerGroup) {
        await this.customerGroups.save(
          this.customerGroups.create({
            name,
            customers: findCustomers,
          }),
        );
        return {
          ok: true,
          error: null,
        };
      }
      return {
        ok: false,
        error: 'Customer Group already exist',
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async editCustomerGroup({
    name,
    customers,
    customerGroupId,
  }: EditCustomerGroupInput): Promise<EditCustomerGroupOutput> {
    try {
      const customerGroup = await this.customerGroups.findOne({
        id: customerGroupId,
      });
      if (!customerGroup) {
        return {
          ok: false,
          error: 'Customer group not found',
        };
      }
      name && (customerGroup.name = name);
      if (customers) {
        const findCustomers = await this.customers.findByIds(customers);
        customerGroup.customers = findCustomers;
      }
      await this.customerGroups.save(customerGroup);
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

  async deleteCustomerGroup({
    customerGroupId,
  }: DeleteCustomerGroupInput): Promise<DeleteCustomerGroupOutput> {
    try {
      const customerGroup = await this.customerGroups.findOne({
        id: customerGroupId,
      });
      if (!customerGroup) {
        return {
          ok: false,
          error: 'Customer Groupsnot found',
        };
      }
      await this.customerGroups.remove(customerGroup);
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

  async findCustomerGroup({
    customerGroupId,
  }: FindCustomerGroupInput): Promise<FindCustomerGroupOutput> {
    try {
      const customerGroup = await this.customerGroups.findOne({
        id: customerGroupId,
      });
      if (!customerGroup) {
        return {
          ok: false,
          error: 'CustomerGroup not found',
        };
      }
      return {
        ok: true,
        customerGroup,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async findAllCustomerGroup(): Promise<AllCustomerGroupOutput> {
    try {
      const customerGroups = await this.customerGroups.find({
        relations: ['customers'],
      });
      if (!customerGroups) {
        return {
          ok: false,
          error: 'CustomerGroups not found',
        };
      }
      return {
        ok: true,
        customerGroups,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}
