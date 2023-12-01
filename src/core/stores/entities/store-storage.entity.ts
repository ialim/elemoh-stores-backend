import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { StorageContent } from './storage-content.entity';
import { Store } from './store.entity';

@InputType('StoreStorageInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class StoreStorage extends CoreEntity {
  @Field((type) => String)
  @Column()
  @IsString()
  @Length(10)
  name: string;

  @Field((type) => String)
  @Column()
  @IsString()
  @Length(10)
  type: string;

  @Field((type) => StorageContent)
  @OneToMany((type) => StorageContent, (content) => content.storage, {
    eager: true,
  })
  contents: StorageContent[];

  @Field((type) => Store)
  @ManyToOne((type) => Store)
  store: Store;
}
