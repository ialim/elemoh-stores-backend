import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@ArgsType()
export class DeleteProductAssetInput {
  @Field((type) => Number)
  productAssetId: number;
}

@ObjectType()
export class DeleteProductAssetOutput extends CoreOutput {}
