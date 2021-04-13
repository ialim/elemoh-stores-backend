import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsString } from 'class-validator';
import { Asset } from 'src/assets/entities/asset.entity';
import { Channel } from 'src/channels/entities/channel.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
import { FacetValue } from 'src/facets/entities/facet-value.entity';
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

@InputType({ isAbstract: true })
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

  @Field((type) => Asset)
  @ManyToOne((type) => Asset, { onDelete: 'SET NULL' })
  featuredAsset: Asset;

  @Field((type) => Asset)
  @OneToMany((type) => ProductAsset, (productAsset) => productAsset.product)
  assets: ProductAsset[];

  @Field((type) => ProductVariant)
  @OneToMany((type) => ProductVariant, (variant) => variant.product)
  variants: ProductVariant[];

  @Field((type) => FacetValue)
  @ManyToMany((type) => FacetValue)
  @JoinTable()
  facetValues: FacetValue[];

  @Field((type) => Channel)
  @ManyToMany((type) => Channel)
  @JoinTable()
  channels: Channel[];
}
