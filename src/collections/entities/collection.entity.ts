import { Field, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { Asset } from 'src/assets/entities/asset.entity';
import { Channel } from 'src/channels/entities/channel.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
import { ProductVariant } from 'src/products/entities/product-variant.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { CollectionAsset } from './collection-asset.entity';

@ObjectType()
@Entity()
@Tree('closure-table')
export class Collection extends CoreEntity {
  @Field((type) => Boolean)
  @Column({ default: false })
  @IsBoolean()
  isRoot: boolean;

  @Field((type) => Number)
  @Column()
  @IsNumber()
  position: number;

  @Field((type) => Boolean)
  @Column({ default: false })
  @IsBoolean()
  isPrivate: boolean;

  @Field((type) => String)
  @Column()
  @IsString()
  name: string;

  @Field((type) => String)
  @Column()
  @IsString()
  description: string;

  @Field((type) => String)
  @Column()
  @IsString()
  slug: string;

  @Field((type) => Asset)
  @ManyToOne((type) => Asset, { onDelete: 'SET NULL' })
  featuredAsset: Asset;

  @Field((type) => CollectionAsset)
  @OneToMany(
    (type) => CollectionAsset,
    (collectionAsset) => collectionAsset.collection,
  )
  assets: CollectionAsset[];

  @Field((type) => ProductVariant)
  @ManyToMany(
    (type) => ProductVariant,
    (productVariant) => productVariant.collections,
  )
  @JoinTable()
  productVariants: ProductVariant[];

  @TreeChildren()
  children: Collection[];

  @TreeParent()
  parent: Collection;

  @Field((type) => Channel)
  @ManyToMany((type) => Channel)
  @JoinTable()
  channels: Channel[];
}
