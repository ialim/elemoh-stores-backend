import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { ProductVariant } from '../entities/product-variant.entity';

@ObjectType()
export class AllProductVariantOutput extends CoreOutput {
  @Field((type) => [ProductVariant], { nullable: true })
  productVariants?: ProductVariant[];
}
