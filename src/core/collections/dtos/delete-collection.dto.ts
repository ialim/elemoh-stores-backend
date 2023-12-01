import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@ArgsType()
export class DeleteCollectionInput {
  @Field((type) => Number)
  collectionId: number;
}

@ObjectType()
export class DeleteCollectionOutput extends CoreOutput {}
