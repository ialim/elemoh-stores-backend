import {
  Field,
  InputType,
  ObjectType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Store } from '../entities/store.entity';

@InputType()
export class EditStoreInput extends PartialType(
  OmitType(Store, ['createdAt', 'updatedAt', 'id', 'manager', 'address']),
) {
  @Field((type) => Number)
  employeeId?: number;

  @Field((type) => Number)
  storeId?: number;
}

@ObjectType()
export class EditStoreOutput extends CoreOutput {}
