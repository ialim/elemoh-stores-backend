import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class TaxCategory extends CoreEntity {
  @Column() name: string;
}
