import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Store } from '../entities/store.entity';

@ObjectType()
export class AllStoreOutput extends CoreOutput {
  @Field((type) => [Store], { nullable: true })
  stores?: Store[];
}
