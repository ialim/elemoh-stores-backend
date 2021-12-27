import { Field, InputType, ObjectType, OmitType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Person } from '../entities/people.entity';

@InputType()
export class CreatePersonInput extends OmitType(Person, [
  'createdAt',
  'updatedAt',
  'id',
  'user',
]) {}

@ObjectType()
export class CreatePersonOutput extends CoreOutput {
  @Field((type) => Person)
  person?: Person;
}
