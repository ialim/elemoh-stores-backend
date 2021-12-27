import {
  Field,
  InputType,
  ObjectType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Person } from '../entities/people.entity';

@InputType()
export class EditPersonInput extends PartialType(
  OmitType(Person, ['createdAt', 'updatedAt', 'id', 'user']),
) {
  @Field((type) => Number)
  personId?: number;
}

@ObjectType()
export class EditPersonOutput extends CoreOutput {}
