import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@ArgsType()
export class DeleteAddressInput {
  @Field((type) => Number)
  addressId: number;
}

@ObjectType()
export class DeleteAddressOutput extends CoreOutput {}
