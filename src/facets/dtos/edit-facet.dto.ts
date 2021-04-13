import {
  Field,
  InputType,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Facet } from '../entities/facet.entity';

@InputType()
export class EditFacetInput extends PartialType(
  PickType(Facet, ['name', 'isPrivate', 'code']),
) {
  @Field((type) => Number)
  facetId: number;
}

@ObjectType()
export class EditFacetOutput extends CoreOutput {}
