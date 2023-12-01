import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Facet } from '../entities/facet.entity';

@ObjectType()
export class AllFacetOutput extends CoreOutput {
  @Field((type) => [Facet], { nullable: true })
  facets?: Facet[];
}
