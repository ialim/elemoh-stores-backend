import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { CustomerGroup } from '../entities/customer-group.etity';

@ObjectType()
export class AllCustomerGroupOutput extends CoreOutput {
  @Field((type) => [CustomerGroup], { nullable: true })
  customerGroups?: CustomerGroup[];
}
