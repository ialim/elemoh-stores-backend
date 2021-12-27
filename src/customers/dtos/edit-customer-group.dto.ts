import {
  Field,
  InputType,
  ObjectType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { CustomerGroup } from '../entities/customer-group.etity';

@InputType()
export class EditCustomerGroupInput extends PartialType(
  OmitType(CustomerGroup, ['createdAt', 'updatedAt', 'id']),
) {
  @Field((type) => Number)
  customerGroupId: number;
}

@ObjectType()
export class EditCustomerGroupOutput extends CoreOutput {}
