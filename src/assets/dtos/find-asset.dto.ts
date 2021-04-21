import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Asset } from '../entities/asset.entity';

@ArgsType()
export class FindAssetInput {
  @Field((type) => Number)
  assetId: number;
}

@ObjectType()
export class FindAssetOutput extends CoreOutput {
  @Field((type) => Asset)
  asset?: Asset;
}
