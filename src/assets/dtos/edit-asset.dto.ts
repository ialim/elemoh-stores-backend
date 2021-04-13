import {
  Field,
  InputType,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Asset } from '../entities/asset.entity';

@InputType()
export class EditAssetInput extends PartialType(PickType(Asset, ['name'])) {
  @Field((type) => Number)
  assetId: number;
}

@ObjectType()
export class EditAssetOutput extends CoreOutput {}
