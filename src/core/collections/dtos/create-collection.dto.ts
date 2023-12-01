import { Field, InputType, ObjectType, OmitType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Collection } from '../entities/collection.entity';

@InputType()
export class CreateCollectionInput extends OmitType(Collection, [
  'id',
  'createdAt',
  'updatedAt',
  'assets',
  'productVariants',
  'featuredAsset',
  'channels',
  'children',
  'parent',
]) {
  @Field((type) => Number)
  parentId?: number;

  @Field((type) => Number)
  featuredAssetId: number;
}

@ObjectType()
export class CreateCollectionOutput extends CoreOutput {}
