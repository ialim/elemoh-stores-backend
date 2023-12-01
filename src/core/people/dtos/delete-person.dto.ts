import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@ArgsType()
export class DeletePersonInput {
  @Field((type) => Number)
  personId: number;
}

@ObjectType()
export class DeletePersonOutput extends CoreOutput {}
