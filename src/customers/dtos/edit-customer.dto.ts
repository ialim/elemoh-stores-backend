import {
  Field,
  InputType,
  ObjectType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import {
  EditPersonInput,
  EditPersonOutput,
} from 'src/people/dtos/edit-person.dto';
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

  @Field((type) => EditPersonOutput)
  personInput: EditPersonInput;
}

@ObjectType()
export class EditCustomerOutput extends CoreOutput {}
