import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Person } from '../entities/people.entity';

@ArgsType()
export class FindPersonInput {
  @Field((type) => Number)
  personId: number;
}

@ObjectType()
export class FindPersonOutput extends CoreOutput {
  @Field((type) => Person)
  person?: Person;
}
