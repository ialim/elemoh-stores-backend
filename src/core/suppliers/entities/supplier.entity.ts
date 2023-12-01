import { Field, ObjectType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Purchase } from 'src/core/orders/entities/order-purchase.entity';
import { Person } from 'src/core/people/entities/people.entity';
import { ProductVariant } from 'src/core/products/entities/product-variant.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
} from 'typeorm';

@ObjectType()
@Entity()
export class Supplier extends CoreEntity {
  @Field((type) => Number)
  @Column()
  @IsNumber()
  VATNumber: number;

  @Field((type) => Person, { nullable: true })
  @OneToOne((type) => Person, { eager: true })
  @JoinColumn()
  person: Person;

  @Field((type) => [ProductVariant])
  @ManyToMany((type) => ProductVariant)
  @JoinTable()
  productVariants: ProductVariant[];

  @Field((type) => [Purchase])
  @OneToMany((type) => Purchase, (purchase) => purchase.supplier)
  purchases: Purchase[];
}
