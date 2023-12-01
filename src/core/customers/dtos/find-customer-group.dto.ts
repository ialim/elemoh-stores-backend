import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { CustomerGroup } from '../entities/customer-group.etity';

@ArgsType()
export class FindCustomerGroupInput {
  @Field((type) => Number)
  customerGroupId: number;
}

@ObjectType()
export class FindCustomerGroupOutput extends CoreOutput {
  @Field((type) => CustomerGroup, { nullable: true })
  customerGroup?: CustomerGroup;
}
