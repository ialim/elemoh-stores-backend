import {
  Field,
  InputType,
  ObjectType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Product } from '../entities/product.entity';

@InputType()
export class EditProductInput extends PartialType(
  OmitType(Product, [
    'createdAt',
    'updatedAt',
    'assets',
    'variants',
    'facetValues',
    'featuredAsset',
  ]),
) {
  @Field((type) => Number)
  productId: number;

  @Field((type) => Number)
  featuredAssetId?: number;
}

@ObjectType()
export class EditProductOutput extends CoreOutput {}
