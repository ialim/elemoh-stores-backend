import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Facet } from './facet.entity';

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class FacetValue extends CoreEntity {
  @Column()
  @Field((type) => String)
  @IsString()
  name: string;

  @Column({ unique: true })
  @Field((type) => String)
  @IsString()
  code: string;

  @Field((type) => Facet)
  @ManyToOne((type) => Facet, (group) => group.values, { onDelete: 'CASCADE' })
  facet: Facet;
}
