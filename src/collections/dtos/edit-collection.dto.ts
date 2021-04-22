import {
  Field,
  InputType,
  ObjectType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Collection } from '../entities/collection.entity';

@InputType()
export class EditCollectionInput extends PartialType(
  OmitType(Collection, [
    'id',
    'createdAt',
    'updatedAt',
    'assets',
    'productVariants',
    'channels',
    'featuredAsset',
    'children',
    'parent',
  ]),
) {
  @Field((type) => Number)
  parentId?: number;

  @Field((type) => Number)
  featuredAssetId?: number;

  @Field((type) => Number)
  collectionId: number;
}

@ObjectType()
export class EditCollectionOutput extends CoreOutput {}
