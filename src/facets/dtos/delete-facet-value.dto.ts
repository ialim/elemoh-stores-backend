import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@ArgsType()
export class DeleteFacetValueInput {
  @Field((type) => Number)
  facetId: number;

  @Field((type) => Number)
  facetValueId: number;
}

@ObjectType()
export class DeleteFacetValueOutput extends CoreOutput {}
