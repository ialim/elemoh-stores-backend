import { InputType, ObjectType } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { AuthActions } from 'src/common/generated-types';
import { Entity, Column } from 'typeorm';

@InputType('PermissionInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Permission extends CoreEntity {
  @Column({
    type: 'simple-array',
    enum: AuthActions,
    nullable: true,
    default: [],
  })
  @IsEnum(AuthActions)
  users: AuthActions[];

  @Column({
    type: 'simple-array',
    enum: AuthActions,
    nullable: true,
    default: [],
  })
  @IsEnum(AuthActions)
  order: AuthActions[];

  @Column({
    type: 'simple-array',
    enum: AuthActions,
    nullable: true,
    default: [],
  })
  @IsEnum(AuthActions)
  collection: AuthActions[];

  @Column({
    type: 'simple-array',
    enum: AuthActions,
    nullable: true,
    default: [],
  })
  @IsEnum(AuthActions)
  people: AuthActions[];

  @Column({
    type: 'simple-array',
    enum: AuthActions,
    nullable: true,
    default: [],
  })
  @IsEnum(AuthActions)
  role: AuthActions[];

  @Column({
    type: 'simple-array',
    enum: AuthActions,
    nullable: true,
    default: [],
  })
  @IsEnum(AuthActions)
  product: AuthActions[];
}
