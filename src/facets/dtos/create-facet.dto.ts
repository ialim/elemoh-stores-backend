import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Facet } from '../entities/facet.entity';

@InputType()
export class CreateFacetInput extends PickType(Facet, [
  'name',
  'isPrivate',
  'code',
]) {}

@ObjectType()
export class CreateFacetOutput extends CoreOutput {}
