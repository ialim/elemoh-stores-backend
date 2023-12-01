import { InputType, ObjectType, OmitType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { CustomerGroup } from '../entities/customer-group.etity';

@InputType()
export class CreateCustomerGroupInput extends OmitType(CustomerGroup, [
  'createdAt',
  'updatedAt',
  'id',
]) {}

@ObjectType()
export class CreateCustomerGroupOutput extends CoreOutput {}
