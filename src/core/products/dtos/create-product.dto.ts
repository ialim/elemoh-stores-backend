import { Field, InputType, ObjectType, OmitType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Product } from '../entities/product.entity';

@InputType()
export class CreateProductInput extends OmitType(Product, [
  'id',
  'createdAt',
  'updatedAt',
  'assets',
  'variants',
  'facetValues',
  'featuredAsset',
]) {
  @Field((type) => Number)
  channelId: number;

  @Field((type) => Number)
  featuredAssetId: number;
}

@ObjectType()
export class CreateProductOutput extends CoreOutput {}
