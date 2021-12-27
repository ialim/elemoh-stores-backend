import { CoreEntity } from 'src/common/entities/core.entity';
import { CustomerGroup } from 'src/customers/entities/customer-group.etity';
import { Zone } from 'src/zones/entities/zone.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { TaxCategory } from './tax-category.entity';

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
