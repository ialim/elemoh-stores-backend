import { Field, InputType, ObjectType, OmitType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Customer } from '../entities/customer.entity';

@InputType()
export class CreateCustomerInput extends OmitType(Customer, [
  'createdAt',
  'updatedAt',
  'id',
  'sales',
  'groups',
]) {
  @Field((type) => Number)
  channelId: number;

  @Field((type) => Number)
  personId: number;
}

@ObjectType()
export class CreateCustomerOutput extends CoreOutput {}
