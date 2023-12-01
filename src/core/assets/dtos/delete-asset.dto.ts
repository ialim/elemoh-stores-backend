import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@ArgsType()
export class DeleteAssetInput {
  @Field((type) => Number)
  assetId: number;
}

@ObjectType()
export class DeleteAssetOutput extends CoreOutput {}
