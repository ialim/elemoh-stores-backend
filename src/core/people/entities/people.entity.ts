import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';
import { Address } from 'src/core/addresses/entities/address.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from 'src/core/users/entities/user.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

@InputType('PersonInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Person extends CoreEntity {
  @Field((type) => String)
  @Column({ nullable: true })
  @IsString()
  title: string;

  @Field((type) => String)
  @Column()
  @IsString()
  firstName: string;

  @Field((type) => String)
  @Column()
  @IsString()
  lastName: string;

  @Field((type) => String)
  @Column({ nullable: true })
  @IsString()
  phoneNumber: string;

  @Field((type) => String)
  @Column()
  @IsEmail()
  emailAddress: string;

  @Field((type) => User, { nullable: true })
  @OneToOne((type) => User, { eager: true })
  @JoinColumn()
  user?: User;

  @Field((type) => [Address], { nullable: true })
  @OneToMany((type) => Address, (address) => address.person)
  addresses: Address[];

  @Field((type) => String)
  @Column({ nullable: true })
  @IsString()
  companyName: string;

  @Field((type) => String)
  @Column({ nullable: true })
  @IsString()
  taxNumber: string;
}
