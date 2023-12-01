import { Field, InputType, ObjectType, OmitType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Store } from '../entities/store.entity';

@InputType()
export class CreateStoreInput extends OmitType(Store, [
  'createdAt',
  'updatedAt',
  'id',
  'manager',
  'address',
]) {
  @Field((type) => Number)
  employeeId: number;
  addressId: number;
}

@ObjectType()
export class CreateStoreOutput extends CoreOutput {}
