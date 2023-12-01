import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@ArgsType()
export class DeleteProductInput {
  @Field((type) => Number)
  productId: number;
}

@ObjectType()
export class DeleteProductOutput extends CoreOutput {}
