import {
  Field,
  InputType,
  ObjectType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Customer } from '../entities/customer.entity';

@InputType()
export class EditCustomerInput extends PartialType(
  OmitType(Customer, [
    'createdAt',
    'updatedAt',
    'id',
    'sales',
    'person',
    'groups',
  ]),
) {
  @Field((type) => Number)
  customerId?: number;

  @Field((type) => Number)
  channelId?: number;
}

@ObjectType()
export class EditCustomerOutput extends CoreOutput {}
