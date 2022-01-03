import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Store } from '../entities/Store.entity';

@ArgsType()
export class FindStoreInput {
  @Field((type) => Number)
  storeId: number;
}

@ObjectType()
export class FindStoreOutput extends CoreOutput {
  @Field((type) => Store)
  store?: Store;
}
