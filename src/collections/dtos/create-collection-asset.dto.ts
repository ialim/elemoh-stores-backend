import { InputType, ObjectType, OmitType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { CollectionAsset } from '../entities/collection-asset.entity';

@InputType()
export class CreateCollectionAssetInput extends OmitType(CollectionAsset, [
  'id',
  'createdAt',
  'updatedAt',
]) {}

@ObjectType()
export class CreateCollectionAssetOutput extends CoreOutput {}
