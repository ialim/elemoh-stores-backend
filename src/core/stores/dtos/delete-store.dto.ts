import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@ArgsType()
export class DeleteStoreInput {
  @Field((type) => Number)
  storeId: number;
}

@ObjectType()
export class DeleteStoreOutput extends CoreOutput {}
