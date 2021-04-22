import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@ArgsType()
export class DeleteCollectionAssetInput {
  @Field((type) => Number)
  collectionAssetId: number;
}

@ObjectType()
export class DeleteCollectionAssetOutput extends CoreOutput {}
