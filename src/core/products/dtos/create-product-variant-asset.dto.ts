import { InputType, ObjectType, OmitType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { ProductVariantAsset } from '../entities/product-variant-asset.entity';

@InputType()
export class CreateProductVariantAssetInput extends OmitType(
  ProductVariantAsset,
  ['id', 'createdAt', 'updatedAt'],
) {}

@ObjectType()
export class CreateProductVariantAssetOutput extends CoreOutput {}
