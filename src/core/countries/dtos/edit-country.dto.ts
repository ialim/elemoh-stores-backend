import {
  Field,
  InputType,
  ObjectType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Country } from '../entities/country.entity';

@InputType()
export class EditCountryInput extends PartialType(
  OmitType(Country, ['createdAt', 'updatedAt', 'id']),
) {
  @Field((type) => Number)
  countryId: number;
}

@ObjectType()
export class EditCountryOutput extends CoreOutput {}
