import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Country } from 'src/core/countries/entities/country.entity';
import { Person } from 'src/core/people/entities/people.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@InputType('AdressInputType')
@ObjectType()
@Entity()
export class Address extends CoreEntity {
  @Field((type) => Person)
  @ManyToOne((type) => Person, (person) => person.addresses)
  person: Person;

  @Field((type) => String)
  @Column({ default: '' })
  @IsString()
  fullName: string;

  @Field((type) => String)
  @Column({ default: '' })
  @IsString()
  company: string;

  @Field((type) => String)
  @Column()
  @IsString()
  streetLine1: string;

  @Field((type) => String)
  @Column({ default: '' })
  @IsString()
  streetLine2: string;

  @Field((type) => String)
  @Column({ default: '' })
  @IsString()
  city: string;

  @Field((type) => String)
  @Column({ default: '' })
  @IsString()
  province: string;

  @Field((type) => String)
  @Column({ default: '' })
  @IsString()
  postalCode: string;

  @Field((type) => Country)
  @ManyToOne((type) => Country)
  country: Country;

  @Field((type) => String)
  @Column({ default: '' })
  @IsString()
  phoneNumber: string;

  @Field((type) => Boolean)
  @Column({ default: false })
  @IsBoolean()
  defaultShippingAddress: boolean;

  @Field((type) => Boolean)
  @Column({ default: false })
  @IsBoolean()
  defaultBillingAddress: boolean;
}
