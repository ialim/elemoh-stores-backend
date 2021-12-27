import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity } from 'typeorm';

@InputType('CountryInputType')
@ObjectType()
@Entity()
export class Country extends CoreEntity {
  @Field((type) => String)
  @Column({ unique: true })
  @IsString()
  code: string;

  @Field((type) => String)
  @Column({ default: false })
  @IsString()
  enabled: boolean;
}
