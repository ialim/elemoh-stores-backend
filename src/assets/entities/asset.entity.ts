import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity } from 'typeorm';

export enum AssetType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  BINARY = 'BINARY',
}

registerEnumType(AssetType, { name: 'AssetType' });

@ObjectType()
@InputType({ isAbstract: true })
@Entity()
export class Asset extends CoreEntity {
  @Column()
  @Field((type) => String)
  @IsString()
  name: string;

  @Column({ type: 'enum', enum: AssetType })
  @Field((type) => AssetType)
  @IsEnum(AssetType)
  type: AssetType;

  @Column()
  @Field((type) => String)
  @IsString()
  mimeType: string;

  @Column({ default: 0 })
  @Field((type) => Number)
  @IsNumber()
  width: number;

  @Column({ default: 0 })
  @Field((type) => Number)
  @IsNumber()
  height: number;

  @Column()
  @Field((type) => Number)
  @IsNumber()
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
