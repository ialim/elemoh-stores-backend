import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Customer } from '../entities/customer.entity';

@ObjectType()
export class AllCustomerOutput extends CoreOutput {
  @Field((type) => [Customer], { nullable: true })
  customers?: Customer[];
}
