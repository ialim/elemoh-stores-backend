import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Country } from '../entities/country.entity';

@ArgsType()
export class FindCountryInput {
  @Field((type) => Number)
  countryId: number;
}

@ObjectType()
export class FindCountryOutput extends CoreOutput {
  @Field((type) => Country)
  country?: Country;
}
