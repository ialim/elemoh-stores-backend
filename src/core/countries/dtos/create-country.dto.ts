import { InputType, ObjectType, OmitType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Country } from '../entities/country.entity';

@InputType()
export class CreateCountryInput extends OmitType(Country, [
  'createdAt',
  'updatedAt',
  'id',
]) {}

@ObjectType()
export class CreateCountryOutput extends CoreOutput {}
