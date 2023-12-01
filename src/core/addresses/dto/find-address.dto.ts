import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Address } from '../entities/address.entity';

@ArgsType()
export class FindAddressInput {
  @Field((type) => Number)
  addressId: number;
}

@ObjectType()
export class FindAddressOutput extends CoreOutput {
  @Field((type) => Address)
  address?: Address;
}
