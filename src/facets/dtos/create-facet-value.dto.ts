import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { FacetValue } from '../entities/facet-value.entity';

@InputType()
export class CreateFacetValueInput extends PickType(FacetValue, [
  'name',
  'code',
]) {
  @Field((type) => Number)
  facetId: number;
}

@ObjectType()
export class CreateFacetValueOutput extends CoreOutput {}
