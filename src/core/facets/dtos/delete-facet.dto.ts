import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@ArgsType()
export class DeleteFacetInput {
  @Field((type) => Number)
  facetId: number;
}

@ObjectType()
export class DeleteFacetOutput extends CoreOutput {}
