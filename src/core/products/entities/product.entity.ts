import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsString } from 'class-validator';
import { Asset } from 'src/core/assets/entities/asset.entity';
import { Channel } from 'src/core/channels/entities/channel.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
import { FacetValue } from 'src/core/facets/entities/facet-value.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ProductAsset } from './product-asset.entity';
import { ProductVariant } from './product-variant.entity';

@InputType('ProductInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Product extends CoreEntity {
  @Field((type) => String)
  @Column()
  @IsString()
  name: string;

  @Field((type) => String)
  @Column()
  @IsString()
  slug: string;

  @Field((type) => String)
  @Column()
  @IsString()
  description: string;

  @Field((type) => Boolean)
  @Column({ default: true })
  @IsBoolean()
  enabled: boolean;

  @Field((type) => Asset, { nullable: true })
  @ManyToOne((type) => Asset, { onDelete: 'SET NULL' })
  featuredAsset: Asset;

  @Field((type) => [ProductAsset], { nullable: true })
  @OneToMany((type) => ProductAsset, (productAsset) => productAsset.product)
  assets: ProductAsset[];

  @Field((type) => [ProductVariant], { nullable: true })
  @OneToMany((type) => ProductVariant, (variant) => variant.product)
  variants: ProductVariant[];

  @Field((type) => [FacetValue], { nullable: true })
  @ManyToMany((type) => FacetValue)
  @JoinTable()
  facetValues: FacetValue[];

  @Field((type) => [Channel], { nullable: true })
  @ManyToMany((type) => Channel)
  @JoinTable()
  channels: Channel[];
}
