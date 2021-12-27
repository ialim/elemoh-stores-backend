import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Customer } from '../entities/customer.entity';

@ArgsType()
export class FindCustomerInput {
  @Field((type) => Number)
  customerId: number;
}

@ObjectType()
export class FindCustomerOutput extends CoreOutput {
  @Field((type) => Customer)
  customer?: Customer;
}
