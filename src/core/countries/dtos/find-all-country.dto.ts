import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Country } from '../entities/country.entity';

@ObjectType()
export class AllCountryOutput extends CoreOutput {
  @Field((type) => [Country], { nullable: true })
  countries?: Country[];
}
