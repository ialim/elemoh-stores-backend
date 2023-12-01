import {
  Field,
  InputType,
  ObjectType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { CollectionAsset } from '../entities/collection-asset.entity';

@InputType()
export class EditCollectionAssetInput extends PartialType(
  OmitType(CollectionAsset, ['id', 'createdAt', 'updatedAt']),
) {
  @Field((type) => Number)
  collectionAssetId: number;
}

@ObjectType()
export class EditCollectionAssetOutput extends CoreOutput {}
