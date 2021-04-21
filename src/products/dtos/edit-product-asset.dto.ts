import {
  Field,
  InputType,
  ObjectType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { ProductAsset } from '../entities/product-asset.entity';

@InputType()
export class EditProductAssetInput extends PartialType(
  OmitType(ProductAsset, ['id', 'createdAt', 'updatedAt']),
) {
  @Field((type) => Number)
  productAssetId: number;
}

@ObjectType()
export class EditProductAssetOutput extends CoreOutput {}
