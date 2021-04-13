import {
  Field,
  InputType,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { FacetValue } from '../entities/facet-value.entity';

@InputType()
export class EditFacetValueInput extends PartialType(
  PickType(FacetValue, ['name', 'code']),
) {
  @Field((type) => Number)
  facetId: number;

  @Field((type) => Number)
  facetValueId: number;
}

@ObjectType()
export class EditFacetValueOutput extends CoreOutput {}
