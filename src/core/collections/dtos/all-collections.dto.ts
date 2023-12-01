import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Collection } from '../entities/collection.entity';

@ObjectType()
export class AllCollectionOutput extends CoreOutput {
  @Field((type) => [Collection], { nullable: true })
  collections?: Collection[];
}
