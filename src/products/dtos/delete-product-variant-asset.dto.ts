import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@ArgsType()
export class DeleteProductVariantAssetInput {
  @Field((type) => Number)
  productVariantAssetId: number;
}

@ObjectType()
export class DeleteProductVariantAssetOutput extends CoreOutput {}
