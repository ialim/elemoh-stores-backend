import { InputType, ObjectType, OmitType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Asset } from '../entities/asset.entity';

@InputType()
export class CreateAssetInput extends OmitType(Asset, [
  'createdAt',
  'updatedAt',
  'id',
]) {}

@ObjectType()
export class CreateAssetOutput extends CoreOutput {}
