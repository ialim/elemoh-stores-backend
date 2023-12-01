import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@ArgsType()
export class DeleteCustomerGroupInput {
  @Field((type) => Number)
  customerGroupId: number;
}

@ObjectType()
export class DeleteCustomerGroupOutput extends CoreOutput {}
