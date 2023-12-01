import { Field, InputType, ObjectType, OmitType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Address } from '../entities/address.entity';

@InputType()
export class CreateAddressInput extends OmitType(Address, [
  'createdAt',
  'updatedAt',
  'id',
]) {
  @Field((type) => Number)
  countryId?: number;
}

@ObjectType()
export class CreateAddressOutput extends CoreOutput {}
