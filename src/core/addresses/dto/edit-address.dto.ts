import {
  Field,
  InputType,
  ObjectType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Address } from '../entities/address.entity';

@InputType()
export class EditAddressInput extends PartialType(
  OmitType(Address, ['createdAt', 'updatedAt', 'id', 'country']),
) {
  @Field((type) => Number)
  addressId: number;

  @Field((type) => Number)
  countryId?: number;
}

@ObjectType()
export class EditAddressOutput extends CoreOutput {}
