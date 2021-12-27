import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@ArgsType()
export class DeleteCustomerInput {
  @Field((type) => Number)
  customerId: number;
}

@ObjectType()
export class DeleteCustomerOutput extends CoreOutput {}
