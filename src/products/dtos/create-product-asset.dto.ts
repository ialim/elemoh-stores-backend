import { InputType, ObjectType, OmitType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { ProductAsset } from '../entities/product-asset.entity';

@InputType()
export class CreateProductAssetInput extends OmitType(ProductAsset, [
  'id',
  'createdAt',
  'updatedAt',
]) {}

@ObjectType()
export class CreateProductAssetOutput extends CoreOutput {}
