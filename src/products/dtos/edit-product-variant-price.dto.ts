import {
  Field,
  InputType,
  ObjectType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { ProductVariantPrice } from '../entities/product-variant-price.entity';

@InputType()
export class EditProductVariantPriceInput extends PartialType(
  OmitType(ProductVariantPrice, ['id', 'createdAt', 'updatedAt', 'variant']),
) {
  @Field((type) => Number)
  productVariantPriceId: number;

  @Field((type) => Number)
  variantId: number;
}

@ObjectType()
export class EditProductVariantPriceOutput extends CoreOutput {}
