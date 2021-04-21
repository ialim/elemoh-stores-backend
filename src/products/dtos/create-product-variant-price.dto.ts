import { Field, InputType, ObjectType, OmitType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { ProductVariantPrice } from '../entities/product-variant-price.entity';

@InputType()
export class CreateProductVariantPriceInput extends OmitType(
  ProductVariantPrice,
  ['id', 'createdAt', 'updatedAt', 'variant'],
) {
  @Field((type) => Number)
  variantId: number;
}

@ObjectType()
export class CreateProductVariantPriceOutput extends CoreOutput {}
