import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { ProductVariant } from '../entities/product-variant.entity';

@ArgsType()
export class FindProductVariantInput {
  @Field((type) => Number)
  productVariantId: number;
}

@ObjectType()
export class FindProductVariantOutput extends CoreOutput {
  @Field((type) => ProductVariant, { nullable: true })
  productVariant?: ProductVariant;
}
