import { CoreEntity } from 'src/common/entities/core.entity';
import { CustomerGroup } from 'src/core/customers/entities/customer-group.etity';
import { Zone } from 'src/core/zones/entities/zone.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { TaxCategory } from './tax-category.entity';
import { ObjectType } from '@nestjs/graphql';

@ObjectType('TaxInputType', { isAbstract: true })
@Entity()
export class TaxRate extends CoreEntity {
  @Column() name: string;

  @Column() enabled: boolean;

  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
  })
  value: number;

  @ManyToOne((type) => TaxCategory)
  category: TaxCategory;

  @ManyToOne((type) => Zone)
  zone: Zone;

  @ManyToOne((type) => CustomerGroup, { nullable: true })
  customerGroup?: CustomerGroup;
}
