import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { User } from '../entities/user.entity';

@InputType()
export class CreateAccountInput extends PickType(User, ['email', 'password']) {
  @Field((type) => Number)
  roleId: number;
}

@ObjectType()
export class CreateAccountOutput extends CoreOutput {}
