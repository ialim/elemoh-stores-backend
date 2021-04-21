import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@ArgsType()
export class DeleteProductVariantInput {
  @Field((type) => Number)
  productVariantId: number;
}

@ObjectType()
export class DeleteProductVariantOutput extends CoreOutput {}
