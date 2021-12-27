import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@ArgsType()
export class DeleteCountryInput {
  @Field((type) => Number)
  countryId: number;
}

@ObjectType()
export class DeleteCountryOutput extends CoreOutput {}
