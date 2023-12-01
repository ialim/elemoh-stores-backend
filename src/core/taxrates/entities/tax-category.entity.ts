import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity } from 'typeorm';

@InputType('TaxCategoryInputTyoe', { isAbstract: true })
@ObjectType()
@Entity()
export class TaxCategory extends CoreEntity {
  @Field((type) => String)
  @Column()
  name: string;
}
