import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity } from 'typeorm';

export enum AssetType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  BINARY = 'BINARY',
}

registerEnumType(AssetType, { name: 'AssetType' });

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Asset extends CoreEntity {
  @Column()
  @Field((type) => String)
  @IsString()
  name: string;

  @Column({ type: 'enum', enum: AssetType })
  @Field((type) => AssetType)
  type: AssetType;

  @Column()
  @Field((type) => String)
  @IsString()
  mimeType: string;

  @Column({ default: 0 })
  @Field((type) => Number)
  width: number;

  @Column({ default: 0 })
  @Field((type) => Number)
  height: number;

  @Column()
  @Field((type) => Number)
  fileSize: number;

  @Column()
  @Field((type) => String)
  @IsString()
  source: string;

  @Column()
  @Field((type) => String)
  @IsString()
  preview: string;
}
