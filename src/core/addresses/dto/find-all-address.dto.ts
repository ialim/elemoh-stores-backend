import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Address } from '../entities/address.entity';

@ObjectType()
export class AllAddressOutput extends CoreOutput {
  @Field((type) => [Address], { nullable: true })
  addresses?: Address[];
}
