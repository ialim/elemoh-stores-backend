import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { FacetValue } from './facet-value.entity';

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Facet extends CoreEntity {
  @Column()
  @Field((type) => String)
  @IsString()
  name: string;

  @Column({ default: false })
  @Field((type) => Boolean)
  @IsBoolean()
  isPrivate: boolean;

  @Column({ unique: true })
  @Field((type) => String)
  @IsString()
  code: string;

  @Field((type) => FacetValue)
  @OneToMany((type) => FacetValue, (value) => value.facet)
  values: FacetValue[];
}
