import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Channel } from 'src/core/channels/entities/channel.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
} from 'typeorm';
import { Permission } from './permission.entity';

@InputType('RoleInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Role extends CoreEntity {
  @Column()
  @IsString()
  code: string;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsString()
  description: string;

  @Field((type) => Permission, { nullable: true })
  @OneToOne((type) => Permission, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  permissions: Permission;

  @ManyToMany((type) => Channel)
  @JoinTable()
  channels: Channel[];
}
