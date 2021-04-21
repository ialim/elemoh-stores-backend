import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@ArgsType()
export class DeleteProductVariantPriceInput {
  @Field((type) => Number)
  productVariantPriceId: number;
}

@ObjectType()
export class DeleteProductVariantPriceOutput extends CoreOutput {}
