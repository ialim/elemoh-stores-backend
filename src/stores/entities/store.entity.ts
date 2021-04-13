import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Store extends CoreEntity {
  @Field((type) => String)
  @Column()
  @IsString()
  @Length(10)
  name: string;

  @OneToOne((type) => User, { onDelete: 'SET NULL' })
  @JoinColumn()
  Manager: User;

  @Field((type) => String)
  @Column()
  @IsString()
  address: string;
}
