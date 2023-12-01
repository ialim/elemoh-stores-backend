import {
  Field,
  InputType,
  ObjectType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { ProductVariantAsset } from '../entities/product-variant-asset.entity';

@InputType()
export class EditProductVariantAssetInput extends PartialType(
  OmitType(ProductVariantAsset, ['id', 'createdAt', 'updatedAt']),
) {
  @Field((type) => Number)
  productVariantAssetId: number;
}

@ObjectType()
export class EditProductVariantAssetOutput extends CoreOutput {}
