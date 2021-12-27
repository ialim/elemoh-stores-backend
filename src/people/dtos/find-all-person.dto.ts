import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Person } from '../entities/people.entity';

@ObjectType()
export class AllPersonOutput extends CoreOutput {
  @Field((type) => [Person], { nullable: true })
  people?: Person[];
}
