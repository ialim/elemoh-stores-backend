import { InputType, ObjectType, OmitType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { ProductVariant } from '../entities/product-variant.entity';

@InputType()
export class CreateProductVariantInput extends OmitType(ProductVariant, [
  'id',
  'createdAt',
  'updatedAt',
  'assets',
  'channels',
  'facetValues',
  'featuredAsset',
  'stockMovements',
  'productVariantPrices',
  'collections',
]) {}

@ObjectType()
export class CreateProductVariantOutput extends CoreOutput {}
