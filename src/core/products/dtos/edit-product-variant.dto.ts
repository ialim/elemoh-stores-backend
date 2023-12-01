import {
  Field,
  InputType,
  ObjectType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { ProductVariant } from '../entities/product-variant.entity';

@InputType()
export class EditProductVariantInput extends PartialType(
  OmitType(ProductVariant, [
    'id',
    'createdAt',
    'updatedAt',
    'assets',
    'facetValues',
    'stockMovements',
    'productVariantPrices',
    'collections',
  ]),
) {
  @Field((type) => Number)
  productVariantId: number;
}

@ObjectType()
export class EditProductVariantOutput extends CoreOutput {}
